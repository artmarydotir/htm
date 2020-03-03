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
        <!-- 3 -->
        <v-list-group
          v-for="item in upstream"
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
        <!-- 4 -->
        <v-list-group
          v-for="item in vh"
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
      <template v-slot:append>
        <div class="ma-1">
          <v-btn color="blue darken-4" block to="/">
            Logout
          </v-btn>
        </div>
      </template>
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
            link: '/certificate/form/'
          },
          {
            title: 'List Certificate',
            link: '/certificate/list/'
          }
        ]
      }
    ],
    upstream: [
      {
        icon: 'mdi-server-security',
        title: 'Upstream Managment',
        active: true,
        children: [
          {
            title: 'Add Upstream',
            link: '/upstream/form/'
          },
          {
            title: 'List Upstream',
            link: '/upstream/list/'
          }
        ]
      }
    ],
    vh: [
      {
        icon: 'mdi-server-network',
        title: 'VH Managment',
        active: true,
        children: [
          {
            title: 'Add virtual Host',
            link: '/vh/form/'
          },
          {
            title: 'List Vitual Host',
            link: '/vh/list/'
          }
        ]
      }
    ]
  })
};
</script>
<style scoped>
.v-navigation-drawer__content,
.v-navigation-drawer .v-list {
  background-color: #131415ef !important;
  height: 100%;
}
.v-navigation-drawer__append {
  background-color: #131415ef !important;
}
.theme--dark.v-navigation-drawer {
  background-color: #131415ef !important;
}
</style>
