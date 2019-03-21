<template>
  <div d-flex="column">
    <v-toolbar elevation0>
      <v-spacer></v-spacer>
      <img alt="Agence Bio logo" :src="require('@/assets/agence-bio.png')" class="logo center">
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title">
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>
<script>
export default {
  name: "LeftNavigation",
  data: () => {
    return {
      items: [
        {
          title: "Nav Item 1"
        },
        {
          title: "Nav Item 2"
        },
        {
          title: "Nav Item 3"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.logo {
  height: 60px;
}
.center {
  align-self: center;
}
</style>

