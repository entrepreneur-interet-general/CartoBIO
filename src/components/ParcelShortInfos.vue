<i18n>
{
  "en": {
    "NUM_PARCEL": "Numéro Parcelle",
    "NUM_ILOT": "Numéro Ilôt",
    "CODE_CULTU": "Culture",
    "SURF_ADM": "Surface Admissible",
    "BIO": "Status Bio",
    "NOM": "Nom Exploitant",
    "ENGAGEMENT": "Date d'Engagement"
  }
}
</i18n>

<template>
  <v-card class="parcel-details-card" elevation-2>
    <v-container pa-0 ma-0>
      <v-layout column wrap max-width="100%">
        <v-card-title primary-title>
          Détails de la parcelle
          <v-btn flat icon @click="closeCard()" class="topright">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="prop-list">
          <v-list two-line>
            <v-list-tile v-for="(item, index) in parcelData.properties" v-bind:key="(item, index)">
              <v-list-tile-content v-if="index === 'CODE_CULTU'">
                <v-list-tile-title>{{$t(index)}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="item">{{item}} - {{$t(item)}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-content v-else>
                <v-list-tile-title>{{$t(index)}}</v-list-tile-title>
                <v-list-tile-sub-title>{{item}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn flat color="error">
            <v-icon size="18" class="action-icon" @click="closeCard()">delete_forever</v-icon>Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="edit(parcelData)">
            <v-icon size="18" class="action-icon">edit</v-icon>Edit
          </v-btn>
        </v-card-actions>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "ParcelShortInfos",
  props: {
    parcelData: Object,
    edit: Function
  },
  methods: {
    closeCard() {
      this.$emit("close-popup", { id: this.parcelData.id });
    }
  },
  mounted: function() {
    if (!this.parcelData.properties) {
      this.parcelData.properties = {
        NUM_PARCEL: "",
        NUM_ILOT: "",
        CODE_CULTU: "",
        SURF_ADM: "",
        BIO: "",
        NOM: "",
        ENGAGEMENT: ""
      };
      // Object.assign(this.parcelData.properties,);
    }
  }
};
</script>

<style lang="scss" scoped>
.topright {
  position: absolute;
  top: 0;
  right: 0;
}
.v-list {
  padding: 0;
}
.parcel-details-card {
  .v-card__title {
    padding-right: 30px;
  }
  .prop-list {
    max-height: 294px;
    overflow-y: auto;
  }
  .action-icon {
    margin-right: 10px;
  }
}
</style>
