<template>
  <v-card class="scroll" height="700">
    <!-- <v-layout row wrap> -->
    <v-card-title class="title">
      <div class="body-1 text-xs-left">
        <v-icon small>arrow_left</v-icon> Quay lại
      </div>
      <div>

      </div>
      <v-spacer></v-spacer>
      <div>
       BẠN ĐÃ THUA MẤT RỒI
      </div>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      Xin chia buồn cùng bạn, hãy cố gắng lần sau nhé !
    </v-card-text>
    <!-- </v-layout> -->
  </v-card>

</template>

<script>
  import axios from 'axios'
  export default {
    computed: {
     
    },
    methods: {
     
    },

    mounted() {
      setTimeout(() => {
        this.$router.push('/');
      }, 5000)
    }
  }

</script>

<style scoped>
  .scroll {
    overflow-y: auto;
  }

</style>
