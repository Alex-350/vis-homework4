(()=>{
 const render=chapter=>chapter.querySelectorAll('.tab-panel.active .demo-mount, .tab-panel.active [id^="demo-mount-"]').forEach(m=>window.renderLessonDemo?.(m));
 function select(chapter,tab){
  chapter.querySelectorAll('.tab-btn').forEach(b=>{const active=b.dataset.tab===tab;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));});
  chapter.querySelectorAll('.tab-panel').forEach(p=>{const active=p.dataset.panel===tab;p.classList.toggle('active',active);p.hidden=!active;});
  if(tab==='demo')render(chapter);
 }
 document.querySelectorAll('.chapter').forEach(chapter=>{
  const buttons=chapter.querySelectorAll('.tab-btn');
  chapter.querySelector('.tabs')?.setAttribute('role','tablist');
  buttons.forEach((button,index)=>{
   button.setAttribute('role','tab');button.type='button';
   button.addEventListener('click',()=>select(chapter,button.dataset.tab));
   button.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=buttons[(index+(e.key==='ArrowRight'?1:buttons.length-1))%buttons.length];next.focus();next.click();}});
  });
  chapter.querySelectorAll('.tab-panel').forEach(p=>p.setAttribute('role','tabpanel'));
  select(chapter,chapter.querySelector('.tab-btn.active')?.dataset.tab||'explain');
 });
 function navigate(id,scroll=true){
  const chapter=document.getElementById(id);if(!chapter?.classList.contains('chapter'))return;
  document.querySelectorAll('.chapter-nav a[data-chapter]').forEach(a=>a.classList.toggle('active',a.dataset.chapter===id));
  if(scroll)chapter.scrollIntoView({block:'start',behavior:'smooth'});
 }
 document.querySelectorAll('.chapter-nav a[data-chapter]').forEach(a=>a.addEventListener('click',()=>navigate(a.dataset.chapter,false)));
 window.addEventListener('hashchange',()=>navigate(location.hash.slice(1)));
 if(location.hash)navigate(location.hash.slice(1),false);
})();
