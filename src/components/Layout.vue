<template>
  <v-app>
    <v-navigation-drawer absolute v-model="drawer.open" app>
      <LeftNavigation></LeftNavigation>
    </v-navigation-drawer>
    <Toolbar app :drawer="drawer"></Toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <!-- <v-footer app></v-footer> -->
  </v-app>
</template>

<script>
// @ is an alias to /src
import Toolbar from "@/views/Toolbar";
import LeftNavigation from "@/views/LeftNavigation";

export default {
  name: "App",
  components: {
    Toolbar,
    LeftNavigation
  },
  data: () => {
    return {
      drawer: {
        open: false
      }
    };
  }
};
</script>

<style lang="scss">
</style>
