<template>
  <v-app dark class="body_bg bodybg">
    <nuxt />
    <v-footer padless class="bgtra">
      <v-col class="text-center right" cols="12">
        Powered by aasaam
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.bgtra {
  background-color: #21173bb0;
}
.bodybg {
  background-color: #23243d !important;
}
.body_bg {
  background-image: url('/bg/bg1.png');
  background-repeat: no-repeat;
  background-position: top left;
  // background-image: linear-gradient(#111116, #272a66);
}
</style>
