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
    <!-- start card  -->
    <v-card class="my-8">
      <v-card-title class="grey darken-3">
        Add Upstream
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
                v-model.trim="upstream.name"
                prepend-inner-icon="mdi-account-outline"
                label="Upstream Name"
                type="text"
                outlined
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <!-- server  -->
          <div class="display-1 py-5">
            <v-icon large>mdi-server</v-icon>
            <span class="pt-3">
              Server Fields
            </span>
          </div>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="server.ip"
                label="Server"
                hint="Server could be ip/host+port"
                outlined
                required
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="server.title"
                label="Title"
                hint="Title should be uniqe"
                outlined
                required
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim.number="server.weight"
                hint="default value of weight is 1."
                outlined
                min="1"
                max="99"
                label="weight"
                type="number"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="server.maxconnection"
                hint="Could be 0 to unlimited."
                outlined
                min="0"
                label="Max Connection"
                type="number"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="server.maxfails"
                hint="Sould come with timeout."
                outlined
                min="1"
                label="Max Fails"
                type="number"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-checkbox
                v-model="server.backup"
                label="Backup"
                required
              ></v-checkbox>
            </v-col>
            <v-col cols="12" md="3">
              <v-checkbox
                v-model="server.down"
                label="Down"
                required
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <!-- load balance  -->
          <div class="display-1 py-5">
            <v-icon large>mdi-ballot-outline</v-icon>
            <span class="pt-3">
              Load Balance Methods
            </span>
          </div>
          <v-row>
            <v-col cols="12" md="3">
              <v-select
                v-model="server.balance"
                :items="balancing"
                outlined
                item-text="name"
                item-key="value"
                return-object
                label="Choose method"
                required
              ></v-select>
            </v-col>
            <!-- if cookie  -->
            {{ server.balance.value }}
            <div v-if="server.balance.value === 'cookie'">
              <!-- <v-col cols="12" md="3">
                <v-text-field
                  v-model.trim="server.cookiename"
                  label="Cookie Name"
                  type="text"
                  outlined
                />
              </v-col> -->
            </div>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="server.keepreq"
                hint="defualt is 100."
                outlined
                min="0"
                max="1000000"
                label="Keepalive Request"
                type="number"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="server.keeptimeout"
                hint="defualt is 60 seconds"
                outlined
                min="1"
                max="3600"
                label="Keepalive Timeout"
                type="number"
              />
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
      balancing: [
        {
          name: 'Hash ip',
          value: 'ip'
        },
        {
          name: 'Cookie',
          value: ' cookie'
        },
        {
          name: 'None',
          value: 'none'
        }
      ],
      snackbar: {
        show: false,
        message: null,
        timeout: 6000,
        color: null
      },
      valid: true,
      server: {
        ip: null,
        title: 'async',
        weight: 1,
        maxconnection: 0,
        maxfails: 0,
        backup: true,
        down: false,
        balance: '',
        cookiename: '',
        keepreq: 100,
        keeptimeout: 60
      },
      upstream: {
        name: ''
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
