<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <upstreamList />
    </v-col>
  </v-row>
</template>

<script>
import upstreamList from '@/components/upstream/upstreamList.vue';

export default {
  components: {
    upstreamList
  }
};
</script>
