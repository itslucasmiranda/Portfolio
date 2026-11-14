(() => {
'use strict';
const root=document.documentElement, reduced=matchMedia('(prefers-reduced-motion: reduce)'), motion=document.getElementById('motion'), scene=document.getElementById('scene'), aura=document.getElementById('aura'), menuButton=document.getElementById('menu-toggle'), menu=document.getElementById('nav-links');
let paused=reduced.matches;
function applyMotion(){root.classList.toggle('motion-off',paused);motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'Ativar animações':'Pausar animações';}
applyMotion();motion.addEventListener('click',()=>{paused=!paused;applyMotion();});reduced.addEventListener('change',e=>{paused=e.matches;applyMotion();});
aura.addEventListener('click',()=>{const active=scene.classList.toggle('aura');aura.setAttribute('aria-pressed',String(active));aura.querySelector('b').textContent=active?'DESATIVAR AURA':'ATIVAR AURA';});
function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='Menu ＋';}
menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Menu −':'Menu ＋';});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('click',e=>{if(!e.target.closest('nav'))closeMenu();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();menuButton.focus();}});matchMedia('(max-width:760px)').addEventListener('change',closeMenu);
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));root.classList.add('js-motion');}
const sections=[...document.querySelectorAll('main>section[id]')], links=[...menu.querySelectorAll('a')], progress=document.querySelector('.progress');let queued=false;
function update(){const max=root.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?Math.min(1,scrollY/max):0})`;let active='inicio';sections.forEach(s=>{if(s.getBoundingClientRect().top<=160)active=s.id;});links.forEach(a=>{if(a.hash===`#${active}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});queued=false;}
function schedule(){if(!queued){queued=true;requestAnimationFrame(update);}}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);update();
scene.addEventListener('pointermove',e=>{if(paused||reduced.matches||e.pointerType!=='mouse')return;const r=scene.getBoundingClientRect();scene.style.setProperty('--rx',`${((e.clientX-r.left)/r.width-.5)*8}deg`);scene.style.setProperty('--ry',`${-((e.clientY-r.top)/r.height-.5)*6}deg`);});scene.addEventListener('pointerleave',()=>{scene.style.setProperty('--rx','0deg');scene.style.setProperty('--ry','0deg');});
})();
