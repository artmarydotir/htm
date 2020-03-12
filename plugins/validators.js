import { extend } from 'vee-validate';

// ================= URL =================>
extend('validUrl', (value) => {
  if (value) {
    try {
      const u = new URL(value);
      return u.protocol.match(/^http.*/);
    } catch (e) {
      return 'Url is not valid.';
    }
  }
  // return 'Url is not valid.';
});

// ============= HASH TOKEN ==============>

// export function isHost(value) {
//   if (!value) return true;
//   if (
//     /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/.test(
//       value
//     )
//   ) {
//     return true;
//   }
//   return false;
// }

// export function notGmail(value = '') {
//   return !value.includes('gmail');
// }

// export function isEmailAvailable(value) {
//   if (value === '') return true;

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(value.length > 10);
//     }, 500);
//   });
// }
