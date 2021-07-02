import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order) {
  // loop over each item in the order
  const total = order.reduce((runningTotal, orderItem) => {
    // calculate the total for that pizza
    const { pizza } = orderItem;
    // add to the running total
    return runningTotal + calculatePizzaPrice(pizza.price, orderItem.size);
  }, 0);
  return total;
}
