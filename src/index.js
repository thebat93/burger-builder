import React from 'react';
import ReactDOM from 'react-dom';
// компонент для Роутера
import { BrowserRouter } from 'react-router-dom';
// компонент для Редакса
import { Provider } from 'react-redux';
// функция createStore
import { createStore } from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';

// создаем стор с помощью createStore и передаем редьюсер
// второй аргумент передается для работы Redux DevTools
const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// обернули все приложение в браузер роутер и провайдер
// стор передается в провайдер с помощью пропса store

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
