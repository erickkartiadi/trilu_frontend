<template>
    <div>
        <div class="form" v-if='isLogin'>
            <header>Login</header>
            <form action="">
                <input v-model="user.username" type="text" placeholder="Username">
                <input v-model="user.password" type="password" placeholder="Password">
                <input @click.prevent="login" type="submit" value="Login">
            </form>
            <a href="#" @click="isLogin = !isLogin">Don't have account? register now!</a>
        </div>
        <div class="form" v-else>
            <header>Register</header>
            <form action="">
                <input v-model="user.first_name" type="text" placeholder="First Name">
                <input v-model="user.last_name" type="text" placeholder="Last Name">
                <input v-model="user.username" type="text" placeholder="Username">
                <input v-model="user.password" type="password" placeholder="Password">
                <input v-model="user.confirm_password" type="password" placeholder="Confirm Password">
                <input @click.prevent='register' type="submit" value="Register">
            </form>
            <a href="#" @click="isLogin = !isLogin">Have account? Login now!</a>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isLogin: true,
                user: {
                    username: '',
                    password: '',
                    first_name: '',
                    last_name: '',
                    confirm_password: ''
                }
            }
        },
        methods: {
            login() {
                this.$http.post('auth/login', this.user).then(res => {
                    this.token = res.data.token;
                    this.fullname = res.data.user.first_name + ' ' + res.data.user.last_name;
                    this.$router.push('/');
                }).catch(err => {
                    console.log('tidak masuk')
                })
            },
            register() {
                if (this.user.password !== this.user.confirm_password) {
                    alert('password did not match');
                    return;
                }
                this.$http.post('auth/register', this.user).then(res => {
                    this.token = res.data.token;
                    this.fullname = res.data.user.first_name + ' ' + res.data.user.last_name;
                    this.$router.push('/');
                }).catch(err => {
                    console.log(err.response.data.message);
                })
            }
        }
    }
</script>
<style scoped>
    * {
        margin: 0px;
        padding: 0px;
        font-family: Arial;
    }

    .form {
        display: flex;
        margin: 5em;
        align-items: center;
        justify-content: center;
        flex-flow: column;
    }

    .form input {
        display: flex;
        margin: 0.5em;
        padding: 0.2em;
        font-size: 1.2em;
    }

    .form header {
        display: block;
        font-weight: bold;
        font-size: 1.5em;
    }
</style>