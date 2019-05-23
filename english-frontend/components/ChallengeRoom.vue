<template>
  <v-dialog persistent v-model="challengeWithComputer" height="90%" width="1000">
    <template v-if="showLoading">
      <v-progress-linear v-model="valueLoading" :active="showLoading">

      </v-progress-linear>
    </template>

    <template v-else>

      <v-card>
        <v-card-title class="justify-center">
          <v-chip color="primary" text-color="white">
            <v-icon left>start</v-icon>
            <div class="display-1">KING OF WORDS</div>
            <v-icon right>start</v-icon>
          </v-chip>
        </v-card-title>
        <v-card-title>
          <v-btn small round color="red" class="white--text">Correct: <div class="headline">{{countUserCollectSelect}}
            </div>
          </v-btn>
          <v-avatar>
            <v-img src="/v.png"></v-img>
          </v-avatar>


          <div class="subheading">
            User

          </div>
          <v-rating readonly color="red" v-model="userHealth" length="3" empty-icon="favorite_border"
            full-icon="favorite">
          </v-rating>

          <div v-if="isUserTrueSelect">
            <v-fab-transition>
              <v-icon large color="primary" dark absolute bottom left>
                check_circle
              </v-icon>
            </v-fab-transition>
          </div>



          <v-spacer></v-spacer>

          <div v-if="isComputerTrueSelect">
            <v-fab-transition>
              <v-icon large color="primary" dark absolute bottom left>
                check_circle
              </v-icon>
            </v-fab-transition>
          </div>
          <v-rating readonly color="red" v-model="computerHealth" length="3" empty-icon="favorite_border"
            full-icon="favorite">

          </v-rating>
          <div class="subheading">
            Alexander Rybak
          </div>
          <v-avatar>
            <v-img src="/v.png"></v-img>
          </v-avatar>
          <v-btn small round color="red" class="white--text">Correct: <div class="headline">
              {{countComputerCollectSelect}}</div>
          </v-btn>
        </v-card-title>
        <v-card-text>

          <div class="text-xs-center" style="margin-top: -50px;">
            <v-chip color="orange" text-color="white" class="pl-3 pr-3">
              <div class="title">
                {{correctWord.word}}
              </div>

              <v-icon right light>
                volume_up
              </v-icon>

            </v-chip>
            <audio id="audio" hidden autoplay="autoplay" v-bind:src="correctWord.sound" controls="controls">Dòng thông
              báo
            </audio>
          </div>



          <template v-if="currentQuestion < 2">

            <v-layout row wrap>
              <template v-for="word in wordsChallengeFormat[currentQuestion]">
                <v-flex xs6>
                  <v-card class="ma-4" @click="checkAnswer(word)">

                    <!-- {{word.word}} -->
                    <v-img height="150" contain aspect-ratio="1" :src="word.image">

                    </v-img>


                  </v-card>

                </v-flex>
              </template>
            </v-layout>

          </template>


          <template v-if="currentQuestion >= 2 && currentQuestion < 4">

            <v-layout row wrap>
              <template v-for="word in wordsChallengeFormat[currentQuestion]">
                <v-flex xs6>
                  <v-card class="ma-1" @click="checkAnswer(word)">
                    <v-img height="150" contain :src="word.image">

                    </v-img>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
          </template>
          <template v-if="currentQuestion >= 4 && currentQuestion < 6">

            <v-layout row wrap>
              <template v-for="word in wordsChallengeFormat[currentQuestion]">
                <v-flex xs4>
                  <v-card class="ma-1" @click="checkAnswer(word)">
                    <v-card-title class="justify-center">
                      <v-img height="120" contain :src="word.image">

                      </v-img>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
          </template>
          <template v-if="currentQuestion >= 6 && currentQuestion < 8">

            <v-layout row wrap>
              <template v-for="word in wordsChallengeFormat[currentQuestion]">
                <v-flex xs3>
                  <v-card class="ma-2" @click="checkAnswer(word)">
                    <v-card-title class="justify-center">
                      <v-img height="120" contain aspect-ratio="1" :src="word.image">

                      </v-img>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
          </template>
          <template v-if="currentQuestion >= 8 && currentQuestion < 10">

            <v-layout row wrap>
              <template v-for="word in wordsChallengeFormat[currentQuestion]">
                <v-flex xs3>
                  <v-card class="ma-1" @click="checkAnswer(word)">
                    <v-card-title class="justify-center">
                      <v-img height="70" contain aspect-ratio="1" :src="word.image">

                      </v-img>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
          </template>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
  import axios from 'axios'
  export default {
    data: function () {
      return {
        wordsChallenge: null,
        valueLoading: 0,
        showLoading: true,
        wrongAnswer: 0,
        currentQuestion: 0, // 10 câu, từ 0 - 9
        userHealth: 3,
        computerHealth: 3,
        interval: 0,
        correctWord: null,
        wordsChallengeFormat: null,
        isWrongSelect: false,
        isUserTrueSelect: false,
        isComputerTrueSelect: false,
        countUserCollectSelect: 0,
        countComputerCollectSelect: 0,

        arrayWordsHasUsed: [],

        computerSelectTracking: null



      }
    },

    methods: {
      getWordsChallenge() {
        axios.get(`http://localhost:8080/vocabulariesChallenge`)
          .then(response => {
            this.vocabulariesChallenge = response.data;
          }).then(() => {
            this.formatVocabulariesChallenge();
          }).then(() => {
            this.computerSelectTracking = setTimeout(() => {
              this.computerSelect();
            }, 4000);
          });
      },

      nextChallenge() {
        this.currentQuestion++;
      },
      loading() {
        this.showLoading = true;
        this.valueLoading = 0;

        this.interval = setInterval(() => {
          if (this.valueLoading === 100) {
            clearInterval(this.interval);
            this.showLoading = false;
          }
          this.valueLoading += 25;
        }, 1000)
      },

      formatVocabulariesChallenge() {
        var arrayResult = [];

        var arrayWordChallenge = [];
        while (arrayWordChallenge.length < 10) {
          var indexRandom = Math.floor(Math.random() * this.vocabulariesChallenge.length);
          var word = this.vocabulariesChallenge[indexRandom];
          if (!arrayWordChallenge.includes(word)) {
            arrayWordChallenge.push(word);
          }
        }
        //console.log(arrayWordChallenge);

        var indexTemp = 0;
        var arrayTemp = [];
        while (arrayResult.length < 10) {

          if (arrayResult.length < 2) {
            //arrayResult.push(this.vocabulariesChallenge[indexTemp]);
            arrayTemp.push(this.vocabulariesChallenge[indexTemp]);

            while (arrayTemp.length < 2) {
              var indexRandom = Math.floor(Math.random() * this.vocabulariesChallenge.length);
              if (!arrayTemp.includes(this.vocabulariesChallenge[indexRandom])) {
                arrayTemp.push(this.vocabulariesChallenge[indexRandom]);
              }
            }
            arrayResult.push(arrayTemp);
            arrayTemp = [];
          } else if (arrayResult.length >= 2 && arrayResult.length < 4) {
            arrayTemp.push(this.vocabulariesChallenge[indexTemp]);
            while (arrayTemp.length < 4) {
              var indexRandom = Math.floor(Math.random() * this.vocabulariesChallenge.length);
              if (!arrayTemp.includes(this.vocabulariesChallenge[indexRandom])) {
                arrayTemp.push(this.vocabulariesChallenge[indexRandom]);
              }
            }
            arrayResult.push(arrayTemp);
            arrayTemp = [];
          } else if (arrayResult.length >= 4 && arrayResult.length < 6) {
            arrayTemp.push(this.vocabulariesChallenge[indexTemp]);
            while (arrayTemp.length < 6) {
              var indexRandom = Math.floor(Math.random() * this.vocabulariesChallenge.length);
              if (!arrayTemp.includes(this.vocabulariesChallenge[indexRandom])) {
                arrayTemp.push(this.vocabulariesChallenge[indexRandom]);
              }
            }
            arrayResult.push(arrayTemp);
            arrayTemp = [];
          } else if (arrayResult.length >= 6 && arrayResult.length < 8) {
            arrayTemp.push(this.vocabulariesChallenge[indexTemp]);
            while (arrayTemp.length < 8) {
              var indexRandom = Math.floor(Math.random() * this.vocabulariesChallenge.length);
              if (!arrayTemp.includes(this.vocabulariesChallenge[indexRandom])) {
                arrayTemp.push(this.vocabulariesChallenge[indexRandom]);
              }
            }
            arrayResult.push(arrayTemp);
            arrayTemp = [];
          } else if (arrayResult.length >= 8 && arrayResult.length < 10) {
            arrayTemp.push(this.vocabulariesChallenge[indexTemp]);
            while (arrayTemp.length < 12) {
              var indexRandom = Math.floor(Math.random() * this.vocabulariesChallenge.length);
              if (!arrayTemp.includes(this.vocabulariesChallenge[indexRandom])) {
                arrayTemp.push(this.vocabulariesChallenge[indexRandom]);
              }
            }
            arrayResult.push(arrayTemp);
            arrayTemp = [];
          }
          indexTemp++;
        }

        // var tempIndex = 1; //1, 2 : array 2 tu
        //3, 4: array 4 tu
        //5,6 : array 6 tu
        //7, 8: array 8 tu 
        //9, 10: array 12 tu





        // for (let i = 0; i < arrayResult.length; i++) {
        //   arrayResult[i][0][0].isCorrectAnswer = true;
        // }
        this.wordsChallengeFormat = arrayResult;
        // console.log(arrayResult.length);

        this.correctWord = this.randomWordInChallengeWord();
        //console.log(JSON.stringify(arrayResult));
        //return arrayResult;

      },

      checkAnswer(word) {
        if (this.isComputerTrueSelect || this.isUserTrueSelect) {
          return;
        }
        if (word.word == this.correctWord.word) {
          this.isUserTrueSelect = true;
          setTimeout(() => {
            this.currentQuestion++;
          }, 3000)

        } else {
          // alert("false");
          this.isWrongSelect = true;
          this.wrongAnswer++;
          this.userHealth -= 1;
        }
        //  console.log(this.correctWord);
      },

      randomWordInChallengeWord() {

        var indexRandom = Math.floor(Math.random() * this.wordsChallengeFormat[this.currentQuestion].length);
        if (this.arrayWordsHasUsed.includes(this.wordsChallengeFormat[this.currentQuestion][indexRandom])) {
          while (true) {
            indexRandom = Math.floor(Math.random() * this.wordsChallengeFormat[this.currentQuestion].length);
            if (!this.arrayWordsHasUsed.includes(this.wordsChallengeFormat[this.currentQuestion][indexRandom])) {
              this.arrayWordsHasUsed.push(this.wordsChallengeFormat[this.currentQuestion][indexRandom]);

              break;
            }
          }
          return this.wordsChallengeFormat[this.currentQuestion][indexRandom];
        } else {
          this.arrayWordsHasUsed.push(this.wordsChallengeFormat[this.currentQuestion][indexRandom]);
          return this.wordsChallengeFormat[this.currentQuestion][indexRandom];
        }
      },

      computerSelect() {

        //random tu  0 - 9
        var randomSecond = Math.floor(Math.random() * 2000) + 3000;
        this.computerSelectTracking = setTimeout(() => {

          var randomValue = Math.floor(Math.random() * 10);
          if (randomValue > 0) {
            this.isComputerTrueSelect = true;
            this.countComputerCollectSelect++;
            setTimeout(() => {
              this.currentQuestion++;
            }, 3000)

          } else {
            this.isComputerTrueSelect = false;
            this.computerHealth -= 1;
            this.computerSelect();

          }
        }, randomSecond);

      },



    },
    mounted() {
      this.currentQuestion = 0;
      this.showLoading = true;
      this.valueLoading = 0;

      this.loading();
      this.getWordsChallenge();
    },
    watch: {
      currentQuestion: function () {
        if (this.currentQuestion >= 10) {
          if (this.countComputerCollectSelect > this.countUserCollectSelect) {
            setTimeout(() => {
              this.challengeWithComputer = false;
              this.$router.push('/loser?player=user&heart='+this);
            }, 2000);
          } else if (this.countComputerCollectSelect < this.countUserCollectSelect) {
            setTimeout(() => {
              this.challengeWithComputer = false;
              this.$router.push('/loser?player=computer');
            }, 2000);
          } else {
            setTimeout(() => {
              this.challengeWithComputer = false;
              this.$router.push('/loser?player=hoanhau');
            }, 2000);
          }
          return;
        }
        this.correctWord = this.randomWordInChallengeWord();
        this.computerSelect();
      },

      wrongAnswer: function () {
        if (this.wrongAnswer === 4) {

        }
      },
      isUserTrueSelect: function () {
        if (this.isUserTrueSelect === true) {
          // t//his.computerSelect();

          clearInterval(this.computerSelectTracking);
          this.countUserCollectSelect++;
          setTimeout(() => {

            this.isUserTrueSelect = false;
          }, 3000);
          // this.computerSelect();
        }
      },

      isComputerTrueSelect: function () {
        if (this.isComputerTrueSelect === true) {
          setTimeout(() => {
            this.isComputerTrueSelect = false;
          }, 3000);
        }
      },

      userHealth: function () {
        if (this.userHealth === 0) {
          this.challengeWithComputer = false;
          this.$router.push('/loser?player=user');
        }
      },

      computerHealth: function () {
        if (this.computerHealth === 0) {
          this.challengeWithComputer = false;
          this.$router.push('/loser?player=computer');
        }
      },
      countComputerCollectSelect: function () {
        if (this.countComputerCollectSelect >= 10) {
          this.challengeWithComputer = false;
          this.$router.push('/loser?player=user');
        }
      },
      countUserCollectSelect: function () {
        if (this.countUserCollectSelect >= 10) {
          this.challengeWithComputer = false;
          this.$router.push('/loser?player=computer');
        }
      }
    },
    computed: {
      challengeWithComputer: {
        get() {
          return this.$store.state.englishpage.openChallengeWithComputerRoomDialog;
        },
        set(value) {
          this.$store.commit('englishpage/setChallengeWithComputerRoomDialog', value);
        }
      },
      vocabulariesChallenge: {
        get() {
          return this.$store.state.englishpage.vocabulariesChallenge;
        },
        set(value) {
          this.$store.commit('englishpage/setVocabulariesChallenge', value);
        }
      }
    }
  }

</script>

<style scoped>
  .centered-input input {
    text-align: center;
  }

</style>
