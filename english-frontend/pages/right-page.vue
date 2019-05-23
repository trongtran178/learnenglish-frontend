<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title class="justify-center subheading">
          <!-- Lesson 1 : Hello world -->
        </v-card-title>
        <div class="text-xs-center">
          <v-avatar size="120px">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
          </v-avatar>
        </div>
        <v-card-actions class="justify-center">
          <v-btn @click="$router.push('/')" round color="primary">HỌC CÁC CHỦ ĐỀ KHÁC</v-btn>
        </v-card-actions>
      </v-card>

    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-title class="justify-center subheading">
          <!-- Lesson 1 : Hello world -->
        </v-card-title>
        <div class="text-xs-center">
          <!-- <v-avatar size="150px"> -->
<<<<<<< HEAD
            <v-img height="250px" src="challenge-icon.png"></v-img>
=======
            <v-img height="220px" style="width:150px; height:150px; margin-left:45px;" src="war_btn.png"></v-img>
>>>>>>> 4e1c9c9ccddf7bcecb41db22f842b296cac68690
          <!-- </v-avatar> -->
        </div>
        <v-card-actions class="justify-center">
          <v-btn @click="openChallengeDialog" round color="secondary">THÁCH ĐẤU</v-btn>
        </v-card-actions>
      </v-card>
      <v-card>

      </v-card>
    </v-flex>
    <challenge-dialog></challenge-dialog>
  </v-layout>
</template>

<script>
   const ChallengeDialog = () => import('~/components/Challenge.vue');
  export default {

    components: {
      ChallengeDialog
    },
    
    data: function () {
      return {

      }
    },

    computed: {
      challengeDialog: {
        get() {
          return this.$store.state.englishpage.openChallengeDialog;
        },
        set(value) {
          this.$store.commit('englishpage/setChallengeDialog', value);
        }
      }
    },
    methods: {
      openChallengeDialog() {
        this.challengeDialog = true;
      }
    }
  }

</script>

<style>

</style>
