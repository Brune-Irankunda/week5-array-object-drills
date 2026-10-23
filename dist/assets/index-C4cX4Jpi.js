(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:101,customer:{name:`Aline`,district:`Gasabo`},items:[{name:`Brochette`,price:2500,qty:4},{name:`Fanta`,price:700,qty:2}],status:`delivered`,rating:5,date:`2026-10-01`},{id:102,customer:{name:`Eric`,district:`Kicukiro`},items:[{name:`Isombe`,price:3e3,qty:1}],status:`delivered`,rating:4,date:`2026-10-01`},{id:103,customer:{name:`Grace`,district:`Nyarugenge`},items:[{name:`Pizza`,price:9e3,qty:2},{name:`Juice`,price:1500,qty:2}],status:`cancelled`,rating:null,date:`2026-10-02`},{id:104,customer:{name:`Aline`,district:`Gasabo`},items:[{name:`Chapati`,price:500,qty:6},{name:`Tea`,price:800,qty:2}],status:`delivered`,rating:3,date:`2026-10-02`},{id:105,customer:{name:`Jean`,district:`Gasabo`},items:[{name:`Burger`,price:6e3,qty:1}],status:`pending`,rating:null,date:`2026-10-03`},{id:106,customer:{name:`Eric`,district:`Kicukiro`},items:[{name:`Brochette`,price:2500,qty:2},{name:`Chips`,price:1500,qty:2}],status:`delivered`,rating:5,date:`2026-10-03`},{id:107,customer:{name:`Diane`,district:`Nyarugenge`},items:[{name:`Isombe`,price:3e3,qty:2},{name:`Juice`,price:1500,qty:1}],status:`delivered`,rating:4,date:`2026-10-04`},{id:108,customer:{name:`Grace`,district:`Nyarugenge`},items:[{name:`Pizza`,price:9e3,qty:1}],status:`pending`,rating:null,date:`2026-10-04`}],t=JSON.stringify(e),n=({items:e})=>e.reduce((e,{price:t,qty:n})=>e+t*n,0),r=e.map(({id:e})=>e),i=e.map(({customer:{name:e}})=>e),a=e.filter(({status:e})=>e===`delivered`),o=e.filter(({customer:{district:e}})=>e===`Gasabo`),s=e.find(({id:e})=>e===106),c=e.some(({rating:e})=>e!==null&&e<=3),l=e.filter(({status:e})=>e===`pending`).every(({rating:e})=>e===null),u=[...new Set(i)],d=e.map(e=>({...e,total:n(e)})),f=e.filter(({status:e})=>e===`delivered`).reduce((e,t)=>e+n(t),0),p=Number((e.filter(({rating:e})=>e!==null).reduce((e,{rating:t})=>e+t,0)/e.filter(({rating:e})=>e!==null).length).toFixed(1)),m=e.flatMap(({items:e})=>e).filter(({name:e})=>e===`Brochette`).reduce((e,{qty:t})=>e+t,0),h=e.reduce((e,t)=>n(t)>n(e)?t:e),g=e.reduce((e,{status:t})=>({...e,[t]:(e[t]??0)+1}),{}),_=e.filter(({status:e})=>e===`delivered`).reduce((e,t)=>{let r=t.customer.district;return{...e,[r]:(e[r]??0)+n(t)}},{}),v=Object.groupBy(e,({date:e})=>e),y=Object.entries(v).map(([e,t])=>({date:e,count:t.length,revenue:t.reduce((e,t)=>e+n(t),0)})),b=Object.entries(e.flatMap(({items:e})=>e).reduce((e,{name:t,qty:n})=>({...e,[t]:(e[t]??0)+n}),{})).map(([e,t])=>({name:e,qty:t})).toSorted((e,t)=>t.qty-e.qty).slice(0,3),x=Object.entries(e.reduce((e,t)=>{let r=t.customer.name;return{...e,[r]:{orders:(e[r]?.orders??0)+1,spent:(e[r]?.spent??0)+n(t)}}},{})).map(([e,t])=>({name:e,...t})).toSorted((e,t)=>t.spent-e.spent),S=Object.fromEntries(e.flatMap(({items:e})=>e).map(({name:e,price:t})=>[e,t]).filter(([e],t,n)=>n.findIndex(([t])=>t===e)===t));console.log(`Original data unchanged:`,JSON.stringify(e)===t),console.log(`1. Order IDs:`,r),console.log(`2. Customer names:`,i),console.log(`3. Delivered orders:`,a.length),console.log(`4. Gasabo orders:`,o.length),console.log(`5. Order 106:`,s),console.log(`6. Has rating <= 3:`,c),console.log(`7. Pending orders unrated:`,l),console.log(`8. Unique customers:`,u),console.log(`9. Orders with totals:`,d),console.log(`10. Delivered revenue:`,f),console.log(`11. Average rating:`,p),console.log(`12. Brochettes sold:`,m),console.log(`13. Most expensive order:`,h),console.log(`14. Orders per status:`,g),console.log(`15. Revenue by district:`,_),console.log(`16. Daily summary:`,y),console.log(`17. Top selling items:`,b),console.log(`18. Customer summary:`,x),console.log(`19. Menu prices:`,S);var C=document.querySelector(`#app`),w=`all`,T=e=>`RWF ${e.toLocaleString(`en-US`)}`,E={delivered:`bg-green-100 text-green-700`,pending:`bg-amber-100 text-amber-700`,cancelled:`bg-red-100 text-red-700`},D=Math.max(...Object.values(_),1);function O(){let t=w===`all`?e:e.filter(({status:e})=>e===w),r=[{label:`Delivered Revenue`,value:T(f),icon:`💰`,color:`bg-purple-100 text-purple-700`},{label:`Delivered Orders`,value:a.length,icon:`📦`,color:`bg-green-100 text-green-700`},{label:`Average Rating`,value:`${p} / 5`,icon:`⭐`,color:`bg-amber-100 text-amber-700`},{label:`Best-Selling Item`,value:b[0]?.name??`None`,icon:`🍽️`,color:`bg-blue-100 text-blue-700`}].map(({label:e,value:t,icon:n,color:r})=>`
        <article class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm font-medium text-gray-500">${e}</p>
            <span class="flex h-11 w-11 items-center justify-center rounded-xl ${r}">
              ${n}
            </span>
          </div>
          <h2 class="mt-4 break-words text-2xl font-bold text-gray-900">${t}</h2>
        </article>
      `).join(``),i=Object.entries(_).map(([e,t])=>`
        <div class="space-y-2">
          <div class="flex justify-between gap-4 text-sm">
            <span class="font-medium text-gray-700">${e}</span>
            <span class="font-semibold text-gray-900">${T(t)}</span>
          </div>

          <div class="h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              class="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-500"
              style="width: ${t/D*100}%"
            ></div>
          </div>
        </div>
      `).join(``),o=t.map(e=>`
        <tr class="border-b border-gray-100 text-sm transition hover:bg-purple-50/50">
          <td class="whitespace-nowrap px-4 py-4 font-semibold text-purple-700">
            ${e.id}
          </td>

          <td class="whitespace-nowrap px-4 py-4 font-medium text-gray-800">
            ${e.customer.name}
          </td>

          <td class="whitespace-nowrap px-4 py-4 text-gray-600">
            ${e.customer.district}
          </td>

          <td class="whitespace-nowrap px-4 py-4 font-semibold text-gray-900">
            ${T(n(e))}
          </td>

          <td class="whitespace-nowrap px-4 py-4">
            <span class="inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${E[e.status]??`bg-gray-100 text-gray-700`}">
              ${e.status}
            </span>
          </td>
        </tr>
      `).join(``),s=[`all`,`delivered`,`pending`,`cancelled`].map(e=>`
        <button
          type="button"
          data-filter="${e}"
          class="rounded-lg px-4 py-2 text-sm font-semibold transition ${w===e?`bg-purple-600 text-white shadow-sm`:`border border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700`}"
        >
          ${e[0].toUpperCase()+e.slice(1)}
        </button>
      `).join(``);C.innerHTML=`
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
          ${r}
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
          ${i}
        </div>
      </section>

      <section class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div class="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 md:p-6 sm:flex-row sm:items-center">
          <div>
            <h2 class="text-xl font-bold text-gray-900">Customer Orders</h2>

            <p class="mt-1 text-sm text-gray-500">
              ${t.length} orders displayed
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            ${s}
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
              ${o||`
    <tr>
      <td colspan="5" class="p-10 text-center">
        <div class="text-4xl">📭</div>
        <p class="mt-3 font-semibold text-gray-700">No orders found</p>
        <p class="mt-1 text-sm text-gray-500">
          Try selecting another filter.
        </p>
      </td>
    </tr>
  `}
            </tbody>

          </table>
        </div>

      </section>

      <footer class="border-t border-gray-200 pt-5 text-center text-sm text-gray-500">
        Kigali Eats Dashboard · Order and Revenue Analytics
      </footer>

    </main>
  `,C.querySelectorAll(`[data-filter]`).forEach(e=>{e.addEventListener(`click`,()=>{w=e.dataset.filter,O()})})}O();