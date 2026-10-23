
import { orders } from "./data.js";

const ORIGINAL = JSON.stringify(orders);

// Helper: calculate the total for one order
export const orderTotal = ({ items }) =>
  items.reduce((sum, { price, qty }) => sum + price * qty, 0);

// 1. Array of all order IDs
export const orderIds = orders.map(({ id }) => id);

// 2. Customer names (duplicates allowed)
export const customerNames = orders.map(
  ({ customer: { name } }) => name
);

// 3. All delivered orders
export const deliveredOrders = orders.filter(
  ({ status }) => status === "delivered"
);

// 4. All orders from Gasabo
export const gasaboOrders = orders.filter(
  ({ customer: { district } }) => district === "Gasabo"
);

// 5. Find order ID 106
export const order106 = orders.find(({ id }) => id === 106);

// 6. Any rating of 3 or lower?
export const hasLowRating = orders.some(
  ({ rating }) => rating !== null && rating <= 3
);

// 7. Are all pending orders unrated?
export const pendingOrdersUnrated = orders
  .filter(({ status }) => status === "pending")
  .every(({ rating }) => rating === null);

// 8. Unique customer names
export const uniqueCustomerNames = [...new Set(customerNames)];

// 9. Add a total to every order
export const ordersWithTotals = orders.map(order => ({
  ...order,
  total: orderTotal(order)
}));

// 10. Revenue from delivered orders
export const deliveredRevenue = deliveredOrders.reduce(
  (sum, order) => sum + orderTotal(order),
  0
);

// 11. Average rating, ignoring null values
const ratedOrders = orders.filter(({ rating }) => rating !== null);

export const averageRating = ratedOrders.length
  ? Number((
      ratedOrders.reduce((sum, { rating }) => sum + rating, 0) /
      ratedOrders.length
    ).toFixed(1))
  : 0;

// 12. Total quantity of Brochettes sold
export const brochettesSold = orders
  .flatMap(({ items }) => items)
  .filter(({ name }) => name === "Brochette")
  .reduce((sum, { qty }) => sum + qty, 0);

// 13. Most expensive order
export const mostExpensiveOrder = orders.reduce(
  (highest, order) =>
    orderTotal(order) > orderTotal(highest) ? order : highest
);

// 14. Number of orders per status
export const ordersPerStatus = orders.reduce((counts, { status }) => {
  counts[status] = (counts[status] ?? 0) + 1;
  return counts;
}, {});

// 15. Revenue by district from delivered orders
export const revenueByDistrict = deliveredOrders.reduce(
  (revenue, order) => {
    const district = order.customer.district;
    revenue[district] = (revenue[district] ?? 0) + orderTotal(order);
    return revenue;
  },
  {}
);

// 16. Daily order summary
const groupedByDate = Object.groupBy(orders, ({ date }) => date);

export const dailySummary = Object.entries(groupedByDate).map(
  ([date, dailyOrders]) => ({
    date,
    count: dailyOrders.length,
    revenue: dailyOrders.reduce(
      (sum, order) => sum + orderTotal(order),
      0
    )
  })
);

// 17. Top 3 best-selling items by quantity
export const topSellingItems = Object.entries(
  orders.flatMap(({ items }) => items).reduce((totals, { name, qty }) => {
    totals[name] = (totals[name] ?? 0) + qty;
    return totals;
  }, {})
)
  .map(([name, qty]) => ({ name, qty }))
  .sort((a, b) => b.qty - a.qty)
  .slice(0, 3);

// 18. Each customer's order count and total spent
export const customerSummary = Object.entries(
  orders.reduce((customers, order) => {
    const name = order.customer.name;

    if (!customers[name]) {
      customers[name] = { orders: 0, spent: 0 };
    }

    customers[name].orders += 1;
    customers[name].spent += orderTotal(order);

    return customers;
  }, {})
)
  .map(([name, summary]) => ({ name, ...summary }))
  .sort((a, b) => b.spent - a.spent);

// 19. Menu price list (first recorded price for each item)
export const menuPrices = Object.fromEntries(
  orders
    .flatMap(({ items }) => items)
    .map(({ name, price }) => [name, price])
    .filter(
      ([name], index, entries) =>
        entries.findIndex(([itemName]) => itemName === name) === index
    )
);

// 20. Mark a pending order as delivered
export const markDelivered = (orders, id) =>
  orders.map(order =>
    order.id === id && order.status === "pending"
      ? { ...order, status: "delivered" }
      : order
  );

// 21. Rate only delivered orders
export const rateOrder = (orders, id, rating) =>
  orders.map(order =>
    order.id === id && order.status === "delivered"
      ? { ...order, rating }
      : order
  );

// 22. Change a customer's district
export const changeDistrict = (orders, id, district) =>
  orders.map(order =>
    order.id === id
      ? {
          ...order,
          customer: { ...order.customer, district }
        }
      : order
  );

// 23. Add an item to an order
export const addItem = (orders, id, item) =>
  orders.map(order =>
    order.id === id
      ? { ...order, items: [...order.items, { ...item }] }
      : order
  );

// 24. Remove cancelled orders
export const removeCancelled = orders =>
  orders.filter(({ status }) => status !== "cancelled");

// 25. Apply a discount to every item
export const applyDiscount = (orders, percent) =>
  orders.map(order => ({
    ...order,
    items: order.items.map(item => ({
      ...item,
      price: Math.round(item.price * (1 - percent / 100))
    }))
  }));

// Verify original data was not mutated
console.log(
  "Original data unchanged:",
  JSON.stringify(orders) === ORIGINAL
);

// Display exercise results
console.log("1. Order IDs:", orderIds);
console.log("2. Customer names:", customerNames);
console.log("3. Delivered orders:", deliveredOrders.length);
console.log("4. Gasabo orders:", gasaboOrders.length);
console.log("5. Order 106:", order106);
console.log("6. Has rating <= 3:", hasLowRating);
console.log("7. Pending orders unrated:", pendingOrdersUnrated);
console.log("8. Unique customers:", uniqueCustomerNames);
console.log("9. Orders with totals:", ordersWithTotals);
console.log("10. Delivered revenue:", deliveredRevenue);
console.log("11. Average rating:", averageRating);
console.log("12. Brochettes sold:", brochettesSold);
console.log("13. Most expensive order:", mostExpensiveOrder);
console.log("14. Orders per status:", ordersPerStatus);
console.log("15. Revenue by district:", revenueByDistrict);
console.log("16. Daily summary:", dailySummary);
console.log("17. Top selling items:", topSellingItems);
console.log("18. Customer summary:", customerSummary);
console.log("19. Menu prices:", menuPrices);

// Exercises 20–25 demonstration
console.log("20. Mark 102 delivered:", markDelivered(orders, 102));
console.log("21. Rate order 101:", rateOrder(orders, 101, 5));
console.log("22. Change district:", changeDistrict(orders, 101, "Kicukiro"));
console.log("23. Add item:", addItem(orders, 101, {
  name: "Juice", price: 1500, qty: 1
}));
console.log("24. Remove cancelled:", removeCancelled(orders));
console.log("25. Apply 10% discount:", applyDiscount(orders, 10));
