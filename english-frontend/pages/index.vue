<template>
  <v-layout>
    <v-flex xs1 sm2 md2>
      <left-page></left-page>
    </v-flex>
    <v-flex xs11 sm8 md8>
      <lessons></lessons>
      <!-- VocabulariesInLesson -->
      <!-- <vocabularies-in-lesson></vocabularies-in-lesson> -->
    </v-flex>
    <v-flex xs1 sm2 md2>
      <right-page></right-page>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import axios from "axios";
import Vuex from "vuex";
import LeftPage from "./left-page.vue";
import RightPage from "./right-page.vue";
import Lessons from "~/components/Lessons.vue"; //list all lessons
import VocabulariesInLesson from "~/components/VocabulariesInLesson.vue";

import { mapMutations } from "vuex";

export default {
  components: {
    Logo,
    VuetifyLogo,
    Lessons,
    LeftPage,
    RightPage,
    VocabulariesInLesson
  },
  head(){
    return {
      title: "Học Tiếng Anh Online"
    }
  },
  data: function() {
    return {};
  },

  methods: {},
  computed: {
    Lessons: {
      get() {
        return this.$store.state.englishpage.Lessons;
      },
      set(value) {
        this.$store.commit("englishpage/setLessons", value);
      }
    },
    isLoginSuccess: {
      get() {
        return this.$store.state.englishpage.isLoginSuccess;
      },
      set(value) {
        this.$store.commit("englishpage/setLoginSuccess", value);
      },
      challengeDialog: {
        get() {
          return this.$store.state.englishpage.openChallengeDialog;
        },
        set(value) {
          this.$store.commit("englishpage/setChallengeDialog", value);
        }
      }
    }
  },
  mounted() {
    this.isLoginSuccess = localStorage.getItem("isLogin");
    console.log(this.isLoginSuccess);
    if (this.isLoginSuccess == null) {
      this.$router.push({ path: "login-form" });
    }
    if (this.isLoginSuccess == "true") {
      this.$router.push("/");
      axios.get(`http://localhost:8080/lessons`).then(response => {
        this.Lessons = response.data;
      });
    }
  }
};
</script>
