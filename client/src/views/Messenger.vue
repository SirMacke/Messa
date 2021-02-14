<template>
  <div id="messenger">
    <div id="list">
      <div class="contact" @click="activeContact = index" :class="{ active: activeContact == index, zeroIndex: index == 0 }" v-for="(thread, index) in store.state.User.user.threads" :key="index">
        <img :src="require(`../assets/sirmacke.jpg`)">
        <h3>{{threadName(thread)}}</h3>
        <!--<p>{{thread.messages[thread.messages.length - 1].text}}</p>-->
      </div>
      <div id="newContact">
        <input type="text" v-model="newContact" placeholder="Add new user...">
        <button type="submit" @click="startNewThread()">+</button>
      </div>
    </div>
    <div id="messages">
      <div id="content">
        <div class="message" v-for="(message, index) in store.state.User.user.threads[activeContact].messages" :key="index">
          <p class="contactText" v-if="message.by != store.state.User.user.username">{{message.text}}</p>
          <img class="contactImg" v-if="message.by != store.state.User.user.username" :src="require(`../assets/sirmacke.jpg`)">
          <p class="userText" v-if="message.by == store.state.User.user.username">{{message.text}}</p>
          <img class="userImg" v-if="message.by == store.state.User.user.username" :src="require(`../assets/sirmacke.jpg`)">
        </div>
      </div>
      <div id="type-box">
        <input type="text" v-model="newMessage" placeholder="Write a message...">
        <button type="submit" @click="sendMessage()">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
//import store from '../store/';
import { useStore } from 'vuex';
import store from '../store/';
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      socket: {},
      store: {},
      activeContact: 0,
      newContact: "",
      newMessage: ""
    }
  },
  created() {
    this.socket = io('http://localhost:3001/api/messenger', { transport: ["websocket"] });
    this.store = useStore();
  },
  mounted() {
    this.socket.emit('joinThreads', { data: this.store.state.User.user.threads });

    this.socket.on('newThread', async data => {
      await store.dispatch('User/setNewThread', data);
    });

    this.socket.on('newMessage', async data => {
      console.log(data);
      await store.dispatch('User/setNewMessage', data);
    });
  },
  methods: {
    startNewThread() {
      this.socket.emit("newThread", {auth: this.store.state.User.user.auth, newContact: this.newContact});
    },
    threadName(thread) {
      let names = [];
      for (let i = 0; i < thread.users.length; i++) {
        if (thread.users[i].username != this.store.state.User.user.username) names.push(thread.users[i].username)
      }
      if (names.length == 1) return names.toString();
      else return names.join(", ");
    },
    sendMessage() {
      this.socket.emit("newMessage", {
        thread: this.store.state.User.user.threads[this.activeContact]._id,
        msg: this.newMessage,
        by: this.store.state.User.user.username
      });
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
    // scrollbar wont be seen - bug that needs to be fixed
    width: 0px

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

    .active
      background-color: #EEEEEE

    .zeroIndex
      border-top-left-radius: 10px

    .contact:hover
      cursor: pointer

    .contact
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

      .message
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

        .contactImg
          left: 25px

        .userImg
          right: 25px

        p
          position: relative
          display: inline-block
          background-color: #EEEEEE
          padding: 10px 15px
          border-radius: 20px
          margin: 0px
          top: 3.5px

        .contactText
          left: 12.5%

        .userText
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
