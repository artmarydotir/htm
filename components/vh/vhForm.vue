<template>
  <div>
    {{ $data.vh }}
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
        Add Server
      </v-card-title>
      <v-card-text class="py-4">
        <v-form
          v-model="valid"
          novalidate="true"
          @submit.prevent="handleSubmit"
        >
          <v-row>
            <!-- 1 -->
            <v-col cols="12" md="2">
              <v-select
                v-model="vh.protocol"
                :items="protocols"
                outlined
                item-text="name"
                item-key="value"
                label="Choose Protocol"
                required
                return-object
              ></v-select>
            </v-col>
            <!-- 2 -->
            <v-col cols="12" md="2">
              <v-select
                v-model="vh.certificate"
                :items="certificateList"
                outlined
                item-text="name"
                item-key="value"
                label="Choose Certificate"
                required
                return-object
              ></v-select>
            </v-col>
            <!-- 3 -->
            <v-col cols="12" md="2">
              <v-text-field
                v-model.trim="vh.port"
                prepend-inner-icon="mdi-account-outline"
                label="Port"
                type="text"
                outlined
              />
            </v-col>
            <!-- 4 -->
            <v-col cols="12" md="2">
              <v-checkbox
                v-model="vh.redirect"
                label="Redirect to https"
                required
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <!-- 5 -->
          <v-row class="display-1 py-5">
            <v-col cols="11">
              <v-icon large>mdi-server</v-icon>
              <span class="pt-3">
                Add Server Names
              </span>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" md="1">
              <v-btn color="green" @click="add">
                Add Host
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="i in vh.hostList" :key="i" cols="12" md="3">
              <v-text-field
                prepend-inner-icon="mdi-account-outline"
                type="text"
                outlined
              >
                <template v-slot:label> Host - {{ i + 1 }} </template>
              </v-text-field>
            </v-col>
          </v-row>
          <!-- <v-row class="display-1 py-5">
            <v-col cols="11">
              <v-icon large>mdi-server</v-icon>
              <span class="pt-3">
                Server Fields
              </span>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" md="1">
              <v-btn color="green" @click="add">
                Add Server
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-for="(value, i) in upstream.serverlist" :key="i">
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="value.ip"
                label="Server"
                hint="Server could be ip/host+port"
                outlined
                required
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="value.title"
                label="Title"
                hint="Title should be uniqe"
                outlined
                required
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim.number="value.weight"
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
                v-model.trim="value.maxconnection"
                hint="Could be 0 to unlimited."
                outlined
                min="0"
                label="Max Connection"
                type="number"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="value.maxfails"
                hint="Sould come with timeout."
                outlined
                min="1"
                label="Max Fails"
                type="number"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-checkbox
                v-model="value.backup"
                label="Backup"
                required
              ></v-checkbox>
            </v-col>
            <v-col cols="12" md="3">
              <v-checkbox
                v-model="value.down"
                label="Down"
                required
              ></v-checkbox>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4">
              <v-btn class="mx-2" dark color="pink" @click="remove(index)">
                Delete server
              </v-btn>
            </v-col>
            <v-col v-if="servers.length >= 1" cols="12" class="pb-6">
              <v-divider></v-divider>
            </v-col>
          </v-row> -->
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
      divider: false,
      protocols: [
        {
          name: 'Http',
          value: 'http'
        },
        {
          name: 'Https',
          value: 'https'
        }
      ],
      certificateList: [
        {
          name: '*.eghtesadnews.com',
          value: '1'
        },
        {
          name: 'den.com',
          value: '2'
        },
        {
          name: 'ilna.news',
          value: '3'
        }
      ],
      snackbar: {
        show: false,
        message: null,
        timeout: 6000,
        color: null
      },
      valid: true,
      hosts: 'e',
      vh: {
        protocol: '',
        certificate: '',
        redirect: true,
        port: '',
        domain: '',
        path: '/',
        httponly: true,
        secure: true,
        keepreq: 100,
        keeptimeout: 60,
        hostList: ['e']
      }
    };
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
    },
    add(index) {
      this.vh.hostList.push({});
    },
    remove(index) {
      console.log(index);
      this.servers.splice(index, 1);
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
