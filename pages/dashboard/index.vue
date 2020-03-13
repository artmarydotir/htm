<template>
  <v-content class="pa-2">
    <v-container class="fill-height" fluid>
      <Breadcrumb :breadcrumbs="breadcrumbs" />
      <v-row align="center" justify="center">
        <v-col v-for="sale in sales" :key="`${sale.title}`" cols="12" md="4">
          <salesGraph :sale="sale" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import salesData from '@/api/sales.json';
import Breadcrumb from '@/components/global/breadcrumb.vue';
import salesGraph from '@/components/graph/salesGraph.vue';

export default {
  components: {
    Breadcrumb,
    salesGraph
  },
  data() {
    return {
      sales: salesData
    };
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
