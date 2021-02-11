<template>
  <div id="messenger">
    <div id="list">
      <div id="contact" v-for="contact in state.contacts" :key="contact.id">
        <img :src="require(`../assets/${contact.name.toLowerCase()}.jpg`)">
        <h3>{{contact.name}}</h3>
        <p>{{contact.messages[contact.messages.length - 1].text}}</p>
      </div>
      <div id="newContact">
        <input type="text" v-model="state.newThread" placeholder="Add new user...">
        <button type="submit" @click="startNewThread">+</button>
      </div>
    </div>
    <div id="messages">
      <div id="content">
        <div id="message" v-for="(message, index) in state.contacts[state.activeContact].messages" :key="index">
          <p id="contactText" v-if="message.by != 'User'">{{message.text}}</p>
          <img id="contactImg" v-if="message.by != 'User'" :src="require(`../assets/${state.contacts[state.activeContact].name.toLowerCase()}.jpg`)">
          <p id="userText" v-if="message.by == 'User'">{{message.text}}</p>
          <img id="userImg" v-if="message.by == 'User'" :src="require(`../assets/${state.user.username.toLowerCase()}.jpg`)">
        </div>
      </div>
      <div id="type-box">
        <input type="text" v-model="state.newMessage" placeholder="Write a message...">
        <button type="submit" @click="sendMessage()">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from '../store/';
import { reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const storeData = useStore();

    const state = reactive({
      activeContact: 0,
      newThread: "",
      newMessage: "",
      user: {
        username: "SirMacke",
        name: "Maximilian Helmersson"
      },
      contacts: [
        {
          id: 1,
          name: "Liam",
          messages: [
            {
              text: "Something 1. Lorem ipsum dollar sit amet",
              by: "User",
              date: "2021-02-07",
              time: "01:35"
            },
            {
              text: "Something 2. Lorem ipsum dollar sit amet",
              by: "Liam",
              date: "2021-02-07",
              time: "01:40"
            },
            {
              text: "Something 3. Lorem ipsum dollar sit amet",
              by: "User",
              date: "2021-02-07",
              time: "01:45"
            },
            {
              text: "Something 4. Lorem ipsum dollar sit amet",
              by: "Liam",
              date: "2021-02-07",
              time: "01:45"
            },
            {
              text: "Something 1. Lorem ipsum dollar sit amet",
              by: "User",
              date: "2021-02-07",
              time: "01:35"
            },
            {
              text: "Something 2. Lorem ipsum dollar sit amet",
              by: "Liam",
              date: "2021-02-07",
              time: "01:40"
            },
            {
              text: "Something 3. Lorem ipsum dollar sit amet",
              by: "User",
              date: "2021-02-07",
              time: "01:45"
            },
            {
              text: "Something 4. Lorem ipsum dollar sit amet",
              by: "Liam",
              date: "2021-02-07",
              time: "01:45"
            },
            {
              text: "Something 1. Lorem ipsum dollar sit amet",
              by: "User",
              date: "2021-02-07",
              time: "01:35"
            },
            {
              text: "Something 2. Lorem ipsum dollar sit amet",
              by: "Liam",
              date: "2021-02-07",
              time: "01:40"
            },
            {
              text: "Something 3. Lorem ipsum dollar sit amet",
              by: "User",
              date: "2021-02-07",
              time: "01:45"
            },
            {
              text: "Something 4. Lorem ipsum dollar sit amet",
              by: "Liam",
              date: "2021-02-07",
              time: "01:45"
            }
          ]
        },
        {
          id: 2,
          name: "Olivia",
          messages: [
            {
              text: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:35"
            },
            {
              text: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:40"
            },
            {
              text: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:45"
            }
          ]
        },
        {
          id: 3,
          name: "Noah",
          messages: [
            {
              text: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:35"
            },
            {
              text: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:40"
            },
            {
              text: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:45"
            }
          ]
        },
        {
          id: 4,
          name: "Emma",
          messages: [
            {
              text: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:35"
            },
            {
              text: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:40"
            },
            {
              text: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:45"
            }
          ]
        },
        {
          id: 5,
          name: "Oliver",
          messages: [
            {
              text: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:35"
            },
            {
              text: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:40"
            },
            {
              text: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:45"
            }
          ]
        },
      ]
    });

    console.log(storeData.state.User.user);
    console.log(storeData.state.User.user.threads[0]);

    function sendMessage() {
      console.log(state.newMessage)
    }

    async function startNewThread() {
      const params = new URLSearchParams();
      params.append('usernameOrEmail', state.newThread);
      params.append('auth', storeData.state.User.user.auth);

      const response = await axios.post('/api/messenger/newThread', params);

      await store.dispatch('User/setNewThread', response.data);

      //router.push('/');

      //state.user = computed(() => storeData.state.User.user);
    }

    return {
      state,
      startNewThread,
      sendMessage
    }
  }
}
</script>

