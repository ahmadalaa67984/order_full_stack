<template>
  <v-container>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="selectedDate"
              :label="label"
              readonly
              v-bind="props"
              @click="dialog = true"
              class="w-20"
              variant="outlined"
            ></v-text-field>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">Pick a date</span>
            </v-card-title>
            <v-card-text>
              <v-date-picker
                v-model="selectedDate"
                @change="closeDialog"
              ></v-date-picker>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="closeDialog">Cancel</v-btn>
              <v-btn color="primary" @click="confirmDate">Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  label: String,
  handleSelectedDate: Function,
});

const selectedDate = ref(props.selectedDate);
const dialog = ref(false);

// Method to close the dialog
const closeDialog = () => {
  dialog.value = false;
};

// Method to confirm the date selection
const confirmDate = () => {
  props.handleSelectedDate(selectedDate.value);
  dialog.value = false;
  // You can process the selectedDate as needed
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
