<template>


  <v-dialog v-model="challengeWithComputer" width="900">
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

        interval: 0

      }
    },

    methods: {
      getWordsChallenge() {
        axios.get(`http://localhost:8080/vocabulariesChallenge`)
          .then(response => {
            this.vocabulariesChallenge = response.data;
            console.log(this.vocabulariesChallenge);
            this.formatVocabulariesChallenge();
          });
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

        while(arrayResult.length < 10) {
            var tempIndex = 1; //1, 2 : array 2 tu
                            //3, 4: array 4 tu
                            //5,6 : array 6 tu
                            //7, 8: array 8 tu 
                            //9, 10: array 12 tu
            for(; tempIndex < 10; tempIndex++) {
                if(tempIndex <= 2) {

                } else if (tempIndex > 2 && tempIndex <= 4) {

                } else if(tempIndex > 4 && tempIndex <= 6) {

                } else if(tempIndex > 6 && tempIndex <= 8) {

                } else if(tempIndex > 8) {

                }
            }
            tempIndex++;
        }

      }
    },
    mounted() {
      this.showLoading = true;
      this.valueLoading = 0;
      this.loading();
      this.getWordsChallenge();
      
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

</style>
