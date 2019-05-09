<template>
<div v-if="isSuccessLoading">
    <v-card color="white" height="700">
    <v-flex xs12 sm6 offset-sm3>
      <v-card color="light-blue lighten-5" class="mt-5" height="450">
        <v-img
          class="white--text"
          height="300px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkdWS806kj9XDM9HYnu1ook5WrBSpLQzS8shnB2DEAdSgUsIVf"
        >
          
        </v-img>
        <div class="title mt-5" id="congratulate">
            Bạn đã hoàn thành chủ đề <span class="name">{{lessonName}}</span>
        </div>
        <v-card-actions class="justify-center mt-3">
          <v-btn @click="redirectPageVocabularyLesson(lessonID,lessonName)" round color="blue-grey darken-4"><span class="color-white">HỌC TIẾP</span></v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    </v-card>
    </div>
</template>
<script>
    import axios from 'axios'
  import Vuex from 'vuex'
  
  import ResultLearning from '~/components/ResultLearning.vue'
export default {
    data: function () {
      return {
        lessonID: null,
        lessonName: null,
        isSuccessLoading: false
      }
    },
    methods: {
        redirectPageVocabularyLesson(lessonID,lessonName){
            console.log(lessonID);
            console.log(lessonName);
            this.$router.push({
                path: 'vocabularies-in-lesson',
                query: {
                    id: lessonID,
                    name: lessonName
                }
            })
        }
    },
    mounted() {
      this.lessonID = this.$route.query.id;
      this.lessonName = this.$route.query.name;
      console.log('lession ID lấy đc '+this.lessonID);
      console.log('lession name lấy đc '+this.lessonName);
      this.isSuccessLoading = true;

      
    },
}
</script>

<style scoped>
    #congratulate{
        text-align: center; 
         
        color:chocolate;
    }
    .name{
        font-size: 25px;
        font-weight: bold;
        color:green;
    }
    .color-white{
        color: white;
    }
</style>

