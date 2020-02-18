<template>
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
    <v-card class="my-8">
      <v-card-title class="grey darken-3">
        Add Certificate
      </v-card-title>
      <v-card-text class="py-4">
        <v-form
          v-model="valid"
          novalidate="true"
          @submit.prevent="handleSubmit"
        >
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
            <v-btn type="submit" color="primary white--text" class="ma-3">
              Add
            </v-btn>
            <v-btn color="error white--text" class="ma-3" @click="clear">
              Clear
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
export default {
  name: 'AddGroup',
  data() {
    return {
      snackbar: {
        show: false,
        message: null,
        timeout: 6000,
        color: null
      },
      valid: true,
      ceretificate: {
        fullchain: null,
        key: null,
        name: '',
        cert: null,
        chain: null
      }
    };
  },
  computed: {
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
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.ceretificate.$error) {
        this.snackbar = {
          message: 'please check all errors!',
          color: 'pink',
          show: true
        };
        return;
      }
      this.$router.push('/certificate/list/');
    },
    clear() {
      this.$v.$reset();
      this.ceretificate.name = '';
      this.ceretificate.fullchain = null;
      this.ceretificate.cert = null;
      this.ceretificate.chain = null;
      this.snackbar = {
        message: 'All validation cleared!',
        color: 'warning',
        show: true
      };
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
