<template>
  <v-card class="scroll" height="700">
    <!-- <v-layout row wrap> -->
    <div></div>
    <v-card-title class="title">
      <div class="body-1 text-xs-left">
        <v-icon small>arrow_left</v-icon>Trang chủ
      </div>
      <div></div>
      <v-spacer></v-spacer>
      <div>Danh Sách Từ Vựng</div>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs2>
          <v-select :items="lessons" label="Select lession" solo v-model="lessonId"></v-select>
        </v-flex>
        <v-flex xs4>
          <v-text-field label="Solo" placeholder="Keyword... (Red) " solo v-model="keyWord"></v-text-field>
        </v-flex>
        <div class="text-xs-center">
          <v-btn depressed large color="primary" @click="searchVocabulary">
            Search
            <v-spacer>...</v-spacer>
            <v-icon>search</v-icon>
          </v-btn>
        </div>
      </v-layout>
      <v-layout row wrap>
        <template v-for="vocabulary in Vocabularies">
          <v-flex xs3>
            <v-hover>
              <v-card>
                <div class="text-xs-center">
                  <v-avatar size="100px">
                    <v-img v-bind:src="vocabulary.image"></v-img>
                  </v-avatar>
                </div>

                <v-card-title primary-title>
                  <div class="text-xs-center">
                    <div class="title" hidden>{{vocabulary.id}}</div>
                    <div class="title">{{vocabulary.word}} - {{vocabulary.translate}}</div>
                  </div>
                </v-card-title>
                <audio id="audio" hidden v-bind:src="vocabulary.sound" controls="controls"></audio>
                <v-card-actions>
                  <div class="text-xs-center">
                    <v-btn color="purple" dark @click="playAudio(vocabulary.sound)">
                      <i class="material-icons">volume_up</i>
                    </v-btn>
                    <v-btn color="red" dark @click="deleteVocabulary(vocabulary.id)">
                      <i class="material-icons">delete_forever</i>
                    </v-btn>
                  </div>
                </v-card-actions>
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
  data: () => ({
    items: [
      "Lession 1 : Colors",
      "Lession 2: Time",
      "Lession 3 : Day of the week",
      "Lession 4 : Months"
    ],
    lessons: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "none"],
    isShow: true
  }),
  computed: {
    Vocabularies: {
      get() {
        return this.$store.state.englishpage.Vocabularies;
      },
      set(value) {
        this.$store.commit("englishpage/setVocabularies", value);
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
  head() {
    return {
      title: "Học Tiếng Anh Online"
    };
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
    searchVocabulary() {
      var self = this;
      console.log(self.lessonId);
      console.log(self.keyWord);
      var lid = "0";
      if (self.lessonId > "0" && self.lessonId!="none") {
        lid = self.lessonId;
      }
      if (self.keyWord == undefined) {
        self.keyWord = "";
      }
      axios
        .get(`http://localhost:8080/vocabularies`, {
          params: {
            username: localStorage.getItem("userLogin"),
            lessonId: lid,
            keyWord: self.keyWord
          }
        })
        .then(response => {
          this.Vocabularies = response.data;
          console.log(this.Vocabularies);
        });
    },
    playAudio(source) {
      if(source){
        var audio = new Audio(source);
        audio.play();
      }
    },
    deleteVocabulary(vocabularyId){
        var username = localStorage.getItem("userLogin");
        axios
        .get(`http://localhost:8080/deleteUserVocabulary`, {
          params: {
            username: username,
            vocabularyId: vocabularyId
          }
        }).then(response => {
          this.Vocabularies = response.data;
          console.log(this.Vocabularies);
        });
    }
  },

  mounted() {
    this.isLoginSuccess = localStorage.getItem("isLogin");
    if (this.isLoginSuccess === false) {
      this.$router.push("/");
    }
    var self = this;
    var lid = "0";
    if (self.lessonId > "0") {
      lid = self.lessonId;
    }
    if (self.keyWord == undefined) {
      self.keyWord = "";
    }
    console.log(self.lessonId);
    axios
      .get(`http://localhost:8080/vocabularies`, {
        params: {
          username: localStorage.getItem("userLogin"),
          lessonId: lid,
          keyWord: self.keyWord
        }
      })
      .then(response => {
        this.Vocabularies = response.data;
        console.log(this.Vocabularies);
      });
    console.log(this.Vocabularies);
  }
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
