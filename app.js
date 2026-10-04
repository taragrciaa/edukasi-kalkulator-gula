const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const TABS=[['faktapedia','🏠','Faktapedia'],['kalkulator','🧮','Kalkulator'],['lens','📸','Gula Lens'],['kuliner','🍱','Kuliner'],['hydration','💧','Hidrasi']];
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};

/* ---------- Navigasi ---------- */
const navHTML=TABS.map(([id,i,l])=>`<button class="nb" data-t="${id}"><span>${i}</span>${l}</button>`).join('');
$('#dnav').innerHTML=navHTML;$('#bnav').innerHTML=navHTML;
function go(id){if(!TABS.some(t=>t[0]===id))id='faktapedia';$$('.tab').forEach(t=>t.classList.toggle('active',t.id===id));$$('.nb').forEach(b=>b.classList.toggle('on',b.dataset.t===id));scrollTo({top:0,behavior:'smooth'});history.replaceState(null,'','#'+id)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(b)go(b.dataset.t)});

/* ---------- Faktapedia ---------- */
const FACTS=[['🧋','1 gelas boba hits ≈ 9 sdt gula','Boba brown sugar 500 ml bisa berisi ±36 g gula, hampir batas harian 50 g.'],
['🥤','Soda kaleng = 9 sdt','Satu kaleng 330 ml berisi ±35 g gula, tanpa serat dan tanpa rasa kenyang.'],
['⚡','Energy crash','Gula tinggi bikin glukosa melonjak lalu jatuh: ngantuk, lemas, dan pengin ngemil lagi.'],
['🧬','Diabetes usia muda','Diabetes tipe 2 kini makin sering muncul di usia 20-an karena minuman manis harian.'],
['🌸','PCOS & hormon','Resistensi insulin memperburuk PCOS: siklus tak teratur dan jerawat hormonal.'],
['👵','Skin aging','Gula berlebih memicu glikasi yang merusak kolagen, kulit jadi kusam dan keriput dini.'],
['🫀','Fatty liver','Fruktosa berlebih diubah hati menjadi lemak, bahkan pada orang bertubuh kurus.'],
['📏','Aturan 4 sdm','Kemenkes RI: gula, garam, lemak (GGL) maksimal 50 g gula atau 4 sdm per hari.']];
$('#cards').innerHTML=FACTS.map(([e,t,b])=>`<div class="flip" tabindex="0" role="button"><div class="fi"><div class="fa c"><span class="emo">${e}</span><b>${t}</b></div><div class="fb c">${b}</div></div></div>`).join('');
$('#cards').addEventListener('click',e=>{const f=e.target.closest('.flip');if(f)f.classList.toggle('f')});
$('#cards').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.target.closest('.flip')?.classList.toggle('f')}});
$('#danger').innerHTML=[['🩸','Diabetes muda'],['🌸','PCOS'],['👵','Kulit menua'],['😴','Energy crash'],['🫀','Fatty liver']].map(([e,t])=>`<div class="c dg"><span class="emo">${e}</span><b>${t}</b></div>`).join('');
$('#myths').innerHTML=[['Pemanis buatan pasti sehat.','Rendah kalori, tapi tidak otomatis sehat. Tetap batasi supaya selera manis tidak naik.'],
['Gula aren jauh lebih sehat dari gula putih.','Kandungan gulanya sama-sama sukrosa. Gula aren hanya sedikit lebih kaya mineral, tetap hitung sebagai gula.'],
['Jus buah botolan = sehat.','Jus yang ditambah gula tetap tinggi gula dan minim serat. Pilih buah utuh.'],
['Gula bikin hiper.','Tidak ada bukti kuat, tetapi lonjakan lalu turunnya gula memang bikin mood naik-turun.']].map(([m,f])=>`<div class="c my"><s>Mitos: ${m}</s><br><b>Fakta:</b> ${f}</div>`).join('');
$('#hacks').innerHTML=[['🍓','Ganti ke buah segar'],['🧊','Es teh less sugar 25%'],['💧','Minum air dulu 10 menit'],['🥜','Camilan kacang tanpa gula']].map(([e,t])=>`<div class="c dg"><span class="emo">${e}</span><b>${t}</b></div>`).join('');

