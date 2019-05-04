<template>
  <v-dialog v-model="challengeDialog" width="900">
    <v-card>
      <v-card-title class="justify-center">

        <v-chip color="primary" text-color="white">
          <v-icon left>start</v-icon>
          <div class="display-1">KING OF WORDS</div>
          <v-icon right>start</v-icon>
        </v-chip>
      </v-card-title>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="openChallengeWithComputerRoom">THÁCH ĐẤU VỚI MÁY</v-btn>
        <v-btn color="secondary" disabled>CHƠI NGẪU NHIÊN</v-btn>
      </v-card-actions>
    </v-card>
    <challenge-room></challenge-room>
  </v-dialog>
</template>

<script>
  import ChallengeRoom from './ChallengeRoom.vue';
  export default {

    components: {
      ChallengeRoom
    },

    computed: {
      challengeDialog: {
        get() {
          return this.$store.state.englishpage.openChallengeDialog;
        },
        set(value) {
          this.$store.commit('englishpage/setChallengeDialog', value);
        }
      },
      challengeWithComputer: {
        get() {
          return this.$store.state.englishpage.openChallengeWithComputerRoomDialog;
        },
        set(value) {
          this.$store.commit('englishpage/setChallengeWithComputerRoomDialog', value);
        }
      }
    },

    methods: {
      openChallengeWithComputerRoom() {
        this.challengeDialog = false;
        this.challengeWithComputer = true;
      }
    }

  }

</script>
<style scoped>

</style>
