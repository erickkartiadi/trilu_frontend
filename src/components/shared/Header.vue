<template>
    <div class="header">
        <div>
            <a href="#" @click="home">Home</a>
        </div>
        <div class="right">
            <a href="#" class="name">{{fullname}}</a>
            <a href="#" @click="logout">Logout</a>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            logout() {
                this.$http.get('auth/logout').then(res => {
                    this.$router.push('/auth');
                    this.token = '';
                    localStorage.removeItem('token');
                    this.fullname = '';
                }).catch(err => {
                    console.log(err.response.data.message);
                })
            },
            home() {
                this.$router.push('/');
            }
        }
    }
</script>
<style scoped>
    .header {
        height: 40px;
        position: relative;
        background: gray;
        display: flex;
        align-items: center;
        padding: 0 1em;
        background: #248ea9;
        color: #ffe;
        font-weight: bold;
    }

    .header a,
    a:visited,
    a:link {
        text-decoration: none;
        color: #ffe;
        cursor: inherit;
    }

    .header a:hover {
        color: #aee7e8;
        cursor: pointer;
    }

    .header div.right {
        display: flex;
        justify-content: flex-end;
        flex-grow: 1;
    }

    .header div a {
        margin: 0 0.3em;
    }

    .name {
        text-transform: capitalize;
    }
</style>