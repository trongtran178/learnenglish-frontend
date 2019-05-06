<template>
  <v-layout>

    <v-flex xs1 sm2 md2>
      <left-page></left-page>
    </v-flex>
    <v-flex xs11 sm8 md8>
       <!-- ResultLearning -->
       <result-learning></result-learning>
      <!-- VocabulariesInLesson -->
      <!-- <vocabularies-in-lesson></vocabularies-in-lesson> -->
    </v-flex>
    <v-flex xs1 sm2 md2>
      <right-page></right-page>
    </v-flex>
    

  </v-layout>
</template>

<script>
  import axios from 'axios'
  import Vuex from 'vuex'
  import LeftPage from './left-page.vue';
  import RightPage from './right-page.vue';
  import ResultLearning from '~/components/ResultLearning.vue'

  import {
    mapMutations
  } from 'vuex'



  export default {

    components: {
      LeftPage,
      RightPage,
      ResultLearning
    },
    data: function () {
      return {

      }
    },

    methods: {

    },
    computed: {
   
    },
    mounted() {
    
    }

  }

</script>