/* ---------- Helper gula & aktivitas ---------- */
const lvl=g=>g<10?['g','Aman','🟢']:g<25?['y','Sedang','🟡']:['r','Tinggi Gula','🔴'];
const sdt=g=>String(+(g/4).toFixed(1));
const RATES=[['🏃‍♂️','Joging santai',10],['🚶‍♀️','Jalan cepat',4.5],['🚴‍♂️','Bersepeda',7.5],['🧘‍♀️','Skipping',12]];
const burnHTML=k=>`<div class="burn">${RATES.map(([i,n,r])=>`<div class="b"><big>${i}</big><b>${Math.max(5,Math.round(k/r))} menit</b><small>${n}</small></div>`).join('')}</div><small class="muted">Estimasi untuk berat badan ±60 kg.</small>`;
const waterAdvice=g=>`💧 Disarankan minum +${Math.min(4,Math.max(1,Math.ceil(g/12)))} gelas air putih ekstra untuk bantu metabolisme.`;
function resultHTML(n,g,k,note){const[c,l,d]=lvl(g);return`<div class="c pad"><h3>${n}</h3><span class="badge ${c}">${d} ${l}</span><div class="nums"><div><b>${g} g</b>gula</div><div><b>${sdt(g)} 🍵</b>sdt</div><div><b>${k}</b>kkal</div></div><p>${g>=25?'Satu porsi ini sudah melewati separuh batas harianmu.':g>=10?'Boleh sesekali, imbangi dengan gerak.':'Relatif aman, tetap jaga porsi.'}</p><h4>🔥 Cara membakarnya</h4>${burnHTML(k)}<p>${waterAdvice(g)}</p>${note?`<small class="muted">${note}</small>`:''}</div>`}

/* ---------- Kalkulator ---------- */
$('#cf').onsubmit=e=>{e.preventDefault();const a=+$('#age').value,w=+$('#wt').value,m=$('#sex').value==='m',f=+$('#act').value;
const kcal=Math.round(w*(m?24:22)*f*(a>50?.92:1)),lim=kcal*.1,g=Math.min(50,Math.round(lim/4));
$('#cr').innerHTML=`<div class="c pad"><h3>Batas gula amanmu</h3><div class="nums"><div><b>${g} g</b>gram</div><div><b>${sdt(g)} 🍵</b>sdt</div><div><b>10%</b>kalori harian</div></div><p>Kebutuhan energi ±${kcal} kkal/hari, jadi gula tambahan maksimal ±${Math.round(lim)} kkal (10%). Idealnya turun ke 5% untuk manfaat kesehatan lebih besar.</p><p>${g>=50?'Batas umum Kemenkes/WHO dipakai: 50 g (4 sdm).':'Angka dibatasi sesuai kebutuhan energimu.'}</p></div>`};

