<template>
  <v-card class="scroll" height="700" >
    <!-- <v-layout row wrap> -->
    <v-card-title class="title">
      <div class="body-1 text-xs-left">
        <v-icon small>arrow_left</v-icon> Quay lại
      </div>
      <div>

      </div>
      <v-spacer></v-spacer>
      <template v-if="player==='user'" class="header">
      <div>
        
        
          <span style="margin-right:55px;">BẠN THUA</span>
          <audio controls="controls" hidden autoplay="autoplay" src="/loser.wav"></audio>
        
      </div>
    </template>
    <template v-else-if="player==='computer'" class="header">
      <div>
       BẠN THẮNG
       <audio controls="controls" hidden autoplay="autoplay" src="/victory.mp3"></audio>
       </div>
    </template>
    <template v-else-if="player==='hoanhau'" class="header">
      <div>HÒA NHAU</div>
      <audio controls="controls" hidden autoplay="autoplay" src="/equal.wav"></audio>
    </template>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <template v-if="player==='user'" style="text-align:center;">
        <v-card-text class="wrapper">
          <img style="color:yellow" src="/lose.JPG"/>
          <p class="text-md-center text">BẠN ĐÃ THUA MẤT RỒI!</p>
          <p class="text-xs-center text">CỐ GẮNG LẦN SAU NHÉ</p>
          <v-card-actions class="justify-center">
            <v-btn @click="$router.push('/')" style="font-size:20px;" round color="secondary">HOME SCREEN</v-btn>
            <v-btn @click="openChallengeDialog" style="font-size:20px;margin-left:20px; color:white" round color="#DD2C00">&nbsp;PLAY &nbsp;AGAIN&nbsp;</v-btn>
          </v-card-actions>
        </v-card-text>
    </template>
    <template v-else-if="player==='computer'" style="text-align:center;">
        <v-card-text class="wrapper">
          <audio controls="controls" hidden autoplay="autoplay" src="/victory.mp3"></audio>
          <img style="color:yellow" src="/win.JPG"/>
          <p class="text-md-center text">CHÚC MỪNG BẠN ĐÃ CHIẾN THẮNG!</p>
          <p class="text-xs-center text">&nbsp;</p>
          <v-card-actions class="justify-center">
            <v-btn @click="$router.push('/')" style="font-size:20px;" round color="secondary">HOME SCREEN</v-btn>
            <v-btn @click="openChallengeDialog" style="font-size:20px;margin-left:20px; color:white" round color="#DD2C00">&nbsp;PLAY &nbsp;AGAIN&nbsp;</v-btn>
          </v-card-actions>
        </v-card-text>
    </template>
    <template v-else style="text-align:center;">
        <v-card-text class="wrapper">
          
          <img style="color:yellow" src="/win.JPG"/>
          <p class="text-md-center text">BẠN VÀ MÁY HÒA NHAU!</p>
          <p class="text-xs-center text">THẬT NGANG TÀI NGANG SỨC</p>
          <v-card-actions class="justify-center">
            <v-btn @click="$router.push('/')" style="font-size:20px;" round color="secondary">HOME SCREEN</v-btn>
            <v-btn @click="openChallengeDialog" style="font-size:20px;margin-left:20px; color:white" round color="#DD2C00">&nbsp;PLAY &nbsp;AGAIN&nbsp;</v-btn>
          </v-card-actions>
        </v-card-text>
    </template>
    </v-card-text>
    <!-- </v-layout> -->
  </v-card>

</template>

<script>
  import axios from 'axios'
   const ChallengeDialog = () => import('~/components/Challenge.vue');
  export default {
    components: {
      ChallengeDialog
    },
    data: function() {
       return {
        player: null,
        score: 0
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
        this.$router.push('/');
        this.challengeDialog = true;
      }
    },

    mounted() {

      this.player = this.$route.query.player;
      this.score = this.$route.query.score;
      console.log(this.player);
      console.log(this.score)
      setTimeout(() => {
        this.$router.push('/');
      }, 20000)
    }
  }

</script>

<style scoped>
  .scroll {
    overflow-y: auto;
  }
  img{
    width:160px;
    height: 250px;
    margin-bottom: 30px;
  }
  .wrapper{
    text-align: center;
    width:700px;
    height:500px;
    background-color:#26306D;
    margin: 0 auto;
    border: 1px solid #26306D;
    border-radius: 20px;
  }
  .header{
    background-color: brown;
  }
  .text{
    font-weight: bold;
    font-size: 25px;
    color: wheat;
  }
</style>
