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
          Upstream List
        </v-toolbar-title>
      </v-toolbar>
      <v-row class="pa-4">
        <v-col cols="12" md="2">
          <!-- Filter for type name-->
          <v-text-field
            v-model="name"
            class="mr-6"
            type="text"
            label="Upstream Name"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </template>
    <template v-slot:item.servers="{ item }">
      <v-chip-group mandatory column>
        <v-chip
          v-for="i in item.servers"
          :key="i.name"
          small
          class="teal text--white"
        >
          {{ i.name }} - {{ i.ip }}
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

import tableData from '@/api/upstream/list.json';

export default {
  data() {
    return {
      name: '',
      dataList: tableData.data
    };
  },
  computed: {
    headers() {
      return [
        {
          text: 'Upstram Name',
          sortable: true,
          value: 'name',
          filter: this.nameFilter
        },
        {
          text: 'Server List',
          sortable: false,
          value: 'servers'
        },
        {
          text: 'Action',
          align: 'center',
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
    nameFilter(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.name) {
        return true;
      }
      // Check if the current loop value (The dessert name)
      // partially contains the searched word.
      return value.toLowerCase().includes(this.name.toLowerCase());
    }
  }
};
</script>