/* ---------- Database Kuliner ---------- */
const F=[['🍡','Klepon (5 pcs)','Tradisional',150,12],['🥤','Es Cendol / Dawet','Tradisional',230,28],['🍌','Kolak Pisang','Tradisional',250,30],['🧁','Bika Ambon (1 potong)','Tradisional',200,18],
['🥞','Martabak Manis (1 slice)','Tradisional',330,28],['🍥','Putu Mayang','Tradisional',180,15],['🍙','Kue Lupis','Tradisional',190,17],['🍧','Es Doger','Tradisional',280,32],
['🥥','Es Teler','Tradisional',300,35],['🥞','Kue Serabi','Tradisional',200,14],['🍬','Dodol (4 pcs)','Tradisional',180,22],['🍌','Nagasari (2 pcs)','Tradisional',160,12],
['🧊','Es Teh Solo Manis 500ml','Kaki Lima',120,30],['🧋','Es Boba Brown Sugar 500ml','Kaki Lima',420,42],['🥤','Pop Ice Rasa-Rasa','Kaki Lima',220,32],['🌽','Jasuke (Jagung Susu Keju)','Kaki Lima',270,16],
['🍢','Sempol + Saos','Kaki Lima',220,3],['🥟','Batagor','Kaki Lima',330,5],['🍳','Martabak Telur','Kaki Lima',400,3],['🍵','Es Cincau','Kaki Lima',150,24],
['🍨','Es Pisang Ijo','Kaki Lima',320,30],['🥑','Alpukat Kocok','Kaki Lima',380,34],
['☕','Kopi Botolan Kemasan','Kemasan',180,24],['🥫','Soda Kaleng 330ml','Kemasan',140,35],['🥛','Milkshake Botolan','Kemasan',220,30],['🍪','Biskuit Sandwich Cokelat (3 pcs)','Kemasan',140,10],
['🧃','Susu UHT Rasa 200ml','Kemasan',130,18],['⚡','Minuman Isotonik 500ml','Kemasan',125,26],['🫖','RTD Milk Tea 350ml','Kemasan',190,32],['🍫','Wafer Cokelat (2 pcs)','Kemasan',130,10]];
let cat='Semua';
const CATS=['Semua','Tradisional','Kaki Lima','Kemasan'];
function renderPills(){$('#pills').innerHTML=CATS.map(c=>`<button class="pill ${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('')}
function renderFoods(){const q=$('#q').value.trim().toLowerCase();
const rows=F.map((f,i)=>[f,i]).filter(([f])=>(cat==='Semua'||f[2]===cat)&&f[1].toLowerCase().includes(q));
$('#fg').innerHTML=rows.length?rows.map(([f,i])=>{const[c,l]=lvl(f[4]);return`<div class="c fc" data-i="${i}" tabindex="0" role="button"><span class="emo">${f[0]}</span><b>${f[1]}</b><small>${f[3]} kkal · ${f[4]} g (${sdt(f[4])} 🍵)</small><br><span class="badge ${c}">${l}</span></div>`}).join(''):'<p class="c pad">Tidak ketemu. Coba kata lain atau pakai Gula Lens untuk foto makananmu.</p>'}
$('#pills').addEventListener('click',e=>{const b=e.target.closest('.pill');if(b){cat=b.dataset.c;renderPills();renderFoods()}});
$('#q').addEventListener('input',renderFoods);
function openFood(e){const c=e.target.closest('.fc');if(!c)return;const f=F[c.dataset.i];$('#mb').innerHTML=`<div style="text-align:center"><span class="emo">${f[0]}</span></div>`+resultHTML(f[1],f[4],f[3],'Nilai gizi perkiraan per porsi umum.');$('#modal').hidden=false}
$('#fg').addEventListener('click',openFood);
$('#fg').addEventListener('keydown',e=>{if(e.key==='Enter')openFood(e)});
$('#mx').onclick=()=>$('#modal').hidden=true;
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')$('#modal').hidden=true});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#modal').hidden=true});
renderPills();renderFoods();

/* ---------- Gula Lens ---------- */
let img=null;
$('#key').value=ls.get('gkey')||'';$('#key').onchange=e=>ls.set('gkey',e.target.value.trim());
function handleFile(f){if(!f||!f.type.startsWith('image/'))return;const r=new FileReader();
r.onload=()=>{img=r.result;$('#prev').src=img;$('#pw').hidden=false;$('#pw').classList.add('scan');$('#lr').innerHTML='<p class="c pad">🔍 Menganalisis fotomu…</p>';setTimeout(analyze,2200)};r.readAsDataURL(f)}
$('#gal').onchange=e=>handleFile(e.target.files[0]);$('#cam').onchange=e=>handleFile(e.target.files[0]);
['dragover','dragenter'].forEach(v=>$('#drop').addEventListener(v,e=>{e.preventDefault();$('#drop').classList.add('on')}));
['dragleave','drop'].forEach(v=>$('#drop').addEventListener(v,e=>{e.preventDefault();$('#drop').classList.remove('on')}));
$('#drop').addEventListener('drop',e=>handleFile(e.dataTransfer.files[0]));
async function gemini(key){const mime=img.slice(5,img.indexOf(';'));
const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`,{method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({contents:[{parts:[{text:'Identifikasi makanan/minuman pada foto (konteks Indonesia). Balas HANYA JSON: {"nama":"","gula_g":0,"kalori":0} untuk satu porsi.'},{inline_data:{mime_type:mime,data:img.split(',')[1]}}]}]})});
if(!r.ok)throw new Error('API '+r.status);const j=await r.json();const o=JSON.parse(j.candidates[0].content.parts[0].text.match(/\{[\s\S]*\}/)[0]);
return{n:o.nama,g:Math.round(+o.gula_g),k:Math.round(+o.kalori),note:'Dianalisis Gemini Vision. Ini estimasi, bukan hasil lab.'}}
const sim=()=>new Promise(ok=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=24;const x=c.getContext('2d');x.drawImage(im,0,0,24,24);const d=x.getImageData(0,0,24,24).data;
let R=0,G=0,B=0,S=0;const n=576;for(let i=0;i<d.length;i+=4){R+=d[i];G+=d[i+1];B+=d[i+2];S+=Math.max(d[i],d[i+1],d[i+2])-Math.min(d[i],d[i+1],d[i+2])}
R/=n;G/=n;B/=n;S/=n*255;const br=(R+G+B)/765,warm=(R-B)/255;
const g=Math.round(Math.min(60,Math.max(3,6+S*45+Math.max(0,warm)*20-br*5))),k=Math.round(g*7+60+S*80);
const nm=R>G&&R>B?(br<.4?'Makanan/minuman cokelat':'Hidangan manis hangat'):G>R&&G>B?'Hidangan hijau (cendol/sayur)':'Minuman dingin/kemasan';
ok({n:nm,g,k,note:'Mode simulator (demo): estimasi dari warna foto. Isi Gemini API Key untuk analisis nyata.'})};im.src=img});
async function analyze(){const key=$('#key').value.trim();let r;
try{r=key?await gemini(key):await sim()}catch(e){r=await sim();r.note='API gagal ('+e.message+'), memakai simulator.'}
$('#pw').classList.remove('scan');$('#lr').innerHTML=resultHTML(r.n,r.g,r.k,r.note)}

