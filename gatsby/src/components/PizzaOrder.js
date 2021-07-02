import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function PizzaOrder({ order, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const { pizza } = singleOrder;
        return (
          <MenuItemStyles key={`${pizza.id}-${index}`}>
            <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
            <h2>{pizza.name}</h2>
            <p>
              Size: {singleOrder.size} -{' '}
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizza.name} from order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
