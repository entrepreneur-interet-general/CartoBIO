<template>
  <v-toolbar app color="biogreen">
    <v-toolbar-side-icon @click.stop="closeDrawer(drawer)"></v-toolbar-side-icon>
    <v-toolbar-title>CartoBIO</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>
        <v-avatar>
          <v-icon>account_circle</v-icon>
        </v-avatar>Connexion
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
export default {
  name: "Toolbar",
  props: {
    drawer: Object
  },
  methods: {
    closeDrawer: drawer => {
      drawer.open = !drawer.open;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
