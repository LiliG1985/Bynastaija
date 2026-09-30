/* ---------- Settings Nastasija can change ---------- */
const CONFIG = {
  instagram: "bynastasija",           // confirm exact handle
  whatsapp: "",                        // e.g. "971501234567" (digits only)
  email: "hello@bynastasija.com",      // placeholder
  location: "Dubai, UAE · address sent on confirmation",
  openDays: [1,2,3,4,5,6],             // 0=Sun … 6=Sat
  open: "10:00", close: "19:00",
  consultTimes: ["09:00","09:30","19:00","19:30","20:00"],
  daysAhead: 60,
  deposits: { pmu:300, skin:200, lash:100 },
  paymentLinks: { pmu:"", skin:"", lash:"" }   // paste Stripe payment links here
};

const CATS = [
  {id:"skin", title:"Skin treatments", icon:"i-face", img:"img/peel-profile.jpg", pos:"50% 45%",
   blurb:"Professional peels and facials for tone, texture, pigmentation and glow. Most have little or no downtime."},
  {id:"needling", title:"Microneedling", icon:"i-pen", img:"img/dermapen.jpg", pos:"50% 70%", dep:"skin",
   blurb:"Collagen induction with Dermapen 4, boosted with the serum your skin needs. For texture, scarring, fine lines and firmness."},
  {id:"pmu", title:"Permanent makeup", icon:"i-lips", img:"img/lips-fresh.jpg", pos:"50% 50%",
   blurb:"Lip blush and brows designed around your face and colouring, including shape mapping and colour matching."},
  {id:"lash", title:"Brows + lashes", icon:"i-eye", img:"img/brow-lamination.jpg", pos:"50% 40%",
   blurb:"Low-maintenance lashes and brows that look done without makeup."}
];
const SERVICES = [
  {id:"ph-peel", cat:"skin", name:"PHformula Resurfacing Peel", mins:60, price:700, desc:"Medical-grade resurfacing for uneven tone, pigmentation, congestion and rough texture. Ideal as a course."},
  {id:"ph-peel-plus", cat:"skin", name:"PHformula Peel + Nanoneedling or Bio-Microneedling", mins:75, price:850, desc:"The resurfacing peel paired with needling so the actives work deeper, for a stronger result."},
  {id:"circadia", cat:"skin", name:"Customised Circadia Treatment", mins:60, price:700, desc:"A facial built around your skin on the day, using Circadia’s professional range."},
  {id:"oxygen", cat:"skin", name:"Cocoa+ Oxygen Facial", mins:60, price:650, desc:"Oxygenating, brightening facial for dull or tired skin. Instant glow, no downtime."},
  {id:"biorepeel", cat:"skin", name:"BioRePeel", mins:45, price:650, desc:"Bio-stimulating peel that refreshes and firms with very little visible peeling."},
  {id:"nuqy", cat:"skin", name:"NUQY Bio-Microneedling", mins:60, price:700, desc:"Needle-free bio-microneedling that kick-starts renewal for smoother, brighter skin."},
  {id:"mn-salmon", cat:"needling", name:"Microneedling with Salmon DNA & Exosomes", mins:75, price:700, desc:"Repairing and hydrating. Great for dull, dehydrated or sun-tired skin."},
  {id:"mn-exo", cat:"needling", name:"Microneedling with PHformula Biomimetic Exosomes", mins:75, price:900, desc:"Advanced regenerative serum for texture, fine lines and overall skin quality."},
  {id:"mn-stem", cat:"needling", name:"Microneedling with Stem Cells", mins:75, price:900, desc:"Growth-factor rich serum to support firmness and renewal."},
  {id:"mn-biorepeel", cat:"needling", name:"Microneedling with BioRePeel", mins:75, price:700, desc:"Needling combined with BioRePeel for texture, pores and brightness."},
  {id:"lip-blush", cat:"pmu", name:"Lip Blush", mins:150, price:1200, desc:"Soft, even colour and definition. Can also warm up or neutralise darker lip tones."},
  {id:"brows", cat:"pmu", name:"Eyebrows (PMU)", mins:150, price:1200, desc:"Fuller, balanced brows mapped to your face, from soft powder to fine hair-stroke detail."},
  {id:"top-up", cat:"pmu", name:"Top Up", mins:90, price:400, desc:"Refresh colour and crispness on existing lip blush or brows."},
  {id:"lash-lift", cat:"lash", name:"Lash Lift & Tint", mins:60, price:220, desc:"Lifted, curled and darkened natural lashes."},
  {id:"brow-lam", cat:"lash", name:"Brow Lamination", mins:45, price:250, desc:"Brushed-up, fuller-looking brows that stay in place."}
];
const ADDONS = {browtint:{name:"Brow tint", price:50}, bothtint:{name:"Brow tint and lash tint", price:80}};
const BA = [
  ["ba-lips-1.jpg","Lip blush"],["ba-brows.jpg","Brows"],["ba-lips-2.jpg","Lip blush"],["ba-lips-3.jpg","Lip neutralisation"]
];
const NEWS = [
  {tag:"New tool", title:"Dermapen 4 microneedling", img:"img/dermapen.jpg", pos:"50% 60%", book:"mn-salmon", price:"From 700 AED",
   text:"Clinic-grade microneedling with 16 needles and sterile single-use cartridges, for scarring, pores, pigmentation and fine lines. Pair it with exosomes, salmon DNA, stem cells or BioRePeel."},
  {tag:"New booster", title:"PHformula Biomimetic Exosomes", img:"img/glow-freckles.jpg", pos:"40% 50%", book:"mn-exo", price:"900 AED",
   text:"The most advanced add-on on the menu. A regenerative exosome serum delivered through microneedling for smoother, firmer, more even skin."},
  {tag:"New treatment", title:"NUQY Bio-Microneedling", img:"img/peel-face.jpg", pos:"50% 50%", book:"nuqy", price:"700 AED",
   text:"Needle-free bio-microneedling that renews the skin surface with minimal downtime. A great introduction if you’re new to needling."},
  {tag:"Now online", title:"Book and pay your deposit online", img:"img/lips-veil.jpg", pos:"50% 50%", link:"book", price:"",
   text:"Pick your treatment, choose a time on the calendar and secure it with your deposit in a couple of minutes. Your deposit comes off the final price."},
  {tag:"Free", title:"20-minute consultation calls", img:"img/cryo-globes.jpg", pos:"50% 35%", link:"consult", price:"Free",
   text:"Not sure what you need? Book a free phone or video call and get an honest plan before you commit to anything."}
];
const depKey = s => (CATS.find(c=>c.id===s.cat).dep || s.cat);

