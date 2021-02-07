<template>
  <main>
    <form @submit.prevent="signup">
      <h2>Signup</h2>
      <div id="line"></div>
      <input type="text" v-model="state.username" placeholder="Username">
      <input type="email" v-model="state.email" placeholder="Email">
      <input type="password" v-model="state.password" placeholder="Password">
      <button type="submit">Signup</button>
    </form>
    <router-link to="/login" class="bottom-link">
      <a id="login">Login</a>
    </router-link>
  </main>
</template>

<script>
import axios from "axios";
import store from '../store/';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "Signup",
  setup() {
    const router = useRouter();
    
    const state = reactive({
      username: '',
      email: '',
      password: ''
    });

    async function signup() {
      const params = new URLSearchParams();
      params.append('username', state.username);
      params.append('email', state.email);
      params.append('password', state.password);

      const response = await axios.post('/api/signup', params);

      await store.dispatch('User/setUser', response.data);

      router.push('/');
    }

    return {
      state,
      signup
    }
  }
}
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

main
  width: 100%
  height: 100%
  padding: 0
  margin: 0

  form
    position: absolute
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    -webkit-box-orient: vertical
    -webkit-box-direction: normal
    -ms-flex-direction: column
    flex-direction: column
    left: 50%
    top: 50%
    -webkit-transform: translate(-50%, -50%)
    transform: translate(-50%, -50%)

    h2
      text-align: center
      font-size: 3em
      margin: 50px 0px 0px 0px
      text-transform: uppercase
      color: #1892FF

    #line
      position: relative
      width: 65px
      height: 3px
      left: 50%
      top: 25px
      -webkit-transform: translate(-50%, 0%)
      transform: translate(-50%, 0%)
      background-color: gray
      margin-bottom: 65px

    input
      width: 400px
      height: 45px
      font-family: Lato
      font-size: 1.25em
      margin-bottom: 20px
      border-radius: 2.5px
      border: 1px solid #333333
      color: black
      padding-left: 15px
      margin-left: -7.5px
      background-color: #F3F5FA

      @media (max-width: 500px)
        width: 300px

      @media (max-width: 400px)
        width: 250px

      &::placeholder
        color: #333333

      &:focus
        border-color: black

    button
      position: relative
      width: 185px
      height: 50px
      left: 50%
      -webkit-transform: translate(-50%, 0%)
      transform: translate(-50%, 0%)
      text-align: center
      font-family: Lato
      font-size: 1.4em
      background: none
      border: 2px solid #1892FF
      margin-top: 25px

      @media (max-width: 400px)
        width: 150px

      &:hover
        cursor: pointer
        -webkit-animation-name: formButton
        animation-name: formButton
        -webkit-animation-duration: .5s
        animation-duration: .5s
        background: #1892FF
        color: white

      @-webkit-keyframes formButton
        0%
          background: none
        100%
          background: #1892FF

      @keyframes formButton
        0%
          background: none
        100%
          background: #1892FF

  .bottom-link
    a
      position: absolute
      bottom: 30px
      color: #333333
      font-size: 1.1em
      width: auto

    #login
      right: 35px
</style>