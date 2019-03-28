<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-toolbar color="bioblue" dark>
        <v-toolbar-title>Sélectionner un agriculteur</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card color="lightgrey">
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex v-for="operator in operators" :key="operator.id">
              <v-card :to="'/carte/' + operator.name">
                <v-card-title v-html="operator.name"></v-card-title>
                <v-card-text>
                  <v-subheader>{{operator.nbParcels}} parcelles</v-subheader>
                  <v-subheader>Région {{operator.region}}</v-subheader>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Home",
  data: () => {
    return {
      operators: [
        {
          id: "1",
          name: "Albert",
          nbParcels: "7",
          region: "PACA"
        },
        {
          id: "2",
          name: "Catherine",
          nbParcels: "24",
          region: "PACA"
        },
        {
          id: "3",
          name: "Bernard",
          nbParcels: "14",
          region: "PACA"
        }
      ]
    };
  }
};
</script>
