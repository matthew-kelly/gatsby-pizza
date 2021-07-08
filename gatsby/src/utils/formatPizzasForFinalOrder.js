import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function formatPizzasForFinalOrder(order) {
  return order.map((item) => ({
    id: item.pizza.id,
    name: item.pizza.name,
    thumbnail: item.pizza.image.asset.fluid.src,
    price: formatMoney(calculatePizzaPrice(item.pizza.price, item.size)),
    size: item.size,
  }));
}
