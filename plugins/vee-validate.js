import '@/plugins/validators';
import { required, email, min } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', {
  ...required,
  message: '{_field_} is required.'
});

extend('min', {
  ...min,
  message: 'This field must be {length} characters or more'
});

extend('email', {
  ...email,
  message: 'This field must be a valid email'
});
