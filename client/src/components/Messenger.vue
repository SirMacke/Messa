<template>
  <div id="messenger">
    <div id="list">
      <div id="contact" v-for="(contact, index) in state.contacts" :key="index">
        <img :src="require(`../assets/${contact.name.toLowerCase()}.jpg`)">
        <h3>{{contact.name}}</h3>
        <p>{{contact.messages[contact.messages.length - 1].message}}</p>
      </div>
    </div>
    <div id="messages">

    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      activeContact: 1,
      contacts: [
        {
          id: 1,
          name: "Liam",
          messages: [
            {
              message: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:35"
            },
            {
              message: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:40"
            },
            {
              message: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:45"
            },
            {
              message: "Something 2. Lorem ipsum dollar sit amet",
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
              message: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:35"
            },
            {
              message: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:40"
            },
            {
              message: "Something. Lorem ipsum dollar sit amet",
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
              message: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:35"
            },
            {
              message: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:40"
            },
            {
              message: "Something. Lorem ipsum dollar sit amet",
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
              message: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:35"
            },
            {
              message: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:40"
            },
            {
              message: "Something. Lorem ipsum dollar sit amet",
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
              message: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:35"
            },
            {
              message: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:40"
            },
            {
              message: "Something. Lorem ipsum dollar sit amet",
              date: "2021-02-07",
              time: "01:45"
            }
          ]
        },
      ]
    });

    function imageSelector(name) {
      return name
    }

    return {
      state,
      imageSelector
    }
  }
}
</script>

<style lang="sass" scoped>

#messenger
  width: 50vw
  height: 70vh
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
        left: 100px
        width: auto

      p
        position: relative
        width: 90%
        left: 25px
        width: 90%
        padding: 0px
        margin-bottom: 25px


</style>
