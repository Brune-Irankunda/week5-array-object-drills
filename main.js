
import "./style.css";
import { orders } from "./data.js";

import {
  orderTotal,
  deliveredOrders,
  deliveredRevenue,
  averageRating,
  topSellingItems,
  revenueByDistrict
} from "./drills.js";

const app = document.querySelector("#app");

let activeFilter = "all";

const money = amount =>
  `RWF ${amount.toLocaleString("en-US")}`;

const statusClasses = {
  delivered: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700"
};

const maxRevenue = Math.max(
  ...Object.values(revenueByDistrict),
  1
);

function renderDashboard() {
  const filteredOrders =
    activeFilter === "all"
      ? orders
      : orders.filter(({ status }) => status === activeFilter);

  // 1. Statistic cards
  const stats = [
    {
      label: "Delivered Revenue",
      value: money(deliveredRevenue),
      icon: "💰",
      color: "bg-purple-100 text-purple-700"
    },
    {
      label: "Delivered Orders",
      value: deliveredOrders.length,
      icon: "📦",
      color: "bg-green-100 text-green-700"
    },
    {
      label: "Average Rating",
      value: `${averageRating} / 5`,
      icon: "⭐",
      color: "bg-amber-100 text-amber-700"
    },
    {
      label: "Best-Selling Item",
      value: topSellingItems[0]?.name ?? "None",
      icon: "🍽️",
      color: "bg-blue-100 text-blue-700"
    }
  ];

  const statCards = stats
    .map(
      ({ label, value, icon, color }) => `
        <article class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm font-medium text-gray-500">${label}</p>
            <span class="flex h-11 w-11 items-center justify-center rounded-xl ${color}">
              ${icon}
            </span>
          </div>
          <h2 class="mt-4 break-words text-2xl font-bold text-gray-900">${value}</h2>
        </article>
      `
    )
    .join("");

  // 2. Revenue by district
  const districtBars = Object.entries(revenueByDistrict)
    .map(
      ([district, revenue]) => `
        <div class="space-y-2">
          <div class="flex justify-between gap-4 text-sm">
            <span class="font-medium text-gray-700">${district}</span>
            <span class="font-semibold text-gray-900">${money(revenue)}</span>
          </div>

          <div class="h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              class="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-500"
              style="width: ${(revenue / maxRevenue) * 100}%"
            ></div>
          </div>
        </div>
      `
    )
    .join("");

  // 3. Orders table
  const tableRows = filteredOrders
    .map(
      order => `
        <tr class="border-b border-gray-100 text-sm transition hover:bg-purple-50/50">
          <td class="whitespace-nowrap px-4 py-4 font-semibold text-purple-700">
            ${order.id}
          </td>

          <td class="whitespace-nowrap px-4 py-4 font-medium text-gray-800">
            ${order.customer.name}
          </td>

          <td class="whitespace-nowrap px-4 py-4 text-gray-600">
            ${order.customer.district}
          </td>

          <td class="whitespace-nowrap px-4 py-4 font-semibold text-gray-900">
            ${money(orderTotal(order))}
          </td>

          <td class="whitespace-nowrap px-4 py-4">
            <span class="inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              statusClasses[order.status] ?? "bg-gray-100 text-gray-700"
            }">
              ${order.status}
            </span>
          </td>
        </tr>
      `
    )
    .join("");

  // Empty state
  const emptyRow = `
    <tr>
      <td colspan="5" class="p-10 text-center">
        <div class="text-4xl">📭</div>
        <p class="mt-3 font-semibold text-gray-700">No orders found</p>
        <p class="mt-1 text-sm text-gray-500">
          Try selecting another filter.
        </p>
      </td>
    </tr>
  `;

  // 4. Filter buttons
  const filters = ["all", "delivered", "pending", "cancelled"]
    .map(
      status => `
        <button
          type="button"
          data-filter="${status}"
          class="rounded-lg px-4 py-2 text-sm font-semibold transition ${
            activeFilter === status
              ? "bg-purple-600 text-white shadow-sm"
              : "border border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
          }"
        >
          ${status[0].toUpperCase() + status.slice(1)}
        </button>
      `
    )
    .join("");

  // Dashboard layout
  app.innerHTML = `
    <main class="mx-auto max-w-7xl space-y-8 p-5 text-gray-800 md:p-8">

      <header class="flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
            Kigali Eats
          </p>

          <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Orders Dashboard
          </h1>

          <p class="mt-2 text-gray-500">
            Revenue, customer orders and delivery performance.
          </p>
        </div>

        <div class="inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
          <span class="h-2 w-2 rounded-full bg-green-500"></span>
          Dashboard Overview
        </div>
      </header>

      <section>
        <h2 class="mb-4 text-lg font-bold text-gray-900">
          Performance Summary
        </h2>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          ${statCards}
        </div>
      </section>

      <section class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-gray-900">
            Revenue by District
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Compare revenue across your delivery districts.
          </p>
        </div>

        <div class="space-y-6">
          ${districtBars}
        </div>
      </section>

      <section class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div class="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 md:p-6 sm:flex-row sm:items-center">
          <div>
            <h2 class="text-xl font-bold text-gray-900">Customer Orders</h2>

            <p class="mt-1 text-sm text-gray-500">
              ${filteredOrders.length} orders displayed
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            ${filters}
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">

            <thead class="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th class="px-4 py-4 font-semibold">Order ID</th>
                <th class="px-4 py-4 font-semibold">Customer</th>
                <th class="px-4 py-4 font-semibold">District</th>
                <th class="px-4 py-4 font-semibold">Total</th>
                <th class="px-4 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              ${tableRows || emptyRow}
            </tbody>

          </table>
        </div>

      </section>

      <footer class="border-t border-gray-200 pt-5 text-center text-sm text-gray-500">
        Kigali Eats Dashboard · Order and Revenue Analytics
      </footer>

    </main>
  `;

  // Reattach filter events after rendering
  app.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      renderDashboard();
    });
  });
}

renderDashboard();
