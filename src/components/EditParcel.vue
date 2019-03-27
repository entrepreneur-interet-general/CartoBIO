<template>
  <v-layout column>
    <v-toolbar color="bioblue">
      <v-toolbar-title>Infos Parcelle</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-form ref="editForm">
          <v-select :items="bioStatus" v-model="bio" label="Status Bio" name="bioStatus"></v-select>
          <v-menu
            v-model="selectDate"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="engagementDate"
                label="Picker without buttons"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateFormatted" @input="selectDate = false" :max="maxDate"></v-date-picker>
          </v-menu>
          <v-btn primary @click="validate">Valider</v-btn>
        </v-form>
      </v-container>
    </v-content>
  </v-layout>
</template>
<script>
export default {
  name: "EditParcel",
  props: {
    parcelData: Object,
    drawer: Object
  },
  data: () => ({
    bioStatus: ["Bio", "C1", "C2", "C3", "Non Bio"],
    selectDate: false,
    maxDate: new Date().toISOString().substr(0, 10),
    dateFormatted: null,
    bio: null,
    engagementDate: null
  }),
  methods: {
    validate: function() {
      this.parcelData.properties.BIO = this.bio;
      this.parcelData.properties.ENGAGEMENT = this.engagementDate;
      this.drawer.open = false;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${year}/${month}/${day}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  mounted: function() {
    this.bio = this.parcelData.properties.BIO;
    this.engagementDate = this.parcelData.properties.ENGAGEMENT;
    this.dateFormatted = this.parseDate(this.engagementDate);
  },
  watch: {
    dateFormatted(val) {
      this.engagementDate = this.formatDate(val);
    }
  }
};
</script>
