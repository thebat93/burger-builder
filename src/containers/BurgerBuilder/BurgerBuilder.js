import React, { Component } from 'react';

import Aux from '../../hoc/hocAux';

// контейнер для строителя бургера

class BurgerBuilder extends Component {
    render() {
        return (
            <Aux>
                <div>Burger</div>
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;