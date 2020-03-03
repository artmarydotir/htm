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

    <v-card class="my-8">
      <v-card-title class="grey darken-3">
        Add Certificate
      </v-card-title>
      <v-card-text class="py-4">
        <v-form v-model="valid" novalidate="true">
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="ceretificate.name"
                prepend-inner-icon="mdi-account-outline"
                label="Name"
                :error-messages="nameError"
                type="text"
                outlined
                @input="$v.ceretificate.name.$touch()"
                @blur="$v.ceretificate.name.$touch()"
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-file-input
                v-model="ceretificate.fullchain"
                :error-messages="fullchainError"
                outlined
                chips
                counter
                required
                accept=".pem"
                label="Full chain"
                @input="$v.ceretificate.fullchain.$touch()"
                @blur="$v.ceretificate.fullchain.$touch()"
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="2">
              <v-file-input
                v-model="ceretificate.chain"
                :error-messages="chainError"
                outlined
                accept=".pem"
                chips
                counter
                label="Chain"
                @input="$v.ceretificate.chain.$touch()"
                @blur="$v.ceretificate.chain.$touch()"
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="2">
              <v-file-input
                v-model="ceretificate.key"
                :error-messages="keyError"
                outlined
                chips
                accept=".pem"
                counter
                label="Private key/private"
                @input="$v.ceretificate.key.$touch()"
                @blur="$v.ceretificate.key.$touch()"
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="2">
              <v-file-input
                v-model="ceretificate.cert"
                :error-messages="certError"
                outlined
                chips
                accept=".pem"
                counter
                label="Cert"
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="ceretificate.url"
                :error-messages="urlError"
                hint="This field is optional."
                label="certificate server"
                type="text"
                outlined
                prepend-inner-icon="mdi-link"
                @input="$v.ceretificate.url.$touch()"
                @blur="$v.ceretificate.url.$touch()"
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model.trim="ceretificate.hash"
                :error-messages="hashError"
                hint="This field is optional."
                label="Api token"
                type="text"
                outlined
                prepend-inner-icon="mdi-key-arrow-right"
                @input="$v.ceretificate.hash.$touch()"
                @blur="$v.ceretificate.hash.$touch()"
              />
            </v-col>
          </v-row>
          <v-card-actions class="mx-auto text-center justify-center">
            <v-spacer></v-spacer>
            <div v-if="addCert">
              <v-btn
                type="submit"
                color="primary white--text"
                class="ma-3"
                :disabled="!valid"
                @click.prevent="save"
              >
                {{ buttonText }}
              </v-btn>
            </div>
            <div v-if="editCert">
              <v-btn
                type="submit"
                color="primary white--text"
                class="ma-3"
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
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import { required, url } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';

export default {
  name: 'AddGroup',
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
    }),
    nameError() {
      const errors = [];
      if (!this.$v.ceretificate.name.$dirty) return errors;
      !this.$v.ceretificate.name.required && errors.push('Field is required');
      return errors;
    },
    fullchainError() {
      const errors = [];
      if (!this.$v.ceretificate.fullchain.$dirty) return errors;
      !this.$v.ceretificate.fullchain.required &&
        errors.push('Fullchain is required');
      return errors;
    },
    keyError() {
      const errors = [];
      if (!this.$v.ceretificate.key.$dirty) return errors;
      !this.$v.ceretificate.key.required &&
        errors.push('Key field is required');
      return errors;
    },
    certError() {
      const errors = [];
      if (!this.$v.ceretificate.cert.$dirty) return errors;
      !this.$v.ceretificate.cert.required &&
        errors.push('Cert field is required');
      return errors;
    },
    chainError() {
      const errors = [];
      if (!this.$v.ceretificate.chain.$dirty) return errors;
      !this.$v.ceretificate.chain.required &&
        errors.push('Chain field is required');
      return errors;
    },
    urlError() {
      const errors = [];
      if (!this.$v.ceretificate.url.$dirty) return errors;
      !this.$v.ceretificate.url.url && errors.push('Url is not valid.');
      return errors;
    },
    hashError() {
      const errors = [];
      // console.log(this.$v.ceretificate.url);
      if (!this.$v.ceretificate.url.$invalid) return errors;
      errors.push(
        'Api token is required, if you fill the certificate server url.'
      );
      return errors;
    }
  },
  created() {
    this.$store.commit('certificate/SET_NOTIFICATION', {
      message: '',
      show: false
    });
  },
  methods: {
    save() {
      this.$v.$touch();
      if (this.$v.ceretificate.$error) {
        this.$v.$touch();
      } else {
        this.addCert();
      }
    },
    edit() {
      this.$v.$touch();
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
  },
  validations: {
    ceretificate: {
      name: { required },
      fullchain: { required },
      key: { required },
      cert: { required },
      chain: { required },
      url: { url },
      hash: { required }
    }
  }
};
</script>
