<template>
  <v-dialog persistent v-model="challengeWithComputer" height="90%" width="900">

    <!-- <v-snackbar v-model="isWrongSelect" timeout="4000" top>
      Bạn đã chọn sai rồi
    </v-snackbar> -->
    <template v-if="showLoading">
      <v-progress-linear v-model="valueLoading" :active="showLoading">

      </v-progress-linear>
    </template>

    <template v-else>

      <v-card>
        <!-- <v-btn @click="computerSelect()">adasdas</v-btn> -->
        <v-card-title class="justify-center">
          <v-chip color="primary" text-color="white">
            <v-icon left>start</v-icon>
            <div class="display-1">KING OF WORDS</div>
            <v-icon right>start</v-icon>
          </v-chip>
          <!-- <v-btn @click="nextChallenge">Next challenge</v-btn> -->
        </v-card-title>
        <v-card-title>

          <v-avatar>
            <v-img src="/v.png"></v-img>
          </v-avatar>


          <div class="subheading">
            Trần Ngọc Trọng

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
          </div>



          <template v-if="currentQuestion < 2">

            <v-layout row wrap>
              <template v-for="word in wordsChallengeFormat[currentQuestion]">
                <v-flex xs6>
                  <v-card class="ma-4" @click="checkAnswer(word)">
                    <v-card-title class="justify-center">
                      <!-- {{word.word}} -->
                      <v-img height="150" aspect-ratio src="https://picsum.photos/510/300">

                      </v-img>
                    </v-card-title>

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
                    <v-img height="150" aspect-ratio src="https://picsum.photos/510/300">

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
                      <v-img height="120" aspect-ratio src="https://picsum.photos/510/300">

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
                      <v-img height="120" aspect-ratio src="https://picsum.photos/510/300">

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
                      <v-img height="70" aspect-ratio src="https://picsum.photos/510/300">

                      </v-img>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
          </template>
        </v-card-text>
        <!-- <v-card-actions class="justify-center">
                    <v-btn color="primary" @click="openChallengeWithComputerRoom">THÁCH ĐẤU VỚI MÁY</v-btn>
                    <v-btn color="secondary" disabled>CHƠI NGẪU NHIÊN</v-btn>
                  </v-card-actions> -->
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
        isComputerTrueSelect: false
      }
    },

    methods: {
      getWordsChallenge() {
        axios.get(`http://localhost:8080/vocabulariesChallenge`)
          .then(response => {
            this.vocabulariesChallenge = response.data;
          }).then(() => {
            this.formatVocabulariesChallenge();
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
        if (word.word == this.correctWord.word) {
          this.isUserTrueSelect = true;
          this.currentQuestion++;
        } else {
          // alert("false");
          this.isWrongSelect = true;
          this.wrongAnswer++;
          this.userHealth -= 1;
        }
        //  console.log(this.correctWord);
      },

      randomWordInChallengeWord() {
        var word;

        var indexRandom = Math.floor(Math.random() * this.wordsChallengeFormat[this.currentQuestion].length);

        return this.wordsChallengeFormat[this.currentQuestion][indexRandom];
      },

      computerSelect() {
        //random tu  0 - 9
        var randomValue = Math.floor(Math.random() * 10);
        if(randomValue > 0) {
          this.isComputerTrueSelect = true;
          this.currentQuestion++;
        } else  {
          
        }
      },



    },
    mounted() {
      this.showLoading = true;
      this.valueLoading = 0;
      this.loading();
      this.getWordsChallenge();

    },
    watch: {
      currentQuestion: function () {
        this.correctWord = this.randomWordInChallengeWord();
        var randomSecond = Math.floor(Math.random() * 10) + 2000;
        console.log(randomSecond)
        setTimeout(() => {
          this.computerSelect();
        }, randomSecond);
      },

      wrongAnswer: function () {
        if (this.wrongAnswer === 4) {

        }
      },
      isUserTrueSelect: function () {
        if (this.isUserTrueSelect === true) {
          setTimeout(() => {
            this.isUserTrueSelect = false;
          }, 1000);
        }
      },

      isComputerTrueSelect: function() {
        if (this.isComputerTrueSelect === true) {
          setTimeout(() => {
            this.isComputerTrueSelect = false;
          }, 1000);
        }
      },

      userHealth: function () {
        if (this.userHealth === 0) {
          this.challengeWithComputer = false;
          this.$router.push('/loser');
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
