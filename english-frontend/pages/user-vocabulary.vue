<template>
  <v-layout>
    <v-flex xs1 sm2 md2>
      <left-page></left-page>
    </v-flex>
    <v-flex xs11 sm8 md8>
      <user-vocabulary></user-vocabulary>
    </v-flex>
    <v-flex xs1 sm2 md2>
      <right-page></right-page>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";
import LeftPage from "./left-page.vue";
import RightPage from "./right-page.vue";
import Lessons from "~/components/Lessons.vue"; //list all lessons
import VocabulariesInLesson from "~/components/VocabulariesInLesson.vue";
import UserVocabulary from "~/components/UserVocabulary.vue";
import { mapMutations } from "vuex";

export default {
  data: function() {
    return {};
  },
  head() {
    return {
      title: "Học Tiếng Anh Online"
    };
  },

  components: {
    LeftPage,
    UserVocabulary,
    RightPage,
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

      components: {
        LeftPage,
        UserVocabulary,
        RightPage
      },
      mounted() {
        console.log(this.$route.query.id);
        this.isLoginSuccess = localStorage.getItem("isLogin");
        console.log(this.isLoginSuccess);
        if (this.isLoginSuccess == null) {
          this.$router.push({ path: "login-form" });
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
