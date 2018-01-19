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
import reducer from './store/reducer';

// создаем стор с помощью createStore и передаем редьюсер
const store = createStore(reducer);

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
