import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../hocAux/hocAux';

// компонент высшего уровня
// обертка для сообщения об ошибке

const withErrorHandler = (WrapperComponent, axios) => { // передаем обернутый компонент и инстанс axios
    
    return class extends Component { // возвращаем stateful компонент (чтобы иметь state и lifecycle хуки)
        state = {
            error: null // ошибка
        }

        componentDidMount = () => {
            // при каждой отправке запроса сбрасываем state
            axios.interceptors.request.use(request => { // подключаем интерсептор для запроса и перехватываем его
                this.setState({error: null}); // обновляем state
                return request; // вернуть запрос чтобы он продолжился
            });
            axios.interceptors.response.use(response => response, error => { // подключаем интерсептор для ответа и перехватываем ошибки
                this.setState({error: error}); // обновляем state
            });
        }

        errorConfirmedHandler = () => { // сбросить state при подтверждении ошибки
            this.setState({error: null});
        }

        // JSX с модальным окном
        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        Ooops! Something is wrong!
                        <p>{this.state.error ? this.state.error.message : null}</p>
                        {/* Если получили ошибку, то отображаем ее. Иначе ничего не передаем в Modal. */}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;