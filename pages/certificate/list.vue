<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <certificateList
        :datalist="datalist"
        :headers="headers"
        :items-per-page="5"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import certificateList from '@/components/certificate/certificateList.vue';
export default {
  components: {
    certificateList
  },
  computed: {
    headers() {
      return [
        {
          text: 'Common Name',
          width: '15%',
          sortable: false,
          value: 'subject.common_name',
          filter: this.cnameFilter
        },
        {
          width: '9%',
          text: 'Name',
          sortable: false,
          value: 'name'
        },
        {
          width: '10%',
          text: 'Organization',
          sortable: false,
          value: 'issuer.organization'
        },
        {
          width: '10%',
          text: 'sigalg',
          sortable: false,
          value: 'sigalg'
        },
        {
          width: '25%',
          text: 'Sans',
          sortable: false,
          value: 'sans'
        },
        {
          width: '10%',
          text: 'Start Date',
          value: 'not_before',
          sortable: true
        },
        {
          width: '10%',
          text: 'End Date',
          value: 'not_after',
          sortable: true
        },
        {
          text: 'Action',
          align: 'center',
          width: '10%',
          value: 'action',
          sortable: false
        }
      ];
    }
  }
};
</script>
