(function(){
const L=[['index.html','Ana Sayfa','Home'],['faaliyetler.html','Faaliyetler','Activities'],['filo.html','Filomuz','Fleet'],['galeri.html','Galeri','Gallery'],['sss.html','SSS','FAQ'],['ekip.html','Ekip','Team'],['#iletisim','İletişim','Contact']];
const page=location.pathname.split('/').pop()||'index.html';
const nav=L.map(([h,t,e])=>`<li><a href="${h}" data-tr="${t}" data-en="${e}"${h===page?' aria-current="page"':''}>${t}</a></li>`).join('');
document.getElementById('site-header').innerHTML=`<header><div class="wrap bar"><a href="index.html" aria-label="BİLSAS"><img src="bilsas_logo_darkmode.png" alt="BİLSAS"></a>
<nav id="nav"><ul>${nav}</ul></nav>
<div class="ctl"><button id="lang" aria-label="Language / Dil">EN</button><button id="theme" aria-label="Tema / Theme">◐</button><button class="burger" id="burger" aria-label="Menü" aria-expanded="false">☰</button></div></div></header>`;
document.getElementById('site-footer').innerHTML=`<footer id="iletisim"><div class="wrap">
<div><h2 data-tr="Bizimle tanışın" data-en="Get in touch">Bizimle tanışın</h2>
<p data-tr="BİLSAS ailesine katılmak veya projelerimize destek olmak için bize yazın." data-en="Write to us to join the BİLSAS family or support our projects.">BİLSAS ailesine katılmak veya projelerimize destek olmak için bize yazın.</p></div>
<ul class="links"><li><a href="mailto:info@bilkentsas.com">info@bilkentsas.com</a></li><li><a href="https://instagram.com/bilkentsas" target="_blank" rel="noopener">Instagram: @bilkentsas</a></li><li><a href="https://www.linkedin.com/company/bilsas/" target="_blank" rel="noopener">LinkedIn: BİLSAS</a></li></ul>
<div class="copy"><span data-tr="© 2026 BİLSAS, Bilkent Uzay ve Havacılık Kulübü" data-en="© 2026 BİLSAS, Bilkent Space and Aviation Club">© 2026 BİLSAS, Bilkent Uzay ve Havacılık Kulübü</span><button id="qr-open" data-tr="QR kodu göster" data-en="Show QR code">QR kodu göster</button></div></div></footer>
<dialog id="qr"><h3 data-tr="BİLSAS QR Kod" data-en="BİLSAS QR Code">BİLSAS QR Kod</h3><img src="qrcode.jpg" alt="BİLSAS QR" width="240"><button id="qr-close" data-tr="Kapat" data-en="Close">Kapat</button></dialog>`;
const root=document.documentElement,get=k=>{try{return localStorage.getItem(k)}catch(e){return null}},set=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
root.dataset.theme=get('theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
document.getElementById('theme').onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';set('theme',root.dataset.theme)};
function setLang(l){root.lang=l;set('lang',l);document.querySelectorAll('[data-tr]').forEach(e=>e.innerHTML=e.dataset[l]);document.getElementById('lang').textContent=l==='tr'?'EN':'TR';const t=document.querySelector('title');if(t&&t.dataset[l])t.textContent=t.dataset[l];document.dispatchEvent(new CustomEvent('langchange',{detail:l}))}
window.getLang=()=>root.lang;
document.getElementById('lang').onclick=()=>setLang(root.lang==='tr'?'en':'tr');
setLang(get('lang')||'tr');
const b=document.getElementById('burger'),n=document.getElementById('nav');
b.onclick=()=>b.setAttribute('aria-expanded',n.classList.toggle('open'));
n.onclick=e=>{if(e.target.closest('a')){n.classList.remove('open');b.setAttribute('aria-expanded','false')}};
const q=document.getElementById('qr');
document.getElementById('qr-open').onclick=()=>q.showModal();
document.getElementById('qr-close').onclick=()=>q.close();
q.onclick=e=>{if(e.target===q)q.close()};
})();

/* easter egg: "bilsas" yaz (masaüstü) veya alt bilgideki telif yazısına 5 kez hızlı dokun (mobil) */
(function(){
const T={tr:['3','2','1','KALKIŞ!','Kalkış başarılı!','BİLSAS ile gökyüzüne.'],en:['3','2','1','LIFTOFF!','Liftoff!','To the sky with BİLSAS.']};
const RM=matchMedia('(prefers-reduced-motion:reduce)'),sleep=ms=>new Promise(r=>setTimeout(r,ms));
let busy=false,buf='';
function letters(max){
 const nodes=[],pick=[];
 const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 while(w.nextNode())nodes.push(w.currentNode);
 let total=0;
 for(const n of nodes){
  const p=n.parentElement;
  if(!n.nodeValue.trim()||!p||p.closest('script,style,dialog,#egg'))continue;
  const r=p.getBoundingClientRect();
  if((!r.width&&!r.height)||r.bottom<0||r.top>innerHeight)continue;
  pick.push(n);total+=n.nodeValue.replace(/\s/g,'').length;
 }
 const prob=Math.min(1,max/total),spans=[],undo=[];
 for(const n of pick){
  const wrap=document.createElement('span');
  for(const part of n.nodeValue.split(/(\s+)/)){
   if(!part||/^\s/.test(part)){wrap.append(part);continue}
   const word=document.createElement('span'),mine=[];
   for(const ch of part){
    if(Math.random()>prob){word.append(ch);continue}
    const s=document.createElement('span');s.className='eg-c';s.textContent=ch;word.append(s);mine.push(s);
   }
   if(mine.length){word.className='eg-w';wrap.append(word);spans.push(...mine)}else wrap.append(part);
  }
  n.replaceWith(wrap);undo.push(()=>wrap.replaceWith(n));
 }
 const rects=spans.map(s=>s.getBoundingClientRect());
 const plan=spans.map((s,i)=>{
  const dy=Math.max(0,innerHeight-rects[i].bottom-Math.random()*50);
  return{s,dy,dx:(Math.random()-.5)*60,rot:(Math.random()-.5)*360};
 });
 return{plan,restore:()=>undo.forEach(f=>f())};
}
function fall(plan){
 plan.forEach(({s,dy,dx,rot})=>s.animate([{transform:'none'},{transform:`translate(${dx}px,${dy}px) rotate(${rot}deg)`}],{duration:600+dy*.8,delay:Math.random()*1200,easing:'cubic-bezier(.55,0,1,.5)',fill:'forwards'}));
}
async function run(){
 if(busy)return;busy=true;
 const t=T[document.documentElement.lang==='en'?'en':'tr'],de=document.documentElement;
 const egg=document.createElement('div');egg.id='egg';egg.setAttribute('aria-hidden','true');
 egg.innerHTML='<div class="cnt"></div><div class="msg"><div></div><small></small></div><div class="rk"><span class="r">🚀</span><div class="fl"></div></div>';
 document.body.append(egg);requestAnimationFrame(()=>egg.classList.add('on'));
 de.style.overflow='hidden';
 const cnt=egg.querySelector('.cnt'),rk=egg.querySelector('.rk'),msg=egg.querySelector('.msg');
 msg.firstChild.textContent=t[4];msg.querySelector('small').textContent=t[5];
 const els=[...document.querySelectorAll('header,main,footer')];
 const shake=(on,hard)=>els.forEach(e=>{e.classList.toggle('egg-shake',on);e.classList.toggle('hard',!!hard)});
 const pop=txt=>{cnt.textContent=txt;cnt.classList.remove('pop');void cnt.offsetWidth;cnt.classList.add('pop')};
 let f=null;
 if(RM.matches){
  msg.classList.add('on');await sleep(2800);
 }else{
  for(let i=0;i<3;i++){pop(t[i]);if(i>0)shake(true);if(i===0){await sleep(120);f=letters(400);await sleep(830)}else await sleep(950)}
  pop(t[3]);rk.classList.add('go');shake(true,true);
  await sleep(450);fall(f.plan);
  await sleep(1600);msg.classList.add('on');
  await sleep(1400);shake(false);
  await sleep(2600);
 }
 msg.classList.remove('on');egg.classList.remove('on');
 await sleep(700);
 if(f)f.restore();
 egg.remove();de.style.overflow='';busy=false;
}
document.addEventListener('keydown',e=>{
 if(e.ctrlKey||e.metaKey||e.altKey||(e.target.closest&&e.target.closest('input,textarea,[contenteditable]')))return;
 if(e.key.length!==1)return;
 buf=(buf+e.key.toLocaleLowerCase('tr').replace('ı','i')).slice(-6);
 if(buf==='bilsas'){buf='';run()}
});
let taps=[];
const c=document.querySelector('.copy span');
if(c)c.addEventListener('click',()=>{
 const now=Date.now();taps=taps.filter(x=>now-x<2500);taps.push(now);
 if(taps.length>=5){taps=[];run()}
});
})();
