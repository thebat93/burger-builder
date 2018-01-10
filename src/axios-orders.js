import axios from 'axios';

// настройки для запросов
// заказы

const instance = axios.create({
    // "базовый" URL
    baseURL: 'https://react-burger-builder-98f3a.firebaseio.com/'
});

export default instance;