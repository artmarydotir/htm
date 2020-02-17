<template>
  <v-data-table
    fixed-header
    :headers="headers"
    :items="dataList"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>
          Certificate List
        </v-toolbar-title>
      </v-toolbar>
      <v-row class="pa-4">
        <v-col cols="12" md="2">
          <!-- Filter for type name-->
          <v-text-field
            v-model="common_name"
            class="mr-6"
            type="text"
            label="Common Name"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </template>
    <template v-slot:item.calories="{ item }">
      <v-chip small class="pink white--text">
        {{ item.calories }}
      </v-chip>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon text class="success--text" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon text class="pink--text ml-3 " @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-results>
      No Results Found
    </template>
    <template v-slot:no-data>
      No Results Found
    </template>
  </v-data-table>
</template>
<style lang="scss" scoped></style>
<script>
// Table info.

import tableData from '@/api/certificate/list.json';

export default {
  data() {
    return {
      // Filter models.
      host_name: '',
      common_name: '',
      organization: '',
      typeFilterValue: null,
      parentFilterValue: null,
      statusFilterValue: null,
      // Table data.
      dataList: tableData.data
    };
  },
  computed: {
    headers() {
      return [
        {
          // align: 'center',
          text: 'Common Name',
          // width: '20%',
          sortable: false,
          value: 'subject.common_name',
          filter: this.nameFilter
        },
        {
          text: 'Name',
          sortable: false,
          value: 'name',
          filter: this.nameFilter
        },
        {
          text: 'Organization',
          sortable: false,
          value: 'issuer.organization',
          filter: this.servicesFilter
        },
        {
          text: 'sigalg',
          sortable: false,
          value: 'sigalg'
        },
        {
          text: 'Sans',
          sortable: false,
          value: 'sans'
        },
        {
          text: 'Start Date',
          value: 'not_before',
          sortable: true,
          filter: this.parentFilter
        },
        {
          text: 'End Date',
          value: 'not_after',
          sortable: true,
          filter: this.parentFilter
        },
        { text: 'Action', value: 'action', sortable: false }
      ];
    }
  },
  methods: {
    /**
     * Filter for dessert names column.
     * @param value Value to be tested.
     * @returns {boolean}
     */
    nameFilter(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.dessertFilterValue) {
        return true;
      }
      // Check if the current loop value (The dessert name)
      // partially contains the searched word.
      return value
        .toLowerCase()
        .includes(this.dessertFilterValue.toLowerCase());
    }
  }
};
</script>
