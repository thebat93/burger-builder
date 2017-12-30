import React, { Component } from 'react';

import Aux from '../../hoc/hocAux';
import Burger from '../../components/Burger/Burger';

// контейнер для строителя бургера

class BurgerBuilder extends Component {
    render() {
        return (
            <Aux>
                <Burger />
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;