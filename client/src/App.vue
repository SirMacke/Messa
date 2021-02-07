<template>
  <router-view/>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'App',
  setup() {
    const store = useStore();
    const user = computed(() => store.state.User.user);

    return {
      user
    }
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
#app
  font-family: Lato, Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

</style>
