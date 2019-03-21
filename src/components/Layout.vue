<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer.open" app>
      <LeftNavigation></LeftNavigation>
    </v-navigation-drawer>
    <Toolbar app :drawer="drawer"></Toolbar>
    <v-content>
      <Map></Map>
    </v-content>
    <!-- <v-footer app></v-footer> -->
  </v-app>
</template>

<script>
// @ is an alias to /src
import Toolbar from "@/views/Toolbar";
import LeftNavigation from "@/views/LeftNavigation";
import Map from "@/views/Map";

export default {
  name: "App",
  components: {
    Toolbar,
    LeftNavigation,
    Map
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
