import React from 'react';

import classes from './Order.css';

// заказ

const order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad (1)</p>
            <p>Price: <strong>$5</strong></p>
        </div>
    );
}

export default order;