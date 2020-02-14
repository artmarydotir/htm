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
          <v-form
            v-model="valid"
            novalidate="true"
            @submit.prevent="handleSubmit"
          >
            <v-col class="mx-auto" cols="12" md="9" lg="8">
              <v-text-field
                v-model.trim="user.email"
                :error-messages="emailErrors"
                label="Email"
                name="login"
                type="email"
                outlined
                @input="$v.user.email.$touch()"
                @blur="$v.user.email.$touch()"
              >
                <template v-slot:prepend-inner>
                  <v-icon class="mr-2">mdi-email-outline</v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col class="mx-auto" cols="12" md="9" lg="8">
              <v-text-field
                v-model.trim="user.password"
                :error-messages="passwordErrors"
                :counter="6"
                label="Password"
                :append-icon="show1 ? 'mdi-eye-off-outline' : 'mdi-eye'"
                :type="show1 ? 'text' : 'password'"
                outlined
                small
                @click:append="show1 = !show1"
                @input="$v.user.password.$touch()"
                @blur="$v.user.password.$touch()"
              >
                <template v-slot:prepend-inner>
                  <v-icon class="mr-2">mdi-lock</v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-card-actions class="mx-auto text-center justify-center">
              <v-btn
                type="submit"
                x-large
                color="warning white--text"
                class="pl-12 pr-12"
                :disabled="!valid"
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
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      submitted: false,
      show1: false,
      show2: false,
      valid: true
    };
  },
  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.email && errors.push('Must be valid e-mail');
      !this.$v.user.email.required && errors.push('E-mail is required');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) return errors;
      !this.$v.user.password.minLength &&
        errors.push('Password must be at least 6 characters long');
      !this.$v.user.password.required && errors.push('Password is required.');
      return errors;
    }
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.user.$error) return;
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user));
      this.$router.push('/dashboard');
    }
  }
};
</script>
<style lang="scss" scoped></style>
