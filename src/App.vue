<template>
  <v-app>
    <Layout></Layout>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Layout from "@/components/Layout";

export default {
  name: "App",
  components: {
    Layout
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

// html tag have an overflow-y: scroll
html {
  overflow-y: auto;
}
</style>
