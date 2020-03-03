<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <virtualList
        :datalist="datalist"
        :headers="headers"
        :items-per-page="5"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import virtualList from '@/components/vh/vhList.vue';
export default {
  components: {
    virtualList
  },
  computed: {
    ...mapState({
      datalist: (state) => state.vh.vh
    }),
    // datalist() {
    //   console.log(this.$store.state.listpost);
    //   return this.$store.state.listpost;
    // },
    headers() {
      return [
        {
          text: 'Server Name',
          sortable: false,
          value: 'server_name'
        },
        {
          text: 'Protocol',
          sortable: false,
          value: 'protocol'
        },
        {
          text: 'Location',
          sortable: false,
          value: 'location_count'
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
  },

  created() {
    this.$store.dispatch('vh/fetchVirtuals');
  }
};
</script>
