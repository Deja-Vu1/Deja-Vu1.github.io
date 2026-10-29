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
