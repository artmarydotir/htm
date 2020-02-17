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
    <template v-slot:item.sans="{ item }">
      <v-chip-group mandatory column>
        <v-chip v-for="i in item.sans" :key="i" small class="teal text--white">
          {{ i }}
        </v-chip>
      </v-chip-group>
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
      common_name: '',
      dataList: tableData.data
    };
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
          width: '10%',
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
  },
  methods: {
    /**
     * Filter for dessert names column.
     * @param value Value to be tested.
     * @returns {boolean}
     */
    cnameFilter(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.common_name) {
        return true;
      }
      // Check if the current loop value (The dessert name)
      // partially contains the searched word.
      return value.toLowerCase().includes(this.common_name.toLowerCase());
    }
  }
};
</script>
