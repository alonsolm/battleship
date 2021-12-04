<template>
  <div class="content-board">
    <div class="board">
      <div class="turns-restart" v-if="show && !youWin">
        <p class="game-turns">Turns: {{ gameTurns }}</p>
        <router-link to="/configuration">Restart</router-link>
      </div>
      <div v-if="!gameOver && !youWin" class="grid-board">
        <Square
          v-for="(coordinate, index) in coordinatesList"
          :key="index"
          v-bind:coordinates="coordinate"
          @squareHandleChange="squareHandleChange($event)"
          v-bind:shot="shotInformation"
        />
      </div>
      <p class="hits" v-if="!youWin">Hits: {{ hitCount }}</p>
      <div v-if="gameOver" class="game-over">
        <p>Game Over</p>
        <router-link to="/configuration">Try again</router-link>
      </div>
      <div v-if="youWin" class="you-win">
        <p>YOU WIN!</p>
        <router-link to="/configuration">Play again</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Square from "./Square.vue";
export default {
  name: "Board",
  props: {
    turns: { type: [Number, String], required: true },
  },
  components: {
    Square,
  },
  data() {
    return {
      show: true,
      youWin: false,
      endGames: 0,
      gameOver: false,
      gameTurns: this.$route.params.turns,
      shotInformation: {},
      hitCount: 0,
      coordinatesList: [],
      gameBoard: [
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    };
  },
  mounted() {
    if (parseInt(localStorage.endGames))
      this.endGames = parseInt(localStorage.endGames);
    this.fillCoordinates();
  },
  methods: {
    watchGame() {
      this.gameTurns--;
      if (this.gameTurns == 0) {
        this.gameOver = true;
        localStorage.endGames = this.endGames + 1;
      }
    },
    fillCoordinates: function () {
      let alpha = Array.from(Array(10)).map((e, i) => i + 65);
      let alphabet = alpha.map((x) => String.fromCharCode(x));

      for (const letter of alphabet) {
        for (let i = 1; i <= 10; i++) {
          let coordinate = {
            x: letter,
            y: i,
          };
          this.coordinatesList.push(coordinate);
        }
      }
    },
    squareHandleChange(coordinates) {
      let row = parseInt(coordinates.x, 36) - 9 - 1;
      let col = coordinates.y - 1;
      if (this.gameBoard[row][col] == 0) {
        this.gameBoard[row][col] = 3;
        let shotCoordinatesStatus = {
          coordinates: {
            x: coordinates.x,
            y: coordinates.y,
          },
          status: this.gameBoard[row][col],
        };
        this.shotInformation = shotCoordinatesStatus;
        this.watchGame();
      } else if (this.gameBoard[row][col] == 1) {
        this.gameBoard[row][col] = 2;
        let shotCoordinatesStatus = {
          coordinates: {
            x: coordinates.x,
            y: coordinates.y,
          },
          status: this.gameBoard[row][col],
        };
        this.shotInformation = shotCoordinatesStatus;
        this.hitCount++;
        this.watchGame();
        if (this.hitCount == 10) {
          this.youWin = true;
        }
      } else if (this.gameBoard[row][col] > 1) {
        alert("Ya disparaste en esta ubicación.");
      }
    },
  },
};
</script>

<style lang="scss">
.content-board {
  height: 100vh;
  background: #000 url("../assets/images/board.jpg");
  background-size: cover;
}
.board {
  overflow-x: hidden;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 2em;

  .grid-board {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
  }

  .hits {
    font-size: 2em;
    color: white;
    font-weight: bold;
    padding: 0em 1.04em;
  }

  .turns-restart {
    .game-turns {
      font-size: 2em;
      color: white;
      font-weight: bold;
    }
    a {
      padding: 1em 0.5em;
      background-color: #8ce6e6;
      color: black;
      font-size: 1.2em;
      border: 3px solid white;
    }
  }
  .game-over {
    p {
      margin-top: 0;
      font-size: 4em;
      color: white;
      font-weight: bold;
    }
    a {
      padding: 1em 0.5em;
      background-color: #8ce6e6;
      color: black;
      font-size: 1.2em;
      border: 3px solid white;
    }
  }
  .you-win {
    p {
      margin-top: 0;
      font-size: 6em;
      color: white;
      font-weight: bold;
    }
    a {
      padding: 1em 0.5em;
      background-color: #8ce6e6;
      color: black;
      font-size: 1.2em;
      border: 3px solid white;
    }
  }
}
</style>