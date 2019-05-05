<template>
    
</template>

<script>
    export default {
        computed: {
    isLoginSuccess: {
      get() {
        return this.$store.state.englishpage.isLoginSuccess;
      },
      set(value) {
        this.$store.commit("englishpage/setLoginSuccess", value);
      }
    },
    userLogin: {
      get() {
        return this.$store.state.englishpage.userLogin;
      },

      set(value) {
        this.$store.commit("englishpage/setUserLogin", value);
      }
    }
  }
    }
</script>

<style>

</style>
