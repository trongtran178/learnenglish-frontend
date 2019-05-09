<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title class="justify-center subheading">
          Lesson 1 : Hello world
        </v-card-title>
        <div class="text-xs-center">
          <v-avatar size="120px">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
          </v-avatar>
        </div>
        <v-card-actions class="justify-center">
          <v-btn @click="$router.push('/')" round color="primary">HỌC 99 CHỦ ĐỀ KHÁC</v-btn>
        </v-card-actions>
      </v-card>

    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-title class="justify-center subheading">
          Lesson 1 : Hello world
        </v-card-title>
        <div class="text-xs-center">
          <v-avatar size="120px">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
          </v-avatar>
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