<style lang="sass" scoped>

#messenger
  width: 125vh
  height: 75vh
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  border: 3px solid #CCCCCC
  border-radius: 15px
  display: grid
  grid-template-columns: 30% 70%

  #list::-webkit-scrollbar
    width: 8px

  #list::-webkit-scrollbar-track
    background: none

  #list::-webkit-scrollbar-thumb
    background-color: #CCCCCC
    width: 4px
    border-radius: 20px
    border: 2px solid white

  #list
    border-right: 3px solid #CCCCCC
    overflow-y: scroll

    #contact
      position: relative
      border-bottom: 3px solid #EEEEEE

      img
        position: relative
        width: 60px
        height: 60px
        border-radius: 50%
        margin: 25px 0px 0px 25px

      h3
        position: absolute
        top: 25px
        left: 105px
        width: auto

      p
        position: relative
        width: 80%
        left: 25px
        width: 85%
        padding: 0px
        margin-bottom: 25px

    #newContact
      margin: 20px 15px
      display: flex
      position: relative

      input
        position: relative
        width: 100%
        height: 35px
        padding-left: 12.5px
        border-radius: 25px
        outline: none
        border: none
        background: #EEEEEE

      button
        position: absolute
        right: 0px
        z-index: 5
        border: none
        outline: none
        background: #1DA1F2
        font-weight: bold
        font-size: 1.4em
        color: white
        height: 37px
        width: 37px
        border-top-right-radius: 25px
        border-bottom-right-radius: 25px
        
      button:hover
        cursor: pointer
        background: #00a0dc


  #messages
    position: relative
    display: grid
    grid-template-rows: 90% 10%
    height: 75vh

    #content::-webkit-scrollbar
      width: 8px

    #content::-webkit-scrollbar-track
      background: none
      margin-top: 10px

    #content::-webkit-scrollbar-thumb
      background-color: #CCCCCC
      width: 4px
      border-radius: 20px
      border: 2px solid white

    #content
      position: relative
      height: 100%
      width: 100%
      overflow: scroll
      padding-bottom: 15px
      display: flex
      flex-direction: column

      #message
        position: relative
        width: 100%
        min-height: 45px
        margin: 25px 0px

        img
          position: absolute
          height: 45px
          width: 45px
          border-radius: 50%
          margin-bottom: 25px

        #contactImg
          left: 25px

        #userImg
          right: 25px

        p
          position: relative
          display: inline-block
          background-color: #EEEEEE
          padding: 10px 15px
          border-radius: 20px
          margin: 0px
          top: 3.5px

        #contactText
          left: 12.5%

        #userText
          margin-left: 48.5%

    #type-box
      position: relative
      height: 100%
      width: 100%
      bottom: 0px
      border-top: 3px solid #EEEEEE

      input
        position: relative
        top: 50%
        left: 10px
        transform: translateY(-50%)
        border: none
        width: 85%
        height: 90%
        outline: none

      input::placeholder
        color: #AAA

      button
        position: absolute
        border: none
        background: none
        outline: none
        font-size: 1.1em
        right: 35px
        top: 47.5%
        transform: translateY(-50%)
        color: #1DA1F2
        font-weight: bold
        padding: 0px
        
      button:hover
        cursor: pointer
        color: #00a0dc


</style>
