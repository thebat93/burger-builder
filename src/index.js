import React from 'react';
import ReactDOM from 'react-dom';
// компонент для Роутера из React Router
import { BrowserRouter } from 'react-router-dom';
// компонент для Редакса 
import { Provider } from 'react-redux';
// функции createStore (создание Store) и applyMiddleware (использование Middleware в качестве enhancer)
// compose (для объединения нескольких Middleware)
// combineReducers (для объединения нескольких редьюсеров) из Redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// Middleware для добавления асинхронности в Redux
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

// создаем стор с помощью createStore и передаем редьюсер
// второй аргумент передается для работы Redux DevTools и thunk
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

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
