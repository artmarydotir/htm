<template>
  <div>
    <!-- <v-alert color="pink">
      {{ id }}
    </v-alert> -->
    <certificateForm
      :ceretificate="fillCert"
      :button-text="'Update'"
      :cancel-action="'Clear'"
      :edit-cert="editMe"
    />
    <v-alert color="red"> state : {{ fillCert }} </v-alert>
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
      // fill: {
      //   title: 'dd',
      //   name: this.$store.state.certificate.getOneCert
      // }
    };
  },
  computed: {
    ...mapGetters({
      fillCert: 'certificate/getCert'
    })
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetchCertificate();
  },
  methods: {
    fetchCertificate() {
      this.$store.dispatch('certificate/showCert', this.id);
    },
    editMe() {
      console.log('formpage', this.fillCert);
      this.$store.dispatch('certificate/addTodo', this.fillCert);
      setTimeout(() => this.$router.push({ path: '/certificate/list/' }), 6000);
    }
  }
};
</script>
<style lang="scss" scoped></style>
