<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      temporary
      absolute
      width="300px"
      src="/sidebar-1.jpg"
    >
      <v-list nav dense>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="/aasaam.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Welcome</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in admins" :key="item.title" class="mt-3" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- 2 -->
        <v-list-group
          v-for="item in certis"
          :key="item.title"
          v-model="item.active"
          no-action
          value="true"
          :prepend-icon="item.icon"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subItem in item.children"
            :key="subItem.title"
            class="py-2"
            :to="subItem.link"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="ml-0 pl-4">
        <span class="hidden-sm-and-down">
          HTM
        </span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container :fluid="$vuetify.breakpoint.mdAndUp ? false : true">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    admins: [
      {
        icon: 'mdi-contacts',
        title: 'Contacts',
        link: '/addTag'
      },
      {
        icon: 'mdi-history',
        title: 'Duplicates',
        link: '/listTag'
      }
    ],
    certis: [
      {
        icon: 'mdi-toolbox-outline',
        title: 'Certificate Managment',
        active: true,
        children: [
          {
            title: 'Add Certificate',
            link: '/service/add'
          },
          {
            title: 'List Certificate',
            link: '/certificate/list/'
          }
        ]
      }
    ]
  })
};
</script>
<style scoped>
.v-navigation-drawer__content,
.v-list {
  background-color: #131415ef !important;
  height: 100%;
  /* background: #131415c7 !important; */
}
.theme--dark.v-navigation-drawer {
  background-color: #131415ef !important;
}
</style>