/* ---------- helpers ---------- */
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const fmt = n => n.toLocaleString("en-US") + " AED";
const pad = n => String(n).padStart(2,"0");
const toMin = t => { const [h,m]=t.split(":").map(Number); return h*60+m; };
const toT = m => pad(Math.floor(m/60))+":"+pad(m%60);
const dur = m => m>=60 ? (Math.floor(m/60)+" h"+(m%60?" "+(m%60)+" min":"")) : m+" min";
const dateLong = d => d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
const ref = () => "BN-" + Date.now().toString(36).slice(-5).toUpperCase();
const waLink = text => CONFIG.whatsapp ? "https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(text) : "https://www.instagram.com/"+CONFIG.instagram+"/";
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/* ---------- static fill ---------- */
$("#yr").textContent = new Date().getFullYear();
$$(".ig-link").forEach(a=>a.href="https://www.instagram.com/"+CONFIG.instagram+"/");
$$(".ig-handle").forEach(a=>a.textContent="@"+CONFIG.instagram);
$("#waText").textContent = CONFIG.whatsapp ? "+"+CONFIG.whatsapp : "Number coming soon";
$("#emText").textContent = CONFIG.email;
$("#locText").textContent = CONFIG.location;
$("#footLoc").textContent = CONFIG.location.split("·")[0].trim();
const dn=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
$("#hrsText").textContent = dn[CONFIG.openDays[0]]+"–"+dn[CONFIG.openDays[CONFIG.openDays.length-1]] + " · " + CONFIG.open + "–" + CONFIG.close;
$$("[data-copy]").forEach(b=>b.addEventListener("click",()=>{
  const el=$("#"+b.dataset.copy);
  const sel=()=>{const r=document.createRange(); r.selectNodeContents(el); const s=getSelection(); s.removeAllRanges(); s.addRange(r);};
  try{ navigator.clipboard.writeText(el.textContent).then(()=>{b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1500)}).catch(sel);}catch(e){sel();}
}));

$("#baGrid").innerHTML = BA.map(([f,c])=>`<figure class="ba"><div class="frame"><img src="img/${f}" alt="${c} before and after" loading="lazy"><span class="tag t1">Before</span><span class="tag t2">After</span></div><figcaption>${c}</figcaption></figure>`).join("");