/* ---------- Hydration ---------- */
const today=new Date().toDateString();
let H;try{H=JSON.parse(ls.get('gg_h'))}catch(e){}
if(!H||H.d!==today)H={d:today,ml:0,w:+(H&&H.w)||55};
const target=()=>Math.round(H.w*35/50)*50;
function renderH(){const t=target(),p=Math.min(100,Math.round(H.ml/t*100));$('#hw').value=H.w;$('#water').style.height=p+'%';$('#pct').textContent=p+'%';
$('#ht').innerHTML=`Target: <b>${t} ml</b> (±${Math.ceil(t/250)} gelas)<br>Terminum: <b>${H.ml} ml</b>${H.ml>=t?'<br>🎉 Target hari ini tercapai!':''}`;ls.set('gg_h',JSON.stringify(H))}
$('#gb').innerHTML=[['Kecil',200],['Sedang',300],['Besar',500]].map(([n,v])=>`<button data-ml="${v}"><svg viewBox="0 0 40 60" width="${20+v/20}" height="${26+v/10}"><path d="M5 4h30l-4 52H9z" fill="#c4f1ff" stroke="#22d3ee" stroke-width="3" stroke-linejoin="round"/><path d="M8 28h24l-1.5 28H9.5z" fill="#22d3ee" opacity=".7"/></svg><br>${n}<br><small>~${v} ml</small></button>`).join('');
function confetti(){for(let i=0;i<36;i++){const s=document.createElement('span');s.className='conf';s.textContent=['🎉','💧','✨','💖','🫧'][i%5];s.style.left=Math.random()*100+'vw';s.style.animationDelay=Math.random()*.8+'s';document.body.append(s);setTimeout(()=>s.remove(),3500)}}
$('#gb').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const before=H.ml>=target();H.ml+=+b.dataset.ml;renderH();if(!before&&H.ml>=target())confetti()});
$('#hw').onchange=e=>{H.w=Math.min(200,Math.max(25,+e.target.value||55));renderH()};
$('#hr').onclick=()=>{H.ml=0;renderH()};
renderH();

go(location.hash.slice(1)||'faktapedia');
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
  
