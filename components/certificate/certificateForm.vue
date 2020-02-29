<template>
  <div>
    {{ snackbar }}
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
        <v-form
          v-model="valid"
          novalidate="true"
          @submit.prevent="handleSubmit"
        >
          <v-row>
            <v-col>
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
            </v-col>
          </v-row>
          <v-card-actions class="mx-auto text-center justify-center">
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary white--text" class="ma-3">
              {{ buttonText }}
            </v-btn>
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
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AddGroup',
  props: {
    fillCert: {
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
    }
  },
  data() {
    return {
      test: '',
      valid: true
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
      if (!this.$v.fillCert.thumbnailUrl.$dirty) return errors;
      !this.$v.fillCert.thumbnailUrl.required &&
        errors.push('Field is required');
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
    ...mapActions({
      addme: 'certificate/addTodo'
    }),
    handleSubmit(e) {
      // this.$emit('readyToUpdate', this.fillCert);
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.fillCert.$error) {
        this.$v.$touch();
      } else {
        // console.log('my component fillcert ', this.fillCert);
        this.addme(this.fillCert);
        if (this.snackbar.color === 'red') {
          console.log(this.snackbar.color);
          this.$router.push({
            path: `/certificate/edit/${this.$route.params.id}`
          });
        } else {
          // setTimeout(
          //   () => this.$router.push({ path: '/certificate/list/' }),
          //   4000
          // );
        }
        // this.$store.dispatch('certificate/addTodo', this.fillCert);
      }
    },
    clear() {
      this.$v.$reset();
      this.fillCert.name = '';
      this.fillCert.fullchain = null;
      this.fillCert.cert = null;
      this.fillCert.chain = null;
      this.$store.commit('certificate/SET_NOTIFICATION', {
        message: 'All validation cleared!',
        color: 'warning',
        show: true
      });
    }
  },
  validations: {
    fillCert: {
      title: { required },
      thumbnailUrl: { required }
      // key: { required },
      // cert: { required },
      // chain: { required }
    }
  }
};
</script>
