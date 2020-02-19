<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col>
          <Breadcrumb :breadcrumbs="breadcrumbs" />
        </v-col>
        <v-col cols="12">
          <p class="display-2 text-center justify-center pb-4">
            Dashboard
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Breadcrumb from '@/components/global/breadcrumb.vue';
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {};
  },
  computed: {
    breadcrumbs() {
      return [
        {
          name: 'Home',
          link: '/'
        },
        {
          name: 'Dashboard'
        }
      ];
    }
  }
};
</script>
