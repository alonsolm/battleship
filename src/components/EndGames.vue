<template>
  <div class="content-end-games">
    <div class="end-games">
      <h1>Battle History</h1>
      <p>Total Games - {{ endGames }}</p>
      <router-link to="/configuration">Go back to settings</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "EndGames",
  data() {
    return {
      endGames: "",
    };
  },
  mounted() {
    if (localStorage.endGames) this.endGames = localStorage.endGames;
  },
};
</script>

<style lang="scss">
.content-end-games {
  background: #000 url("../assets/images/endGames.jpg");
  background-size: cover;
  height: 100vh;
  display: grid;
  place-content: center;
  h1 {
    margin-top: 0;
    font-size: 6em;
  }

  p {
    font-size: 3em;
    margin-bottom: 0.5em;
  }

  a {
    padding: 1.8em 1em;
    color: black;
    font-size: 1.2em;
    border: 3px solid black;
    background-color: rgb(230, 226, 226);;
  }
}
</style>