const newsAction = n => n.book ? `<button type="button" class="tlink" data-book="${n.book}">Book now</button>` : `<a class="tlink" href="#${n.link}">${n.link==="consult"?"Choose a time":"Book now"}</a>`;
$("#newsPreview").innerHTML = NEWS.slice(0,3).map(n=>`<article class="news"><span class="pill">${n.tag}</span><h3>${n.title}</h3><p>${n.text.split(". ")[0]}.</p>${newsAction(n)}</article>`).join("");
$("#newRoot").innerHTML = NEWS.map(n=>`<article class="wn"><div class="img"><img src="${n.img}" alt="" loading="lazy" style="object-position:${n.pos}"></div>
  <div class="txt"><span class="pill">${n.tag}</span><h2>${n.title}</h2><p>${n.text}</p>${n.price?`<p class="price">${n.price}</p>`:""}<div>${newsAction(n)}</div></div></article>`).join("");

$("#svcRoot").innerHTML = CATS.map(c=>`
  <div class="cat" id="cat-${c.id}">
    <div class="shade strip"><img class="bg" src="${c.img}" alt="" loading="lazy" style="object-position:${c.pos}">
      <div class="inner"><h2>${c.title}</h2><svg class="ic"><use href="#${c.icon}"/></svg></div></div>
    <p class="intro">${c.blurb}</p>
    <div class="svc-list">${SERVICES.filter(s=>s.cat===c.id).map(s=>`
      <div class="svc"><div><h3>${s.name}</h3><span class="meta">Approx. ${dur(s.mins)}</span></div>
        <span class="price">${fmt(s.price)}</span><p>${s.desc}</p>
        <button type="button" class="tlink go" data-book="${s.id}">Book this</button></div>`).join("")}
      ${c.id==="lash"?`<div class="svc"><div><h3>Add-ons</h3><span class="meta">With lash lift or lamination</span></div><span></span><p>Brow tint +50 AED · Brow tint and lash tint +80 AED</p></div>`:""}
    </div>
  </div>`).join("");

const plGroups = [["Skin",["ph-peel","ph-peel-plus","circadia","oxygen","biorepeel","nuqy"]],["Microneedling",["mn-salmon","mn-exo","mn-stem","mn-biorepeel"]],["Permanent makeup",["lip-blush","brows","top-up"]],["Lash & brow",["lash-lift","brow-lam"]]];
$("#plRoot").innerHTML = plGroups.map(([t,ids])=>`<div class="pl-group"><h3>${t}</h3>${ids.map(id=>{const s=SERVICES.find(x=>x.id===id);
  return `<div class="pl-row"><span class="n">${s.name}${s.mins===60&&s.cat==="skin"?"<small>60 minutes</small>":""}</span><span class="dots"></span><span class="p">${fmt(s.price)}</span></div>`}).join("")}
  ${t==="Lash & brow"?Object.values(ADDONS).map(a=>`<div class="pl-row pl-sub"><span class="n">Add-on: ${a.name}</span><span class="dots"></span><span class="p">${fmt(a.price)}</span></div>`).join(""):""}</div>`).join("");

