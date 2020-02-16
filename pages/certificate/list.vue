<template>
  <v-content>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <certificateList />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import certificateList from '@/components/certificate/certificateList.vue';

export default {
  components: {
    certificateList
  }
};
</script>
