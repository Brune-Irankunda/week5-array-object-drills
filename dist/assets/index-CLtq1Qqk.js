(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const o=[{id:101,customer:{name:"Alice",district:"Gasabo"},status:"delivered",rating:5,date:"2026-10-20",items:[{name:"Brochette",price:2e3,qty:2},{name:"Chips",price:1500,qty:1}]},{id:102,customer:{name:"Bob",district:"Kicukiro"},status:"pending",rating:null,date:"2026-10-20",items:[{name:"Pizza",price:8e3,qty:1},{name:"Soda",price:1e3,qty:2}]},{id:103,customer:{name:"Alice",district:"Gasabo"},status:"delivered",rating:4,date:"2026-10-21",items:[{name:"Brochette",price:2500,qty:3},{name:"Juice",price:1500,qty:2}]},{id:104,customer:{name:"David",district:"Nyarugenge"},status:"cancelled",rating:null,date:"2026-10-21",items:[{name:"Burger",price:4e3,qty:1}]},{id:105,customer:{name:"Claire",district:"Kicukiro"},status:"delivered",rating:3,date:"2026-10-22",items:[{name:"Pizza",price:7500,qty:2},{name:"Soda",price:1e3,qty:1}]},{id:106,customer:{name:"Eric",district:"Gasabo"},status:"pending",rating:null,date:"2026-10-22",items:[{name:"Brochette",price:2e3,qty:1},{name:"Chips",price:1500,qty:2}]},{id:107,customer:{name:"Bob",district:"Kicukiro"},status:"delivered",rating:2,date:"2026-10-22",items:[{name:"Burger",price:4500,qty:2},{name:"Juice",price:1500,qty:1}]},{id:108,customer:{name:"Grace",district:"Gasabo"},status:"pending",rating:null,date:"2026-10-23",items:[{name:"Brochette",price:2500,qty:2},{name:"Soda",price:1e3,qty:1}]}],D=JSON.stringify(o),l=({items:e})=>e.reduce((t,{price:s,qty:r})=>t+s*r,0),S=o.map(({id:e})=>e),x=o.map(({customer:{name:e}})=>e),m=o.filter(({status:e})=>e==="delivered"),j=o.filter(({customer:{district:e}})=>e==="Gasabo"),R=o.find(({id:e})=>e===106),B=o.some(({rating:e})=>e!==null&&e<=3),C=o.filter(({status:e})=>e==="pending").every(({rating:e})=>e===null),N=[...new Set(x)],A=o.map(e=>({...e,total:l(e)})),h=m.reduce((e,t)=>e+l(t),0),u=o.filter(({rating:e})=>e!==null),v=u.length?Number((u.reduce((e,{rating:t})=>e+t,0)/u.length).toFixed(1)):0,I=o.flatMap(({items:e})=>e).filter(({name:e})=>e==="Brochette").reduce((e,{qty:t})=>e+t,0),L=o.reduce((e,t)=>l(t)>l(e)?t:e),M=o.reduce((e,{status:t})=>(e[t]=(e[t]??0)+1,e),{}),y=m.reduce((e,t)=>{const s=t.customer.district;return e[s]=(e[s]??0)+l(t),e},{}),P=Object.groupBy(o,({date:e})=>e),E=Object.entries(P).map(([e,t])=>({date:e,count:t.length,revenue:t.reduce((s,r)=>s+l(r),0)})),w=Object.entries(o.flatMap(({items:e})=>e).reduce((e,{name:t,qty:s})=>(e[t]=(e[t]??0)+s,e),{})).map(([e,t])=>({name:e,qty:t})).sort((e,t)=>t.qty-e.qty).slice(0,3),G=Object.entries(o.reduce((e,t)=>{const s=t.customer.name;return e[s]||(e[s]={orders:0,spent:0}),e[s].orders+=1,e[s].spent+=l(t),e},{})).map(([e,t])=>({name:e,...t})).sort((e,t)=>t.spent-e.spent),k=Object.fromEntries(o.flatMap(({items:e})=>e).map(({name:e,price:t})=>[e,t]).filter(([e],t,s)=>s.findIndex(([r])=>r===e)===t)),K=(e,t)=>e.map(s=>s.id===t&&s.status==="pending"?{...s,status:"delivered"}:s),T=(e,t,s)=>e.map(r=>r.id===t&&r.status==="delivered"?{...r,rating:s}:r),z=(e,t,s)=>e.map(r=>r.id===t?{...r,customer:{...r.customer,district:s}}:r),J=(e,t,s)=>e.map(r=>r.id===t?{...r,items:[...r.items,{...s}]}:r),F=e=>e.filter(({status:t})=>t!=="cancelled"),U=(e,t)=>e.map(s=>({...s,items:s.items.map(r=>({...r,price:Math.round(r.price*(1-t/100))}))}));console.log("Original data unchanged:",JSON.stringify(o)===D);console.log("1. Order IDs:",S);console.log("2. Customer names:",x);console.log("3. Delivered orders:",m.length);console.log("4. Gasabo orders:",j.length);console.log("5. Order 106:",R);console.log("6. Has rating <= 3:",B);console.log("7. Pending orders unrated:",C);console.log("8. Unique customers:",N);console.log("9. Orders with totals:",A);console.log("10. Delivered revenue:",h);console.log("11. Average rating:",v);console.log("12. Brochettes sold:",I);console.log("13. Most expensive order:",L);console.log("14. Orders per status:",M);console.log("15. Revenue by district:",y);console.log("16. Daily summary:",E);console.log("17. Top selling items:",w);console.log("18. Customer summary:",G);console.log("19. Menu prices:",k);console.log("20. Mark 102 delivered:",K(o,102));console.log("21. Rate order 101:",T(o,101,5));console.log("22. Change district:",z(o,101,"Kicukiro"));console.log("23. Add item:",J(o,101,{name:"Juice",price:1500,qty:1}));console.log("24. Remove cancelled:",F(o));console.log("25. Apply 10% discount:",U(o,10));const f=document.querySelector("#app");let p="all";const g=e=>`RWF ${e.toLocaleString("en-US")}`,H={delivered:"bg-green-100 text-green-700",pending:"bg-amber-100 text-amber-700",cancelled:"bg-red-100 text-red-700"},W=Math.max(...Object.values(y),1);function O(){var b;const e=p==="all"?o:o.filter(({status:a})=>a===p),s=[{label:"Delivered Revenue",value:g(h),icon:"💰",color:"bg-purple-100 text-purple-700"},{label:"Delivered Orders",value:m.length,icon:"📦",color:"bg-green-100 text-green-700"},{label:"Average Rating",value:`${v} / 5`,icon:"⭐",color:"bg-amber-100 text-amber-700"},{label:"Best-Selling Item",value:((b=w[0])==null?void 0:b.name)??"None",icon:"🍽️",color:"bg-blue-100 text-blue-700"}].map(({label:a,value:d,icon:q,color:$})=>`
        <article class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm font-medium text-gray-500">${a}</p>
            <span class="flex h-11 w-11 items-center justify-center rounded-xl ${$}">
              ${q}
            </span>
          </div>
          <h2 class="mt-4 break-words text-2xl font-bold text-gray-900">${d}</h2>
        </article>
      `).join(""),r=Object.entries(y).map(([a,d])=>`
        <div class="space-y-2">
          <div class="flex justify-between gap-4 text-sm">
            <span class="font-medium text-gray-700">${a}</span>
            <span class="font-semibold text-gray-900">${g(d)}</span>
          </div>

          <div class="h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              class="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-500"
              style="width: ${d/W*100}%"
            ></div>
          </div>
        </div>
      `).join(""),n=e.map(a=>`
        <tr class="border-b border-gray-100 text-sm transition hover:bg-purple-50/50">
          <td class="whitespace-nowrap px-4 py-4 font-semibold text-purple-700">
            ${a.id}
          </td>

          <td class="whitespace-nowrap px-4 py-4 font-medium text-gray-800">
            ${a.customer.name}
          </td>

          <td class="whitespace-nowrap px-4 py-4 text-gray-600">
            ${a.customer.district}
          </td>

          <td class="whitespace-nowrap px-4 py-4 font-semibold text-gray-900">
            ${g(l(a))}
          </td>

          <td class="whitespace-nowrap px-4 py-4">
            <span class="inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${H[a.status]??"bg-gray-100 text-gray-700"}">
              ${a.status}
            </span>
          </td>
        </tr>
      `).join(""),i=`
    <tr>
      <td colspan="5" class="p-10 text-center">
        <div class="text-4xl">📭</div>
        <p class="mt-3 font-semibold text-gray-700">No orders found</p>
        <p class="mt-1 text-sm text-gray-500">
          Try selecting another filter.
        </p>
      </td>
    </tr>
  `,c=["all","delivered","pending","cancelled"].map(a=>`
        <button
          type="button"
          data-filter="${a}"
          class="rounded-lg px-4 py-2 text-sm font-semibold transition ${p===a?"bg-purple-600 text-white shadow-sm":"border border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"}"
        >
          ${a[0].toUpperCase()+a.slice(1)}
        </button>
      `).join("");f.innerHTML=`
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
          ${s}
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
          ${r}
        </div>
      </section>

      <section class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div class="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 md:p-6 sm:flex-row sm:items-center">
          <div>
            <h2 class="text-xl font-bold text-gray-900">Customer Orders</h2>

            <p class="mt-1 text-sm text-gray-500">
              ${e.length} orders displayed
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            ${c}
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
              ${n||i}
            </tbody>

          </table>
        </div>

      </section>

      <footer class="border-t border-gray-200 pt-5 text-center text-sm text-gray-500">
        Kigali Eats Dashboard · Order and Revenue Analytics
      </footer>

    </main>
  `,f.querySelectorAll("[data-filter]").forEach(a=>{a.addEventListener("click",()=>{p=a.dataset.filter,O()})})}O();
