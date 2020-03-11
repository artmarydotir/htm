<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
    <v-card class="mx-auto border-rad" height="600px">
      <v-card-text>
        <v-row>
          <v-col sm="12" md="6" lg="7">
            <v-card-title
              class="my-10 text-center justify-center display-1 text--primary"
            >
              WELCOME
            </v-card-title>
            <v-form novalidate="true" @submit.prevent="handleSubmit">
              <v-col class="mx-auto" cols="12" md="9" lg="8">
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model.trim="user.email"
                    :error-messages="errors"
                    :success="valid"
                    label="Email"
                    type="email"
                    outlined
                    required
                    prepend-inner-icon="mdi-email-outline"
                  />
                </ValidationProvider>
              </v-col>
              <v-col class="mx-auto" cols="12" md="9" lg="8">
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  name="Password"
                  rules="required|min:6"
                >
                  <v-text-field
                    v-model.trim="user.password"
                    :error-messages="errors"
                    :success="valid"
                    :counter="6"
                    label="Password"
                    :append-icon="show1 ? 'mdi-eye-off-outline' : 'mdi-eye'"
                    :type="show1 ? 'text' : 'password'"
                    outlined
                    small
                    required
                    prepend-inner-icon="mdi-lock"
                    @click:append="show1 = !show1"
                  />
                </ValidationProvider>
              </v-col>
              <v-card-actions class="mx-auto text-center justify-center">
                <v-btn
                  type="submit"
                  x-large
                  color="warning white--text"
                  class="pl-12 pr-12"
                  :disabled="invalid || !validated"
                  @click="passes(handleSubmit)"
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
  </ValidationObserver>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'Login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      submitted: false,
      show1: false,
      show2: false
    };
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;

      this.$refs.obs.validate();
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user));
      this.$router.push('/dashboard/');
    }
  }
};
</script>
<style lang="scss" scoped></style>
