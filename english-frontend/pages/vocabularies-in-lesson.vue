<template>
  <v-layout>
    <v-flex xs1 sm2 md2>
      <left-page></left-page>
    </v-flex>
    <v-flex xs11 sm8 md8>
      <vocabularies-in-lesson></vocabularies-in-lesson>
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
import { mapMutations } from "vuex";

export default {
  data: function() {
    return {};
  },

  components: {
    LeftPage,
    VocabulariesInLesson,
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
        VocabulariesInLesson,
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
      // mounted() {
      //   this.lessonID = this.$route.query.id;
      //   console.log(this.lessonID)
      //   axios.get(`http://localhost:8080/vocabularies/` + this.lessonID)
      //     .then(response => {
      //       console.log(response.data);
      //     })
      // }
    }
  }
  // mounted() {
  //   this.lessonID = this.$route.query.id;
  //   console.log(this.lessonID)
  //   axios.get(`http://localhost:8080/vocabularies/` + this.lessonID)
  //     .then(response => {
  //       console.log(response.data);
  //     })
  // }
};
</script>

<style scoped>
</style>
