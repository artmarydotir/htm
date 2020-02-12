<template>
  <v-card class="mx-auto border-rad" height="600px">
    <v-card-text>
      <v-row>
        <v-col sm="12" md="6" lg="7">
          <v-card-title
            class="my-10 text-center justify-center display-1 text--primary"
          >
            WELCOME
          </v-card-title>
          <v-form ref="form" v-model="valid">
            <v-col class="mx-auto" cols="12" md="9" lg="8">
              <v-text-field label="Email" name="login" type="text" outlined>
                <template v-slot:prepend-inner>
                  <v-icon class="mr-2" v-on="on">mdi-email-outline</v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col class="mx-auto" cols="12" md="9" lg="8">
              <v-text-field
                v-model="pass"
                label="Password"
                :append-icon="show1 ? 'mdi-eye-off-outline' : 'mdi-eye'"
                :type="show1 ? 'text' : 'mdi-password'"
                :disabled="otp.length > 0 ? '' : disabled"
                outlined
                small
                @click:append="show1 = !show1"
              >
                <template v-slot:prepend-inner>
                  <v-icon class="mr-2" v-on="on">mdi-lock</v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-card-actions class="mx-auto text-center justify-center">
              <v-btn
                x-large
                color="warning white--text"
                to="/dashboard/"
                class="pl-12 pr-12"
              >
                LOGIN
                <v-icon right dark>
                  mdi-arrow-right
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<style lang="scss" scoped>
.border-rad {
  -webkit-box-shadow: -2px 3px 21px -1px rgba(59, 86, 148, 1);
  -moz-box-shadow: -2px 3px 21px -1px rgba(59, 86, 148, 1);
  box-shadow: -2px 3px 21px -1px rgba(59, 86, 148, 1);
  background-color: #10112e !important;

  border-radius: 35px !important;
  @media only screen and (min-width: 1000px) {
    background-image: url('/bg/waf5.png');
    background-repeat: no-repeat;
    background-position: top right;
    background-size: contain;
  }
}
</style>
<script>
export default {
  name: 'Login',
  data() {
    return {
      tab: null,
      valid: true,
      disabled: false,
      show1: false,
      show2: false,
      rememberMe: false,
      otp: '',
      pass: '',
      lazy: false
    };
  }
};
</script>
<style lang="scss" scoped>
// .v-icon .mdi-email-outline {
//   font-size: 10px !important;
//   margin-right: 8px !important;
//   color: red !important;
// }
// .v-input__icon--append .v-icon {
//   color: purple !important;
// }
</style>
