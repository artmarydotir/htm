<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">
          {{ mainBtn }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{ mainHeader }}
        </v-card-title>

        <v-card-text>
          {{ mainBody }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',
  props: {
    mainBtn: {
      type: String,
      required: true
    },
    mainBody: {
      type: String,
      required: true
    },
    mainHeader: {
      type: String,
      required: true
    }
  }
};
</script>
