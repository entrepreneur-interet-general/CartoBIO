<template>
  <v-card class="parcel-details-card" elevation-2>
    <v-card-title>
      Feature ID {{ parcelData.id }}
      <v-btn flat icon @click="closeCard()" class="topright">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-list two-line>
        <v-list-tile v-for="(item, index) in parcelData.properties" v-bind:key="(item, index)">
          <v-list-tile-content>
            <v-list-tile-title>{{index}}</v-list-tile-title>
            <v-list-tile-sub-title>{{item}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn flat color="error" @click="deleteParcel(parcelData.id)">
        <v-icon size="18" class="action-icon">delete_forever</v-icon>Delete
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="editParcel(parcelData.id)">
        <v-icon size="18" class="action-icon">edit</v-icon>Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ParcelShortInfos",
  props: {
    parcelData: Object
  },
  methods: {
    closeCard() {
      this.$emit("close-popup", { id: this.parcelData.id });
    },
    deleteParcel: parcelId => {
      alert(parcelId + " deleted");
    },
    editParcel: parcelId => {
      alert("editing parcel " + parcelId + " ... ");
    }
  },
  mounted: function() {
    console.log(this.parcelData);
  }
};
</script>

<style lang="scss" scoped>
.topright {
  position: absolute;
  top: 0;
  right: 0;
}
.parcel-details-card {
  width: 80%;
  max-width: 600px;
  height: 80%;
  max-height: 400px;

  .v-card__title {
    padding-right: 30px;
  }
  .v-card__text {
    height: calc(80% - 80px);
    max-height: 320px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .action-icon {
    margin-right: 10px;
  }
}
</style>
