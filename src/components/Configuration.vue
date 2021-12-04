<template>
  <div class="configuration">
    <div class="container">
      <h1>BattleShip</h1>
      <p>Select level or type turns</p>
      <div class="content">
        <ul>
          <li><span @click="turns = 999">Level 1</span></li>
          <li><span @click="turns = 100">Level 2</span></li>
          <li><span @click="turns = 50">Level 3</span></li>
        </ul>
        <input
          v-validate="'numeric'"
          name="turns"
          type="text"
          v-model="turns"
          placeholder="turns"
        />
        <span class="error">{{ errors.first("turns") }}</span>
        <router-link :to="{ name: 'board', params: { turns: turns } }"
          >Play</router-link
        >
        <router-link to="/end-games">History</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Configuration",
  data() {
    return {
      turns: undefined,
    };
  },
};
</script>

<style lang="scss">
.configuration {
  background: url("../assets/images/configuration.jpg");
  background-size: cover;
  background-position: 25em;
  color: black;
  overflow-x: hidden;
}
.container {
  box-sizing: border-box;
  padding: 3em 4em;
  background: rgb(230, 226, 226);
  height: 100vh;
  width: 30%;
  position: relative;
}
h1 {
  font-size: 4em;
  margin-bottom: 0;
  line-height: 1em;
  position: relative;
  z-index: 0;
}
p {
  font-size: 1.5em;
}
h1:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: -20%;
  height: 25px;
  width: 40%;
  background: #4aa4df;
  z-index: -1;
}
.content {
  margin-top: 2em;
  font-size: 1.5em;
  line-height: 1.3em;
  position: relative;
  z-index: 0;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    margin-top: 1em;
    li {
      margin-right: 0.1em;
      span {
        cursor: pointer;
        color: black;
        font-weight: bold;
        padding: 0.1em 0.4em;
        background-color: #8ce6e6;
        border-radius: 1em;
      }
    }
  }
  input {
    margin-top: 2em;
    width: 60%;
    padding: 1em;
    border-radius: 0.2em;
    border: 1px solid #acacac;
    color: #1b1820;
  }
  input:focus {
    outline: 3px solid #acacac;
  }
  .error {
    display: block;
    font-size: 0.5em;
    color: red;
  }
}
a {
  text-decoration: none;
  color: #4aa4df;
  display: block;
  text-align: center;
  padding: 0.8em 1em;
  border: 1px solid #4aa4df;
  border-radius: 0.5em;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.85rem;
  margin-top: 2em;
}
</style>
