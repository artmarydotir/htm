<template>
  <div>
    <v-alert color="pink">
      {{ id }}
    </v-alert>
    <certificateForm :button-text="'Update'" :cancel-action="'Clear'" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import certificateForm from '@/components/certificate/certificateForm.vue';

export default {
  name: 'AddCertificate',
  components: {
    certificateForm
  },
  data() {
    return {
      id: ''
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetchCertificate(this.id);
  },
  methods: {
    fetchCertificate() {
      ...mapGetters
    }
  }
};
</script>
<style lang="scss" scoped></style>
