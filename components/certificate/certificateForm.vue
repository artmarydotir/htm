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
            <!-- <v-col>
              <v-text-field
                v-model.trim="fillCert.title"
                label="test name"
                type="text"
                outlined
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="fillCert.thumbnailUrl"
                prepend-inner-icon="mdi-account-outline"
                label="Name"
                :error-messages="nameError"
                type="text"
                outlined
                @input="$v.fillCert.thumbnailUrl.$touch()"
                @blur="$v.fillCert.thumbnailUrl.$touch()"
              />
            </v-col> -->
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
                accept=".pem"
                required
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
                @click="edit"
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
import { required } from 'vuelidate/lib/validators';
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
    }
  },
  created() {
    this.$store.commit('certificate/SET_NOTIFICATION', {
      message: 'Attention! editing mood activated.',
      show: true
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
      chain: { required }
    }
  }
};
</script>
