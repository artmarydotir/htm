<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <p class="display-2 text-center justify-center pb-4">
            Http Trafic Manager
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="10" lg="8">
          <Login />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Login from '~/components/User/Login.vue';

export default {
  layout: 'login',
  components: {
    Login
  }
};
</script>
