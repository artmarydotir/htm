<template>
  <div>
    <div>
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
      >
        {{ snackbar.message }}
        <v-btn dark text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
      {{ passes }} - {{ validated }}
      <v-card class="my-8">
        <v-card-title class="grey darken-3">
          Add Certificate
        </v-card-title>
        <v-card-text class="py-4">
          <v-form novalidate="true">
            <v-row>
              <v-col cols="12" md="3">
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  name="Ceretificate name"
                  rules="required"
                >
                  <v-text-field
                    v-model.trim="ceretificate.name"
                    prepend-inner-icon="mdi-account-outline"
                    label="Name"
                    :success="valid"
                    :error-messages="errors"
                    type="text"
                    outlined
                  />
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="2">
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  name="Ceretificate fullchain"
                  rules="required"
                >
                  <v-file-input
                    v-model="ceretificate.fullchain"
                    :error-messages="errors"
                    outlined
                    chips
                    :success="valid"
                    required
                    accept=".pem"
                    label="Full chain"
                  ></v-file-input>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="2">
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  name="Ceretificate chain"
                  rules="required"
                >
                  <v-file-input
                    v-model="ceretificate.chain"
                    :error-messages="errors"
                    outlined
                    accept=".pem"
                    chips
                    :success="valid"
                    label="Chain"
                  ></v-file-input>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="2">
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  name="Ceretificate key"
                  rules="required"
                >
                  <v-file-input
                    v-model="ceretificate.key"
                    :error-messages="errors"
                    outlined
                    chips
                    :success="valid"
                    accept=".pem"
                    label="Private key/private"
                  ></v-file-input>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="2">
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  name="Ceretificate cert"
                  rules="required"
                >
                  <v-file-input
                    v-model="ceretificate.cert"
                    :error-messages="errors"
                    outlined
                    chips
                    :success="valid"
                    accept=".pem"
                    label="Cert"
                  ></v-file-input>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Ceretificate url"
                  rules="validUrl"
                >
                  <v-text-field
                    v-model.trim="ceretificate.url"
                    :error-messages="errors"
                    hint="This field is optional."
                    label="certificate server"
                    type="text"
                    :success="errors.length == '' && ceretificate.url !== ''"
                    outlined
                    prepend-inner-icon="mdi-link"
                  />
                </ValidationProvider>
              </v-col>
              <v-col v-if="ceretificate.url" cols="12" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Api token"
                  rules="required"
                >
                  <v-text-field
                    v-model.trim="ceretificate.hash"
                    :error-messages="errors"
                    label="Api token"
                    type="text"
                    outlined
                    required
                    prepend-inner-icon="mdi-key-arrow-right"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-card-actions class="mx-auto text-center justify-center">
              <v-spacer></v-spacer>
              <div v-if="addCert">
                <v-btn
                  type="submit"
                  color="primary white--text"
                  class="ma-3"
                  :disabled="invalid || !validated"
                  @click.prevent="passes(save)"
                >
                  {{ buttonText }}
                </v-btn>
              </div>
              <div v-if="editCert">
                <v-btn
                  type="submit"
                  color="primary white--text"
                  class="ma-3"
                  :disabled="invalid || !validated"
                  @click.prevent="edit"
                >
                  {{ buttonText }}
                </v-btn>
              </div>
              <v-btn color="error white--text" class="ma-3" @click="clear">
                {{ cancelAction }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </ValidationObserver>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

import { mapState } from 'vuex';

export default {
  name: 'AddGroup',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    ceretificate: {
      type: Object,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    cancelAction: {
      type: String,
      required: true
    },
    addCert: {
      type: Function,
      required: false,
      default: null
    },
    editCert: {
      type: Function,
      required: false,
      default: null
    }
  },
  data() {
    return {
      test: '',
      valid: false
      // ceretificate: {
      //   fullchain: null,
      //   key: null,
      //   name: '',
      //   cert: null,
      //   chain: null
      // }
    };
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.certificate.snackbar
    })
    // hashError() {
    //   const errors = [];
    //   // console.log(this.$v.ceretificate.url);
    //   if (!this.$v.ceretificate.url.$invalid) return errors;
    //   errors.push(
    //     'Api token is required, if you fill the certificate server url.'
    //   );
    //   return errors;
    // }
  },
  created() {
    this.$store.commit('certificate/SET_NOTIFICATION', {
      message: '',
      show: false
    });
  },
  methods: {
    save() {
      this.$refs.obs.validate();
      // this.$v.$touch();
      // if (this.$v.ceretificate.$error) {
      //   this.$v.$touch();
      // } else {
      //   this.addCert();
      // }
      this.addCert();
    },
    edit() {
      this.$refs.obs.validate();
      if (this.$v.ceretificate.$error) {
        this.$v.$touch();
      } else {
        this.editCert();
      }
    },
    // handleSubmit(e) {
    //   if (this.$v.fillCert.$error) {
    //     this.$v.$touch();
    //   } else {
    //     this.save();
    //   }
    // },
    // ...mapActions({
    //   addme: 'certificate/addTodo'
    // }),
    // handleSubmit(e) {
    //   this.submitted = true;
    //   this.$v.$touch();
    //   if (this.$v.fillCert.$error) {
    //     this.$v.$touch();
    //   } else {
    //     this.addme(this.fillCert);
    //     setTimeout(
    //       () => this.$router.push({ path: '/certificate/list/' }),
    //       6000
    //     );
    //   }
    // },
    clear() {
      this.$v.$reset();
      this.ceretificate.name = '';
      this.ceretificate.fullchain = null;
      this.ceretificate.cert = null;
      this.ceretificate.chain = null;
      this.$store.commit('certificate/SET_NOTIFICATION', {
        message: 'All validation cleared!',
        color: 'warning',
        show: true
      });
    }
  }
};
</script>
