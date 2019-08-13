import Board from './components/views/Board.vue';
import Auth from './components/views/Auth.vue';
import Lists from './components/views/Lists.vue';
export const routes = [
    { name: 'board', path: '/', component: Board },
    { name: 'auth', path: '/auth', component: Auth },
    { name: 'list', path: '/board/:id', component: Lists }
];