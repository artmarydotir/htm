<template>
  <v-card class="my-8">
    <v-card-title class="grey darken-3">
      Add Certificate
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="name"
              prepend-inner-icon="mdi-account-outline"
              label="Name"
              type="text"
              outlined
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-file-input
              v-model="fullchain"
              outlined
              chips
              counter
              required
              label="Full chain"
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="2">
            <v-file-input
              v-model="chain"
              outlined
              chips
              counter
              label="Chain"
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="2">
            <v-file-input
              v-model="key"
              outlined
              chips
              counter
              label="Private key/private"
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="2">
            <v-file-input
              v-model="cert"
              outlined
              chips
              counter
              label="cert"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="mx-auto text-center justify-center">
      <v-spacer></v-spacer>
      <v-btn color="pink white--text" class="ma-3">
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'AddGroup',
  data() {
    return {
      fullchain: null,
      key: null,
      name: '',
      cert: null,
      chain: null
    };
  }
};
</script>
<style lang="scss" scoped></style>
