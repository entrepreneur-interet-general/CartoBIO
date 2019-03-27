<template>
  <v-layout>
    <v-navigation-drawer right temporary v-model="editParcel.open" absolute v-if="editParcel.open">
      <EditParcel :parcelData="editParcelData" :drawer="editParcel"></EditParcel>
    </v-navigation-drawer>
    <div class="map">
      <vl-map
        :load-tiles-while-animating="true"
        :load-tiles-while-interacting="true"
        data-projection="EPSG:4326"
        @mounted="onMapMounted"
        ref="map"
      >
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

        <vl-geoloc @update:position="geolocPosition = $event">
          <template slot-scope="geoloc">
            <vl-feature v-if="geoloc.position" id="position-feature">
              <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
              <vl-style-box>
                <vl-style-icon
                  :src="require('@/assets/logo-cartobio.png')"
                  :scale="0.1"
                  :anchor="[0.5, 0.5]"
                ></vl-style-icon>
              </vl-style-box>
            </vl-feature>
          </template>
        </vl-geoloc>

        <vl-layer-tile id="ign">
          <vl-source-wmts
            url="https://wxs.ign.fr/choisirgeoportail/geoportail/wmts"
            layerName="ORTHOIMAGERY.ORTHOPHOTOS"
            styleName="normal"
            matrixSet="PM"
            opacity="0.5"
            attributions="IGN-F/Géoportail"
          ></vl-source-wmts>
        </vl-layer-tile>

        <vl-layer-group id="layer-group" :opacity="cadastreOpacity" :visible="visible">
          <!-- <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
          </vl-layer-tile>-->

          <vl-layer-tile id="ign-cadastre">
            <vl-source-wmts
              url="https://wxs.ign.fr/choisirgeoportail/geoportail/wmts"
              layerName="CADASTRALPARCELS.PARCELS"
              styleName="normal"
              format="image/png"
              matrixSet="PM"
              attributions="IGN-F/Géoportail"
            ></vl-source-wmts>
          </vl-layer-tile>
        </vl-layer-group>
        <vl-layer-vector id="imported-pane">
          <vl-source-vector ident="feature-target" :features.sync="importedFeatures"></vl-source-vector>
        </vl-layer-vector>
        <vl-layer-vector id="draw-pane">
          <vl-source-vector ident="draw-target" :features.sync="drawnFeatures"></vl-source-vector>
        </vl-layer-vector>

        <vl-interaction-modify v-if="allowEdition" source="draw-target"></vl-interaction-modify>

        <vl-interaction-draw v-if="interactionType === 'Draw'" source="draw-target" type="Polygon"></vl-interaction-draw>

        <vl-interaction-select
          v-if="interactionType == null"
          :features.sync="selectedFeatures"
          @select="displayPopup = true"
          @unselect="closePopup"
          @click="selectParcel"
        >
          <template slot-scope="select">
            <!-- select styles -->
            <vl-style-box>
              <vl-style-fill :color="[254, 178, 76, 0.7]"></vl-style-fill>
            </vl-style-box>
            <vl-style-box :z-index="1">
              <vl-style-stroke color="#d43f45" :width="2"></vl-style-stroke>
            </vl-style-box>
            <!--// select styles -->
            <vl-overlay
              class="feature-popup"
              v-for="parcel in select.features"
              :key="parcel.id"
              :id="parcel.id"
              :position="pointOnSurface(parcel.geometry)"
              positioning="bottom-center"
              :offset="[0, -10]"
              :auto-pan="true"
              :auto-pan-animation="{ duration: 300 }"
            >
              <ParcelShortInfos
                @close-popup="closePopup"
                :parcelData="parcel"
                v-if="displayPopup"
                :edit="openEditParcelDrawer"
              ></ParcelShortInfos>
            </vl-overlay>
          </template>
        </vl-interaction-select>
        <!-- Should be in its own vue component -->
        <v-card class="map-controls">
          <v-card-title>
            Map controls
            <v-spacer></v-spacer>
            <v-btn flat icon @click="showControls = !showControls" class="topright">
              <v-icon>{{ showControls ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-title>

          <v-slide-y-transition>
            <v-card-text v-show="showControls">
              <v-list two-line>
                <v-subheader>Layers</v-subheader>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="'Cadastre'"></v-list-tile-title>
                    <v-list-tile-sub-title>
                      <v-slider
                        v-model="cadastreOpacity"
                        :prepend-icon="cadastreOpacity ? 'visibility' : 'visibility_off'"
                        min="0"
                        step="0"
                        max="1"
                        @click:prepend="disableCadastral"
                      ></v-slider>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-subheader>Drawing tools</v-subheader>
                <v-list-tile>
                  <v-btn primary @click="startDraw" v-if="interactionType !=='Draw'">DRAW</v-btn>
                  <v-btn primary @click="stopInteraction" v-if="interactionType !== null">STOP</v-btn>
                </v-list-tile>
                <v-list-tile>
                  <v-switch v-model="allowEdition" :label="`Edit drawn parcels`"></v-switch>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </vl-map>
    </div>
  </v-layout>
</template>

<script>
import { findPointOnSurface } from "vuelayers/lib/ol-ext";
import { uuid } from "vue-uuid";
import ScaleLine from "ol/control/ScaleLine";

import ParcelShortInfos from "@/components/ParcelShortInfos";
import EditParcel from "@/components/EditParcel";

export default {
  name: "Map",
  components: {
    ParcelShortInfos,
    EditParcel
  },
  props: {
    parcels: Array
  },
  data: () => {
    return {
      zoom: 13,
      center: [6.473744, 43.917167],
      rotation: 0,
      geolocPosition: undefined,
      interactionType: null,
      allowEdition: true,
      displayPopup: undefined,
      drawnFeatures: [],
      selectedFeatures: [],
      importedFeatures: [],
      showControls: false,
      cadastreOpacity: 0.3,
      cadastreOpacityMem: 0,
      visible: true,
      editParcel: {
        open: false
      },
      editParcelData: {}
    };
  },
  methods: {
    startDraw() {
      this.interactionType = "Draw";
    },
    stopInteraction() {
      this.interactionType = null;
    },
    toggleEdition() {
      this.allowEdition = !this.allowEdition;
    },
    pointOnSurface: findPointOnSurface,
    // selectParcel() {
    //   console.log(this);
    // },
    closePopup(id) {
      this.displayPopup = false;
      this.selectedFeatures = [];
    },
    disableCadastral() {
      var tmp = handleLayerOpacity(
        this.cadastreOpacity,
        this.cadastreOpacityMem
      );
      this.cadastreOpacity = tmp[0];
      this.cadastreOpacityMem = tmp[1];
    },
    openEditParcelDrawer(parcelData) {
      this.editParcelData = parcelData;
      this.editParcel.open = true;
    },
    // deleteParcel(parcelId) {
    //   let indexParcelToDelete = this.drawnFeatures.find(parcel => {
    //     return parcelId === parcel.id;
    //   });

    //   console.log(this.$refs.map);
    //   this.$refs.map.removeFeature(parcelId);
    //   // console.log(indexParcelToDelete);
    //   // console.log(this.drawnFeatures);

    //   // this.drawnFeatures.splice(indexParcelToDelete, 1);
    //   // console.log(this.drawnFeatures);
    //   // console.log(this.$refs.map);
    // },
    onMapMounted: function() {
      this.$refs.map.$map.getControls().extend([new ScaleLine()]);
    }
  },
  mounted: function() {
    // maybe unnecessary: PostGIS should add an id by itself. Demo purpose.
    this.parcels.forEach(function(feat) {
      feat.id = feat.id ? feat.id : uuid.v1();
    });
    this.importedFeatures = this.parcels;
  }
};

/**
 *
 */
let handleLayerOpacity = (opacity, opacityMem) => {
  opacityMem && opacity === 0
    ? (opacity = opacityMem) && (opacityMem = 0)
    : (opacityMem = opacity) && (opacity = 0);
  return [opacity, opacityMem];
};
</script>

<style lang="scss" scoped>
.map {
  position: absolute;
  width: 100%;
  height: 100%;

  .map-controls {
    position: fixed;
    z-index: 1;
    right: 20px;
    margin-top: 20px;
    min-height: 48px;
    padding-right: 36px;

    .v-card__title {
      padding: 13px;
    }
    .v-card__text {
      padding-top: 0;
      padding-bottom: 0;
    }
    .topright {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>


