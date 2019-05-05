<template>
  <v-card class="scroll" height="0">
    <v-layout row wrap>
      <v-flex xs3></v-flex>
      <v-flex xs6>
        <div class="text-xs-center">
          <div id="app">
            <v-container>
              <v-layout row class="text-xs-center" style="padding-top:20%;">
                <v-flex xs12 class="blue lighten-4">
                  <v-container style="position: relative;top: 0%;" class="text-xs-center">
                    <v-card flat>
                      <v-card-title primary-title>
                        <h1>Login and learn everything !</h1>
                      </v-card-title>
                      <v-form method="POST">
                        <v-text-field
                          prepend-icon="person"
                          name="Username"
                          label="Username"
                          v-model="userName"
                        ></v-text-field>
                        <v-text-field
                          prepend-icon="lock"
                          name="Password"
                          label="Password"
                          type="password"
                          v-model="passWord"
                        ></v-text-field>
                        <v-card-actions>
                          <v-btn primary large block @click="checkLogin">Login</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-container>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
        </div>
      </v-flex>
      <v-flex xs3>
        <div class="text-xs-right"></div>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      userName: null,
      passWord: null
    };
  },
  computed: {
    isLoginSuccess: {
      get() {
        return this.$store.state.englishpage.isLoginSuccess;
      },
      set(value) {
        this.$store.commit("englishpage/setLoginSuccess", value);
      }
    },
    userLogin: {
      get() {
        return this.$store.state.englishpage.userLogin;
      },

      set(value) {
        this.$store.commit("englishpage/setUserLogin", value);
      }
    }
  },
  methods: {
    checkLogin() {
      var self = this;
      axios
        .post(`http://localhost:8080/login/checklogin`, {
          userName: self.userName,
          passWord: self.passWord
        })
        .then(function(response) {
          console.log(response);
          if (response.data === true) {
            self.isLoginSuccess = true;
            self.userLogin = {
              userName: self.userName,
              passWord: self.passWord
            };
            localStorage.setItem("isLogin", self.isLoginSuccess);
            localStorage.setItem("userLogin", self.userLogin.userName);
            console.log(self.userLogin);
            self.$router.push("/");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
</style>