/* ---------- calendar ---------- */
function Calendar(root, {slotsFor, onChange}){
  const today = new Date(); today.setHours(0,0,0,0);
  const last = new Date(today); last.setDate(last.getDate()+CONFIG.daysAhead);
  let view, sel=null, time=null;
  function jumpToFirst(){ let f=today; for(let d=new Date(today); d<=last; d.setDate(d.getDate()+1)) if(slotsFor(new Date(d)).length){ f=new Date(d); break; } view=new Date(f.getFullYear(), f.getMonth(), 1); }
  jumpToFirst();
  root.innerHTML = `<div class="cal"><div><div class="cal-head"><button type="button" data-m="-1" aria-label="Previous month">‹</button><strong></strong><button type="button" data-m="1" aria-label="Next month">›</button></div><div class="days"></div></div>
    <div><p class="eyebrow" style="margin-bottom:12px" data-lbl>Select a date</p><div class="slots"></div></div></div>`;
  const head=$("strong",root), days=$(".days",root), slots=$(".slots",root), lbl=$("[data-lbl]",root);
  $$("[data-m]",root).forEach(b=>b.onclick=()=>{view.setMonth(view.getMonth()+Number(b.dataset.m)); draw();});
  function draw(){
    head.textContent = view.toLocaleDateString("en-GB",{month:"long",year:"numeric"});
    $("[data-m='-1']",root).disabled = view <= new Date(today.getFullYear(),today.getMonth(),1);
    $("[data-m='1']",root).disabled = new Date(view.getFullYear(),view.getMonth()+1,1) > last;
    const lead=(view.getDay()+6)%7, n=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
    let h=["Mo","Tu","We","Th","Fr","Sa","Su"].map(d=>`<span class="dow">${d}</span>`).join("")+"<span></span>".repeat(lead);
    for(let i=1;i<=n;i++){
      const d=new Date(view.getFullYear(),view.getMonth(),i);
      const off=d<today||d>last||slotsFor(d).length===0;
      h+=`<button type="button" class="${sel&&+d===+sel?"sel":""} ${+d===+today?"today":""}" data-d="${+d}" ${off?"disabled":""} aria-label="${dateLong(d)}">${i}</button>`;
    }
    days.innerHTML=h;
    $$("button",days).forEach(b=>b.onclick=()=>{sel=new Date(+b.dataset.d); time=null; draw(); onChange(sel,time);});
    drawSlots();
  }
  function drawSlots(){
    if(!sel){ lbl.textContent="Select a date"; slots.innerHTML=`<p class="empty">Available times appear here.</p>`; return; }
    lbl.textContent=sel.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"});
    const list=slotsFor(sel);
    slots.innerHTML=list.length?list.map(t=>`<button type="button" class="${t===time?"sel":""}">${t}</button>`).join(""):`<p class="empty">No times left this day.</p>`;
    $$("button",slots).forEach(b=>b.onclick=()=>{time=b.textContent; drawSlots(); onChange(sel,time);});
  }
  draw();
  return { reset(){sel=null;time=null;jumpToFirst();draw();}, redraw(){ if(sel && !slotsFor(sel).includes(time)) time=null; draw(); onChange(sel,time);} };
}
function daySlots(d, minutes){
  if(!CONFIG.openDays.includes(d.getDay())) return [];
  const out=[], now=new Date();
  for(let m=toMin(CONFIG.open); m+minutes<=toMin(CONFIG.close); m+=30){ const s=new Date(d); s.setHours(0,m,0,0); if(s-now>2*3600e3) out.push(toT(m)); }
  return out;
}

/* ---------- booking ---------- */
const bk={svc:null,addons:[],date:null,time:null,step:0};
$("#bkServices").innerHTML = CATS.map(c=>`<div class="opt-group"><p class="eyebrow">${c.title}</p>${SERVICES.filter(s=>s.cat===c.id).map(s=>
  `<label class="opt"><input type="radio" name="bk-svc" id="svc-${s.id}" value="${s.id}"><span class="n">${s.name}<small>Approx. ${dur(s.mins)}</small></span><span class="p">${fmt(s.price)}</span></label>`).join("")}</div>`).join("");
