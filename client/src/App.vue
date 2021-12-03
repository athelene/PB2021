<template>
  <v-app class="appBackground">
    <Nav />
    <v-main  class="appBackground" >
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Nav from "@/components/Nav";

export default {
  name: "App",
  components: { Nav },

  data: () => ({
    //
  }),
};
</script>

<style scoped>

.appBackground {
  background: url(./assets/pickleball.jpg) center center fixed; 
  background-size:100% 100%;
}
</style>
