<template>
  <div>
    <certificateForm
      :ceretificate="fill"
      :button-text="'add'"
      :cancel-action="'cancel'"
      :add-cert="saveMe"
    />
    {{ fill }}
  </div>
</template>
<script>
// import { mapActions } from 'vuex';
import certificateForm from '@/components/certificate/certificateForm.vue';

export default {
  name: 'AddCertificate',
  components: {
    certificateForm
  },
  data() {
    return {
      fill: {}
    };
  },
  methods: {
    saveMe() {
      console.log('formpage', this.fill);
      // const video = await this.$store.dispatch('videos/edit', newVideo);
      this.$store.dispatch('certificate/addTodo', this.fill);
      setTimeout(() => this.$router.push({ path: '/certificate/list/' }), 6000);
    }
  }
};
</script>
<style lang="scss" scoped></style>
