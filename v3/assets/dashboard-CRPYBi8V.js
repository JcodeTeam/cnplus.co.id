import{t as o}from"./utils-0K0NRc03.js";document.addEventListener("DOMContentLoaded",()=>{o()});document.addEventListener("DOMContentLoaded",async()=>{const e=document.querySelector("#data-table tbody");e.querySelector("#loading");try{const d=await fetch("../api/get-data.php");if(d.status===401){window.location.href="../admin/";return}const n=await d.json();if(n.error)throw new Error(n.error);e.innerHTML="",n.forEach((t,r)=>{const a=document.createElement("tr");a.innerHTML=`
        <td>${r+1}</td>
        <td>${t.fullname}</td>
        <td>${t.email}</td>
        <td>${t.company}</td>
        <td>${t.industry}</td>
        <td>${t.phone}</td>
        <td>${t.product}</td>
        <td>${t.description}</td>
        <td>${new Date(t.created_at).toLocaleString()}</td>
      `,e.appendChild(a)})}catch(d){console.error(d),e.innerHTML='<tr><td colspan="9">Gagal memuat data</td></tr>'}});
