<template>
    <div class="board-wrapper">
        <div @click="open" class="board" v-if="isActive">
            <span @click='isActive = !isActive'>
                {{board.name}}
            </span>
        </div>
        <div class="board" v-else>
            <input type="text" placeholder="enter a new name" v-model="currentBoard.name"
                @keyup.enter="action(board.id)">
        </div>
    </div>
</template>
<script>
    export default {
        props: ['board'],
        data() {
            return {
                isActive: true,
                currentBoard: {
                    name: this.board.name
                }
            }
        },
        methods: {
            action(id) {
                if (this.currentBoard.name === '') {
                    this.$http.delete(`board/${id}`).then(res => {
                        console.log(res.data.message);
                        this.$emit('getBoards');
                        this.isActive = false;
                        this.$forceUpdate();
                    })
                } else {
                    this.$http.patch(`board/${id}`, this.currentBoard).then(res => {
                        console.log(res.data.message);
                        this.$emit('getBoards');
                        this.isActive = true;
                        this.$forceUpdate();
                    }).catch(err => {
                        console.log(err.response.data.message);
                    })
                }
            },
            open() {
                this.$router.push(`board/${this.board.id}`);
            }
        }
    }
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