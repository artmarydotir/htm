<template>
  <v-data-table
    fixed-header
    :headers="headers"
    :items="datalist"
    :items-per-page="itemsPerPage || 10"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>
          Virtual Host List
        </v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:item.server_name="{ item }">
      <v-chip-group mandatory column>
        <v-chip
          v-for="i in item.server_name"
          :key="i"
          small
          class="teal text--white"
        >
          {{ i }}
        </v-chip>
      </v-chip-group>
    </template>
    <template v-slot:item.action="{ item }">
      <nuxt-link :to="`/vh/edit/${item.id}`" link>
        <v-icon text class="success--text">
          mdi-pencil
        </v-icon>
      </nuxt-link>
      <v-icon text class="pink--text ml-3 " @click="deleteVh(item)">
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

export default {
  props: {
    itemsPerPage: {
      type: Number,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    datalist: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteCert(id) {}
  }
};
</script>
