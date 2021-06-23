import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
        return (
          <MenuItemStyles key={singleOrder.id}>
            <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
            <h2>{pizza.name}</h2>
            <p>
              Size: {singleOrder.size} -{' '}
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
            </p>
            <button
              type="button"
              className="remove"
              title={`Remove ${singleOrder.size} ${pizza.name} from order`}
              onClick={() => removeFromOrder(index)}
            >
              &times;
            </button>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
