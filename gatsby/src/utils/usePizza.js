import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';
import formatPizzasForFinalOrder from './formatPizzasForFinalOrder';

export default function usePizza({ pizzas, values }) {
  // 1. create state to hold order
  // const [order, setOrder] = useState([]); // state now coming from OrderProvider
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // 2. make function to add pizza to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. make function to remove pizza from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1), // omitting second argument defaults to end of array
    ]);
  }

  // this is run when the form is submitted
  async function submitOrder(e) {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    setError(null);
    setMessage(null);
    // gather all data
    const body = {
      order: formatPizzasForFinalOrder(order),
      total: formatMoney(calculateOrderTotal(order)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    };
    // 4. send data to serverless function when customer checks out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage('Success! Come on down to pick up your order!');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  };
}
