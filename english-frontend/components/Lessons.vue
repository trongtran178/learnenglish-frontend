<template>
  <v-card class="scroll" height="700">
    <!-- <v-layout row wrap> -->
    <div>
    </div>
    <v-card-title class="title">
      <div class="body-1 text-xs-left">
        <v-icon small>arrow_left</v-icon>Quay lại
      </div>
      <div></div>
      <v-spacer></v-spacer>
      <div>CHỌN CHỦ ĐỀ</div>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <template v-for="lesson in Lessons">
          <v-flex xs6 sm4 md4>
            <v-hover>
              <v-card style="border:3px solid azure; " class="test"
                slot-scope="{ hover }"
                @click="showVocabularyInLesson(lesson.id,lesson.lessonName)"
                max-height="250px"
                :class="`elevation-${hover ? 12 : 2} ma-2 `"
              >
                <div class="text-xs-center">
                  <v-progress-circular
                    class="mt-2"
                    :width="5"
                    :rotate="-90"
                    color="deep-orange lighten-2"
                    :size="145"
                    :value="getValueHasLearnedInLesson()"
                  >
                    <v-avatar size="130px">
                      <v-img
                        v-bind:src="lesson.avatar"
                      ></v-img>
                    </v-avatar>
                  </v-progress-circular>
                </div>
                <v-container fluid>
                  <v-checkbox
                    disabled
                    color="blue"
                    :label="`Lesson ${lesson.id}: ${lesson.lessonName}`"
                  ></v-checkbox>
                </v-container>
              </v-card>
            </v-hover>
          </v-flex>
        </template>
      </v-layout>
    </v-card-text>
    <!-- </v-layout> -->
  </v-card>
</template>

<script>
import axios from "axios";
export default {
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
  head(){
    return {
      title: "Học Tiếng Anh Online"
    }
  },
  methods: {
    getValueHasLearnedInLesson() {
      return 80;
    },
    showVocabularyInLesson(lessonID, lessonName) {
      console.log(lessonID);
      this.$router.push({
        path: "vocabularies-in-lesson",
        query: {
          id: lessonID,
          name: lessonName
        }
      });
    },
    showLoginForm() {
      this.$router.push({
        path: "login-form"
      });
    },
    showVocabularyInLesson(lessonID, lessonName) {
      console.log(lessonID);
      console.log(lessonName);

      this.$router.push({
        path: "vocabularies-in-lesson",
        query: {
          id: lessonID,
          name: lessonName
        }
      });
    }
  },

  mounted() {
    this.isLoginSuccess = localStorage.getItem("isLogin");
    if (this.isLoginSuccess === false) {
      this.$router.push("/");
    }
    axios.get(`http://localhost:8080/lessons`).then(response => {
      this.Lessons = response.data;
    });
    console.log(this.Lessons);
  }
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}
.test:hover{
  background-color: #CFD8DC;
}

</style>
