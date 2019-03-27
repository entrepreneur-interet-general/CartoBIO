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

/* html tag have an overflow-y: scroll (vuetify design choice) */
html {
  overflow-y: auto;
}

/* Scrollbar Style */
::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}
::-webkit-scrollbar-track {
  background: none;
}
::-webkit-scrollbar-thumb {
  background: #a5a8b3;
}
</style>
