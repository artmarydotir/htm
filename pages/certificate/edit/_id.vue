<template>
  <div>
    <v-alert color="pink">
      {{ id }}
    </v-alert>
    <certificateForm
      :fill-cert="fill"
      :button-text="'Update'"
      :cancel-action="'Clear'"
    />
    {{ selected }} ----
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
      id: '',
      fill: {
        title: 'dd',
        name: 'dd'
      }
    };
  },
  computed: {
    ...mapGetters({
      selected: 'certificate/getCert'
    })
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetchCertificate();
  },
  methods: {
    fetchCertificate() {
      this.$store.dispatch('certificate/showCert', this.id);
    }
  }
};
</script>
<style lang="scss" scoped></style>
