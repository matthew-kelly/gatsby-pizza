import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. create state to hold order
  // const [order, setOrder] = useState([]); // state now coming from OrderProvider
  const [order, setOrder] = useContext(OrderContext);
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
  // TODO: 4. send data to serverless function when customer checks out

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
