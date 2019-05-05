<template>
  <v-layout>

    <v-flex xs1 sm2 md2>
      <left-page></left-page>
    </v-flex>
    <v-flex xs11 sm8 md8>
        <loser></loser>
    </v-flex>
    <v-flex xs1 sm2 md2>
      <right-page></right-page>
    </v-flex>


  </v-layout>
</template>

<script>
  import axios from 'axios'
  import Vuex from 'vuex'
  import LeftPage from './left-page.vue'
  import RightPage from './right-page.vue'
  import Loser from '~/components/Loser.vue'
  export default {

    components: {

      LeftPage,
      RightPage,
      Loser
    },
    data: function () {
      return {

      }
    },

    methods: {

    },
    computed: {

    },

  }

</script>
