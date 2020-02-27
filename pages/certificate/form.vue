<template>
  <certificateForm :button-text="'add'" :cancel-action="'clear'" />
</template>
<script>
import certificateForm from '@/components/certificate/certificateForm.vue';

export default {
  name: 'AddCertificate',
  components: {
    certificateForm
  }
};
</script>
<style lang="scss" scoped></style>
