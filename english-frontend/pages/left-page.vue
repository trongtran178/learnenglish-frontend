<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title class="justify-center subheading">Hello student !</v-card-title>
        <div class="text-xs-center">
          <v-avatar size="120px">
            <v-img src="https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png"></v-img>
          </v-avatar>
        </div>
        <v-card-actions class="justify-center">
          <v-btn round color="error" @click="logOut">Log out</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <!-- <challenge-dialog></challenge-dialog> -->
  </v-layout>
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
  },
  methods:{
    logOut() {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("userLogin");
      this.$router.push({ path: "login-form" });
    }
  }
};
</script>

<style>
</style>
