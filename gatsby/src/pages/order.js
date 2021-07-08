import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderFormStyles from '../styles/OrderFormStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  } = usePizza({
    pizzas,
    values,
  });

  if (message) {
    return <h2>{message}</h2>;
  }

  return (
    <>
      <SEO title="Order a Pizza" />
      <OrderFormStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            // required
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            // required
            value={values.email}
            onChange={updateValue}
          />
          <input
            className="mapleSyrup"
            type="text"
            name="mapleSyrup"
            // required
            value={values.mapleSyrup}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div className="sizes">
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={`${pizza.id}-${size}`}
                    onClick={() => {
                      addToOrder({
                        pizza,
                        size,
                      });
                    }}
                  >
                    {size} -{' '}
                    {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder order={order} removeFromOrder={removeFromOrder} />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>Your Total is {formatMoney(calculateOrderTotal(order))}</h3>
          <div>
            {error ? <p style={{ color: 'red' }}>Error: {error}</p> : ''}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Sending Order...' : 'Order Now'}
          </button>
        </fieldset>
      </OrderFormStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
