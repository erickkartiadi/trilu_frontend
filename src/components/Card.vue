<template>
  <div class="card">
    <div @click="click()" class="card-content" v-if="!newCard.action">{{card.task}}</div>
    <div class="card-content" v-else>
      <input
        @keyup.enter="action"
        type="text"
        v-model="newCard.task"
        placeholder="Are you sure wan't to delete ?"
      />
    </div>
    <div class="control">
      <span @click="up">&uarr;</span>
      <span @click="down">&darr;</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list", "card"],
  data() {
    return {
      newCard: {
        action: false,
        task: this.card.task
      },
      currentListId: this.list.id,
      currentCardId: this.card.id
    };
  },
  methods: {
    click() {
      this.newCard.action = !this.newCard.action;
    },
    action() {
      if (this.newCard.task == "") {
        this.$http
          .delete(
            `board/${this.$route.params.id}/list/${this.currentListId}/card/${this.currentCardId}`
          )
          .then(res => {
            console.log(res.data.message);
            this.$parent.$emit("openBoard");
            this.newCard.action = false;
            this.$forceUpdate();
          });
      } else {
        this.$http
          .patch(
            `board/${this.$route.params.id}/list/${this.currentListId}/card/${this.currentCardId}`,
            this.newCard
          )
          .then(res => {
            console.log(res.data.message);
            this.newCard.action = false;
            this.$parent.$emit("openBoard");
            this.$forceUpdate();
          });
      }
    },
    up() {
      this.$http.post(`card/${this.card.id}/up`).then(res => {
        console.log(res.data.message);
        this.$parent.$emit("openBoard");
        this.$forceUpdate();
      });
    },
    down() {
      this.$http.post(`card/${this.card.id}/down`).then(res => {
        console.log(res.data.message);
        this.$parent.$emit("openBoard");
        this.$forceUpdate();
      });
    }
  }
};
</script>
<style>
.list {
  word-wrap: break-word;
  white-space: normal;
  display: inline-block;
  min-width: 272px;
  padding: 0.5em;
  margin-right: 0.7em;
  background: #28c3d4;
  border-radius: 3px;
  color: #ffe;
  box-shadow: inset 0 0 0 100vh rgba(0, 0, 0, 0.2);
}

.list > :last-child {
  margin-right: 0 !important;
}

.list header {
  font-size: 1.2em;
  font-weight: bold;
  padding-left: 0.5em;
}

.list header:hover {
  color: #248ea9;
  cursor: pointer;
}

.list .cards {
  margin-top: 0.5em;
  max-height: 55vh;
  overflow-y: auto;
  padding: 0.2em;
}

.list .card {
  display: flex;
  margin: 0.5em 0;
  background: #ffe;
  border-radius: 3px;
  color: #111;
}

.list .card .card-content {
  padding: 0.5em;
  flex: 6;
}

.list .card-content:hover {
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.list .card .control {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  flex: 1;
  margin-right: 5px;
}

.list .card .control span {
  font-size: 1.5em;
  padding: 2px;
  margin: 0px;
  white-space: nowrap;
}

.list .card .control span:hover,
.list > .control span:hover {
  color: #248ea9;
  cursor: pointer;
}

.list > .control {
  margin-top: -5px;
  text-align: center;
}

.list > .control span {
  font-size: 2em;
  font-weight: bold;
}

.list .button {
  margin-top: 0.2em;
  padding: 5px;
  border-radius: 3px;
}

.button {
  background: #28c3d4;
  color: #fafdcb;
  box-shadow: inset 0 0 0 272px rgba(0, 0, 0, 0.4);
  color: #ffe;
  cursor: pointer;
}

.button:hover {
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.6);
}

.list input,
.card input {
  width: 80%;
}

.card-on-edit .list header:after {
  content: "(click here to move card)";
  font-size: 0.8em;
}
</style>