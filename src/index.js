import React from 'react';
import ReactDOM from 'react-dom';
// компонент для Роутера из React Router
import { BrowserRouter } from 'react-router-dom';
// компонент для Редакса 
import { Provider } from 'react-redux';
// функции createStore (создание Store) и applyMiddleware (использование Middleware в качестве enhancer)
// compose (для объединения нескольких Middleware) из Redux
import { createStore, applyMiddleware, compose } from 'redux';
// Middleware для добавления асинхронности в Redux
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// создаем стор с помощью createStore и передаем редьюсер
// второй аргумент передается для работы Redux DevTools и thunk
const store = createStore(burgerBuilderReducer, composeEnhancers(applyMiddleware(thunk)));

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
