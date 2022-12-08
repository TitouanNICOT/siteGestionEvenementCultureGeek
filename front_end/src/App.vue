<template>
  <v-app>
    <AccueilView></AccueilView>
  </v-app>
</template>

<script>

import AccueilView from "@/views/AccueilView";
export default {
  name: 'App',
    components: {AccueilView},
    data: () => ({
    //
  }),
};
</script>
