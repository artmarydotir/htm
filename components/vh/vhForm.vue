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
              ></v-select>
            </v-col>
            <!-- 2 -->
            <v-col cols="12" md="2">
              <v-select
                v-model="vh.certificate"
                :items="certificateList"
                outlined
                label="Choose Certificate"
                required
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
            <v-col
              v-for="(host, index) in vh.hostList"
              :key="index"
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="host.name"
                prepend-inner-icon="mdi-account-outline"
                type="text"
                outlined
              >
                <template v-slot:label> Host {{ index + 1 }} </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <!-- 6 -->
          <v-row class="mt-8">
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="vh.keepreq"
                hint="defualt is 100."
                outlined
                min="0"
                max="1000000"
                label="Keepalive Request"
                type="number"
              />
            </v-col>
            <!-- 7 -->
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="vh.keeptimeout"
                hint="defualt is 60 seconds"
                outlined
                min="1"
                max="3600"
                label="Keepalive Timeout"
                type="number"
              />
            </v-col>
            <!-- 8 -->
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="vh.requestpsize"
                hint="defualt is 4 kb"
                outlined
                min="1"
                label="Request Pull Size"
                type="number"
              />
            </v-col>
            <!-- 9 -->
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="vh.clientheadertimeoute"
                hint="defualt is 5 seconds"
                outlined
                min="1"
                max="3600"
                label="Client Header Timeoute"
                type="number"
              />
            </v-col>
            <!-- 10 -->
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="vh.clientheaderbuffersize"
                hint="defualt is 1K."
                outlined
                min="1"
                label="Client Header Buffer Size"
                type="number"
              />
            </v-col>
            <!-- Large Client header buffer has tow option:  -->
            <!-- 11 -->
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="vh.lgbuffersize"
                hint="defualt is 8 kb."
                outlined
                min="1"
                label="Large Client Header Buffer Size"
                type="number"
              />
            </v-col>
            <!-- 12 -->
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="vh.lgbuffersize"
                hint="defualt is 4"
                outlined
                min="1"
                label="Large Client Header Buffer Number"
                type="number"
              />
            </v-col>
            <!-- 13 -->
            <v-col cols="12" md="3">
              <v-checkbox
                v-model="vh.mergeslash"
                label="Merge /"
                required
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="display-1 py-5">
            <v-col cols="10">
              <v-icon large>mdi-city</v-icon>
              <span class="pt-3">
                Add Location
              </span>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" md="1" class="mr-9">
              <v-btn color="green" @click="addLocation">
                Add Location
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-for="(loc, index) in vh.loacationList" :key="index">
            <v-col cols="12" md="1">
              <v-btn class="mt-3" dark color="pink">
                Location {{ index + 1 }} :
              </v-btn>
            </v-col>
            <!-- 1 -->
            <v-col cols="12" md="2">
              <v-text-field
                v-model.trim="loc.path"
                label="Path"
                hint="Enter your Path."
                outlined
                required
              />
            </v-col>
            <!-- 2 -->
            <v-col cols="12" md="3">
              <v-select
                v-model="loc.mode"
                :items="modes"
                outlined
                item-text="name"
                item-key="value"
                label="Choose Mood"
                required
              ></v-select>
            </v-col>
            <!-- 3 -->
            <template v-if="loc.mode == 'redirect'">
              <v-col cols="12" md="3">
                <v-select
                  v-model="loc.status"
                  :items="statuses"
                  outlined
                  item-text="name"
                  item-key="value"
                  label="Choose Status"
                  required
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  v-model.trim="loc.tourl"
                  prepend-inner-icon="mdi-account-outline"
                  label="To Url"
                  type="text"
                  outlined
                />
              </v-col>
            </template>
            <!-- 4 -->
            <template v-if="loc.mode == 'proxy'">
              <v-col cols="12" md="3">
                <v-select
                  v-model="loc.upstream"
                  :items="upstreams"
                  outlined
                  item-text="name"
                  item-key="value"
                  label="Choose Upstream"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="loc.schema"
                  :items="schemas"
                  outlined
                  item-text="name"
                  item-key="value"
                  label="Choose Schema"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model.trim="loc.clientmbs"
                  hint="defualt is 1M, maximum is 5g."
                  outlined
                  min="1"
                  max="5000"
                  label="Client Max Body Size"
                  type="number"
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model.trim="loc.headerbt"
                  hint="defualt is 10 seconds."
                  outlined
                  min="10"
                  max="100"
                  label="Header Body Timeout"
                  type="number"
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="loc.profile"
                  :items="profiles"
                  outlined
                  item-text="name"
                  item-key="value"
                  label="Page Speed Profile"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-checkbox
                  v-model="loc.etag"
                  label="Etag"
                  required
                ></v-checkbox>
              </v-col>
              <!-- headers  -->
              <!-- {{ vh.loacationList.headers }} -->
              <!-- {{ loc.headers }} -->
              <v-row>
                <v-col
                  v-for="(custom, k) in loc.headers"
                  :key="k"
                  cols="12"
                  md="10"
                >
                  <v-row>
                    <v-col cols="12" md="1">
                      <p class="caption pl-3 pt-4">Headers {{ k + 1 }} :</p>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model.trim="custom.key"
                        outlined
                        label="Key"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model.trim="custom.val"
                        outlined
                        label="Value"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="green"
                    @click="addHeader(index)"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="red"
                    @click="removeHeader(index)"
                  >
                    <v-icon dark>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <!-- headers  -->
            </template>
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
      modes: [
        {
          name: 'Redirect',
          value: 'redirect'
        },
        {
          name: 'Proxy',
          value: 'proxy'
        }
      ],
      statuses: [
        {
          name: '301',
          value: '301'
        },
        {
          name: '302',
          value: '302'
        }
      ],
      profiles: ['profile1', 'profile2'],
      // request need
      certificateList: ['*.eghtesadnews.com', 'den.com', 'ilna.news'],
      upstreams: ['async', 'backup'],
      schemas: ['http', 'https'],
      snackbar: {
        show: false,
        message: null,
        timeout: 6000,
        color: null
      },
      valid: true,
      // name: '',
      vh: {
        protocol: '',
        certificate: '',
        redirect: true,
        port: '',
        keepreq: 100,
        keeptimeout: 60,
        requestpsize: 4,
        clientheadertimeoute: 5,
        clientheaderbuffersize: 1,
        lgbuffersize: 8,
        lgbuffernumber: 4,
        mergeslash: true,
        hostList: [],
        loacationList: [
          {
            path: '',
            mode: '',
            etag: true,
            headers: [{ key: '', val: '' }]
          }
        ]
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
    add() {
      console.log(this.vh.hostList);
      this.vh.hostList.push({ name });
    },
    addLocation() {
      this.vh.loacationList.push({
        path: '',
        mode: '',
        status: '',
        tourl: '',
        upstream: '',
        schema: '',
        clientmbs: '1',
        headerbt: '10',
        profile: '',
        etag: true,
        headers: []
      });
    },
    remove(index) {
      console.log(index);
      this.servers.splice(index, 1);
    },
    addHeader(index) {
      console.log(index);
      // console.log(typeof this.vh.loacationList[index].headers);
      this.vh.loacationList[index].headers.push({
        key: '',
        val: ''
      });
      // this.vh.loacationList.headers.push({
      //   key: '',
      //   val: ''
      // });
      // this.vh.loacationList.headers.push(this.customs);
    },
    removeHeader(index) {
      this.vh.loacationList[index].headers.splice(index, 1);
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
