<template>
  <div v-if="isSuccessLoading">
  <v-card class="scroll" height="700">
    <v-layout row wrap>
      <v-flex xs3>
        <v-btn icon large>
          <v-icon large>
            access_time
          </v-icon>
        </v-btn>
      </v-flex>
      
      <v-flex xs6 >
          <div class="text-xs-center">
            <v-card class="ma-5">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <!-- Thẻ trước -->
                  <div class="flip-card-front">
                    <div class="text-xs-center pa-4">
                      <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
                    </div>
                    <v-card-text> 
                      {{vocabulariesInLesson[currentIndex].word}}
                    </v-card-text>
                  </div>
                  <!--Thẻ sau-->
                  <div class="flip-card-back">
                    <div class="text-xs-center pa-4">
                      <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
                    </div>
                    <v-card-text> 
                      {{vocabulariesInLesson[currentIndex].translate}}
                    </v-card-text>
                  </div>
                </div>
              </div>
            </v-card> 
          </div>
          <div class="wrap-btn">
            <div class="headline font-weight-thin" font-weight="10">
                Ấn [dấu cách] để lật card
              </div>
              <div>
                <v-btn round @click="showNextVocabulary(currentIndex)">
                  TIẾP TỤC
                </v-btn>
              </div>
          </div>
      </v-flex>
       
      <v-flex xs3>
        <div class="text-xs-right">
          <!--<v-btn icon large>
            <v-icon large>
              access_time
            </v-icon>
          </v-btn>-->
          <!--Test-->
          <v-progress-circular class="mt-2 mr-2" :width="10" :rotate="-90" color="green lighten-2" :size="80"
                    :value="academicProgress(countVocabulary)">
                    <v-avatar size="130px">
                      <v-card-text>
                        {{parseFloat(this.progess).toFixed(2)}} %
                      </v-card-text>
                    </v-avatar>
                  </v-progress-circular>
          <!--end of Test-->
        </div>
      </v-flex>
    </v-layout>
  </v-card>
  </div>
</template>

<script>
  import axios from 'axios'
  
  export default {
    data: function () {
      return {
        lessonID: null,
        isSuccessLoading: false,
        currentIndex: 0,
        progess: 0,
        countVocabulary: 0
      }
    },

    computed: {
      vocabulariesInLesson: {
        get() {
          return this.$store.state.englishpage.ListVocabularyInLesson;
        },
        set(value) {
          this.$store.commit('englishpage/setListVocabularyInLesson', value);
        }
      }
    },
    methods:{
      displayTranslateWhenClick(currentIndex){
        
        console.log(this.isClickTranslate);
      },
      showNextVocabulary(currentIndex){
        console.log(this.vocabulariesInLesson.length);
        
        console.log(currentIndex);
        if(currentIndex < this.vocabulariesInLesson.length -1)
        {
          this.currentIndex ++;
          this.countVocabulary ++;
        }
        else{
          this.currentIndex = 0;
          this.countVocabulary ++;
        }
      },
      academicProgress(countVocabulary){
        if(countVocabulary > this.vocabulariesInLesson.length)
        {
          this.progess = 100;
          return this.progess;
        }
        else{
          this.progess = countVocabulary / this.vocabulariesInLesson.length * 100;
          return this.progess;
        }
      }
    },
    mounted() {
      this.lessonID = this.$route.query.id;
      console.log(this.lessonID)
      axios.get(`http://localhost:8080/vocabularies/` + this.lessonID)
        .then(response => {
          this.isSuccessLoading = true;
          this.vocabulariesInLesson = response.data;
          console.log(this.vocabulariesInLesson);
        })
    }
  }

</script>

<style scoped>
  .flip-card{
    position: relative;
    background-color: transparent;
    width: 100%;
    height: 400px;
    perspective: 1000px;
    font-size: 30px;
  }
  .flip-card-inner{
    position: relative;
    text-align: center;
    transition: transform 1s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    
  }
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  .flip-card-front, .flip-card-back{
    
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    
  }
  .flip-card-front{
    color: black;
    z-index: 2;
  }
  .flip-card-back{
    
    transform: rotateY(180deg);
    z-index: 1;
  }
  .wrap-btn{
    text-align: center;
  }
</style>
