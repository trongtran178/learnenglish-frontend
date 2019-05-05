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
      <template v-if="player==='user'">
      <div>
       BẠN ĐÃ THUA MẤT RỒI
      </div>
    </template>
    <template v-else-if="player==='computer'">
      <div>
       CHÚC MỪNG BẠN ĐÃ CHIẾN THẮNG
       </div>
    </template>
    <template v-else>
      <div>Bạn và máy đã hòa nhau rồi, thật là ngang tài ngang sức mà, hihi</div>
    </template>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <template v-if="player==='user'">
      Xin chia buồn cùng bạn, hãy cố gắng lần sau nhé !
    </template>
    </v-card-text>
    <!-- </v-layout> -->
  </v-card>

</template>

<script>
  import axios from 'axios'
  export default {
    
    data: function() {
       return {
        player: null,
       }
    },
    
    computed: {
     
    },
    methods: {
      
    },

    mounted() {

      this.player = this.$route.query.player;
      console.log(this.player);
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