const bkCal = Calendar($("#bkCal"), {slotsFor:d=>daySlots(d, bk.svc?bk.svc.mins:60), onChange:(d,t)=>{bk.date=d; bk.time=t; bkRender();}});
$$("[name=bk-svc]").forEach(r=>r.addEventListener("change",()=>{
  bk.svc=SERVICES.find(s=>s.id===r.value);
  const lash=bk.svc.cat==="lash"; $("#bkAddons").hidden=!lash;
  if(!lash){ $$("#bkAddons input").forEach(i=>i.checked=false); bk.addons=[]; }
  bkCal.redraw(); bkRender();
}));
$$("#bkAddons input").forEach(i=>i.addEventListener("change",()=>{
  if(i.checked) $$("#bkAddons input").forEach(o=>{ if(o!==i) o.checked=false; });
  bk.addons=$$("#bkAddons input").filter(x=>x.checked).map(x=>x.value); bkRender();
}));
const bkTotal=()=>bk.svc?bk.svc.price+bk.addons.reduce((a,k)=>a+ADDONS[k].price,0):0;
const bkDeposit=()=>bk.svc?CONFIG.deposits[depKey(bk.svc)]:0;
function bkRender(){
  $$("#bkSteps li").forEach((li,i)=>li.className=i<bk.step?"done":i===bk.step?"cur":"");
  $$("#bookForm .step").forEach(s=>s.classList.toggle("on",Number(s.dataset.step)===bk.step));
  $("#bkSteps").hidden = bk.step===4;
  const rows=[["Treatment",bk.svc?bk.svc.name:"Not chosen"]];
  bk.addons.forEach(k=>rows.push(["Add-on",ADDONS[k].name]));
  rows.push(["Date",bk.date?bk.date.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"}):"—"],["Time",bk.time||"—"]);
  if(bk.svc) rows.push(["Duration","Approx. "+dur(bk.svc.mins)]);
  rows.push(["Total",bk.svc?fmt(bkTotal()):"—"]);
  let h=rows.map(([a,b])=>`<div class="sum-row"><span>${a}</span><span>${b}</span></div>`).join("");
  if(bk.svc) h+=`<div class="sum-row big"><span>Deposit${bk.step===4?" paid":" today"}</span><span>${fmt(bkDeposit())}</span></div><div class="sum-row"><span>Balance on the day</span><span>${fmt(bkTotal()-bkDeposit())}</span></div>`;
  $("#bkSummary").innerHTML=h;
  $("[data-step='0'] [data-next]").disabled=!bk.svc;
  $("[data-step='1'] [data-next]").disabled=!(bk.date&&bk.time);
  if(bk.step===3){
    const link=CONFIG.paymentLinks[depKey(bk.svc)];
    $("#payAmt").textContent=fmt(bkDeposit());
    $("#payNote").textContent=`Deducted from your ${fmt(bkTotal())} total. Balance of ${fmt(bkTotal()-bkDeposit())} is paid on the day.`;
    $("#payBtn").href=link||"#"; $("#payPreview").hidden=!!link;
    $("#payBtn").onclick = link ? null : e=>{ e.preventDefault(); $("#bk-paid").checked=true; syncPaid(); };
    syncPaid();
  }
}
function syncPaid(){ const p=$("#bk-paid").checked; $("#bkConfirm").disabled=!p; $("#paidOk").hidden=!p; }
$("#bk-paid").addEventListener("change",syncPaid);
$$("#bookForm [data-next]").forEach(b=>b.onclick=()=>{
  if(bk.step===2){
    const n=$("#bk-name").value.trim(), p=$("#bk-phone").value.trim(), e=$("#bk-email").value.trim();
    let err="";
    if(!n) err="Please add your name.";
    else if(p.replace(/\D/g,"").length<8) err="Please add a mobile number so we can confirm your booking.";
    else if(!emailOk(e)) err="Please check your email address, for example name@email.com.";
    else if(!$("#bk-policy").checked) err="Please tick to agree to the booking policy.";
    $("#bkErr").textContent=err; if(err) return;
  }
  bk.step++; bkRender(); $("#bookForm").scrollIntoView({behavior:"smooth",block:"start"});
});
$$("#bookForm [data-prev]").forEach(b=>b.onclick=()=>{bk.step--; bkRender();});
$("#bkConfirm").onclick=()=>{
  const r=ref(), n=$("#bk-name").value.trim();
  $("#bkRef").textContent=r;
  $("#bkDoneText").textContent=`${n}, your ${bk.svc.name} on ${dateLong(bk.date)} at ${bk.time} is requested and your ${fmt(bkDeposit())} deposit is noted.`;
  $("#bkWa").href=waLink([`New booking ${r}`,`Name: ${n}`,`Phone: ${$("#bk-phone").value.trim()}`,`Email: ${$("#bk-email").value.trim()}`,
    `Treatment: ${bk.svc.name}${bk.addons.length?" + "+bk.addons.map(k=>ADDONS[k].name).join(", "):""}`,`Date: ${dateLong(bk.date)} at ${bk.time}`,
    `Total: ${fmt(bkTotal())}`,`Deposit paid: ${fmt(bkDeposit())}`,`Client: ${$("#bk-first").value}`,$("#bk-notes").value.trim()?`Notes: ${$("#bk-notes").value.trim()}`:""].filter(Boolean).join("\n"));
  bk.step=4; bkRender(); $("#bookForm").scrollIntoView({behavior:"smooth",block:"start"});
};
$("#bkAgain").onclick=()=>{ Object.assign(bk,{svc:null,addons:[],date:null,time:null,step:0}); $("#bookForm").reset(); $("#bkAddons").hidden=true; bkCal.reset(); bkRender(); };
$("#bookForm").addEventListener("submit",e=>e.preventDefault());
bkRender();

/* ---------- consultation ---------- */
const cs={date:null,time:null};
const consultSlots=d=>{const now=new Date(); return CONFIG.consultTimes.filter(t=>{const s=new Date(d); s.setHours(0,toMin(t),0,0); return s-now>3600e3;});};
Calendar($("#csCal"),{slotsFor:consultSlots,onChange:(d,t)=>{cs.date=d;cs.time=t;csRender();}});
const csType=()=>$("[name=cs-type]:checked").value;
function csRender(){
  $("#csSummary").innerHTML=[["Type",csType()],["Length","20 minutes"],["Date",cs.date?cs.date.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"}):"—"],["Time",cs.time||"—"]]
    .map(([a,b])=>`<div class="sum-row"><span>${a}</span><span>${b}</span></div>`).join("") + `<div class="sum-row big"><span>Price</span><span>Free</span></div>`;
}
$$("[name=cs-type]").forEach(r=>r.addEventListener("change",csRender)); csRender();
$("#csForm").addEventListener("submit",e=>{
  e.preventDefault();
  const n=$("#cs-name").value.trim(), p=$("#cs-phone-n").value.trim(), em=$("#cs-email").value.trim();
  let err="";
  if(!cs.date||!cs.time) err="Please pick a date and time for your call.";
  else if(!n) err="Please add your name.";
  else if(p.replace(/\D/g,"").length<8) err="Please add a number we can call or WhatsApp.";
  else if(em&&!emailOk(em)) err="Please check your email address.";
  $("#csErr").textContent=err; if(err) return;
  const r=ref(); $("#csRef").textContent=r;
  $("#csDoneText").textContent=`${n}, your free ${csType().toLowerCase()} is requested for ${dateLong(cs.date)} at ${cs.time}.`;
  $("#csWa").href=waLink([`Free consultation ${r}`,`Type: ${csType()} (20 min)`,`Name: ${n}`,`Phone: ${p}`,em?`Email: ${em}`:"",`When: ${dateLong(cs.date)} at ${cs.time}`,`Interested in: ${$("#cs-topic").value}`,$("#cs-msg").value.trim()?`Concerns: ${$("#cs-msg").value.trim()}`:""].filter(Boolean).join("\n"));
  $("#csMain").classList.remove("on"); $("#csDone").classList.add("on");
});

/* ---------- contact ---------- */
$("#ctForm").addEventListener("submit",e=>{
  e.preventDefault();
  const n=$("#ct-name").value.trim(), em=$("#ct-email").value.trim(), m=$("#ct-msg").value.trim(), p=$("#ct-phone").value.trim();
  let err="";
  if(!n) err="Please add your name.";
  else if(!emailOk(em)&&p.replace(/\D/g,"").length<8) err="Please add an email or phone number so I can reply.";
  else if(!m) err="Please write your message.";
  $("#ctErr").textContent=err; if(err) return;
  $("#ctWho").textContent=n.split(" ")[0];
  $("#ctWa").href=waLink([`Website message: ${$("#ct-subject").value}`,`From: ${n}`,p?`Phone: ${p}`:"",em?`Email: ${em}`:"","",m].join("\n"));
  $("#ctMain").classList.remove("on"); $("#ctDone").classList.add("on");
});
$("#ctAgain").onclick=()=>{$("#ctForm").reset(); $("#ctDone").classList.remove("on"); $("#ctMain").classList.add("on");};

/* ---------- routing ---------- */
const VIEWS=["home","about","treatments","new","prices","book","consult","contact"];
let pendingJump=null;
function route(){
  const h=location.hash.slice(1), v=VIEWS.includes(h)?h:"home";
  $$("section.view").forEach(s=>s.classList.toggle("on",s.dataset.view===v));
  $$("nav.main a").forEach(a=>{ if(a.getAttribute("href")==="#"+v) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  $("#top").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded","false");
  if(pendingJump){ const el=document.getElementById(pendingJump); pendingJump=null; if(el) setTimeout(()=>el.scrollIntoView({block:"start"}),40); }
  else window.scrollTo(0,0);
}
addEventListener("hashchange",route);
$$("[data-jump]").forEach(a=>a.addEventListener("click",()=>pendingJump=a.dataset.jump));
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-book]"); if(!b) return;
  const r=$("#svc-"+b.dataset.book); r.checked=true; r.dispatchEvent(new Event("change"));
  bk.step=0; bkRender();
  if(location.hash==="#book") route(); else location.hash="book";
});
$("#menuBtn").onclick=()=>{const o=$("#top").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded",String(o));};
route();
