<template>
  <div class="container">
    <div class="board-container">
      <board v-for="board in boards" :board="board" @getBoards="getBoards"></board>
      <div class="board-wrapper">
        <div v-if="add" class="board new-board">
          <input
            v-model="newBoard.name"
            @keyup.enter="store"
            type="text"
            placeholder="New Board Name"
            autofocus
          />
        </div>
        <div @click="add = true" v-else class="board new-board">Create new board...</div>
      </div>
    </div>
  </div>
</template>
<script>
import Boards from "../Boards.vue";
export default {
  data() {
    return {
      add: false,
      boards: Array(),
      componentKey: 0,
      newBoard: {
        name: ""
      }
    };
  },
  components: {
    board: Boards
  },
  created() {
    this.getBoards();
    console.log(this.boards);
  },
  methods: {
    getBoards() {
      this.$http
        .get("board")
        .then(res => {
          this.boards = res.data;
        })
        .catch(err => {
          this.$router.push("/auth");
          console.log(err.response.data.message);
        });
    },
    store() {
      this.$http
        .post("board", this.newBoard)
        .then(res => {
          this.add = false;
          this.getBoards();
          this.newBoard.name = "";
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    open() {
      console.log("sfsdaf");
    }
  }
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}

.board-container {
  flex: 1 1 100%;
  margin: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;
}

.board-container::after {
  content: "";
  flex: auto;
}

.board-wrapper {
  display: flex;
  flex: 0 0 25%;
  box-sizing: border-box;
  padding: 0.5em;
  cursor: pointer;
}

.board {
  flex: 1;
  padding: 1em;
  background: #248ea9;
  color: #ffe;
  font-weight: bold;
}

.new-board {
  background: #fafdcb;
  color: #248ea9;
}

.board input {
  width: 100%;
}
</style>