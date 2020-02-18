<template>
  <certificateForm />
</template>
<script>
import { required } from 'vuelidate/lib/validators';
import certificateForm from '@/components/certificate/certificateForm.vue';

export default {
  name: 'AddGroup',
  components: {
    certificateForm
  },
  data() {
    return {
      valid: true,
      ceretificate: {
        fullchain: null,
        key: null,
        name: '',
        cert: null,
        chain: null
      }
    };
  },
  validations: {
    ceretificate: {
      name: { required },
      fullchain: { required },
      key: { required },
      cert: { required },
      chain: { required }
    }
  }
};
</script>
<style lang="scss" scoped></style>
