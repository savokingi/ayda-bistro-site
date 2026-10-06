const toggle=document.querySelector('.nav-toggle');
const mobileNav=document.querySelector('.mobile-nav');
function closeNav(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Открыть меню');mobileNav.hidden=true;}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');mobileNav.hidden=!open;});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav();});
window.addEventListener('resize',()=>{if(window.innerWidth>640)closeNav();});
document.addEventListener('click',e=>{if(!mobileNav.hidden&&!mobileNav.contains(e.target)&&!toggle.contains(e.target))closeNav();});

const menuItems=[...document.querySelectorAll('[data-category]')];
const filters=[...document.querySelectorAll('.filter')];
filters.forEach(button=>button.addEventListener('click',()=>{
  const category=button.dataset.filter;
  filters.forEach(filter=>{const active=filter===button;filter.classList.toggle('active',active);filter.setAttribute('aria-pressed',String(active));});
  menuItems.forEach(item=>item.hidden=category!=='all'&&item.dataset.category!==category);
  const count=menuItems.filter(item=>!item.hidden).length;
  const noun=count%10===1&&count%100!==11?'позиция':count%10>=2&&count%10<=4&&(count%100<12||count%100>14)?'позиции':'позиций';
  document.querySelector('.menu-count').textContent=`${count} ${noun}`;
}));

const dishes={
  chicken:{title:'Тот самый чикен',category:'В РУКИ / БУРГЕР',image:'assets/burger.jpg',description:'Чикен-бургер с голубым соусом. Фото и новость о нём — из канала нашего бистро.',source:'https://t.me/ayda_bistro/957'},
  doner:{title:'Донер',category:'В РУКИ / ДОНЕР',image:'assets/doner.jpg',description:'Донер с нашей витрины. Заглядывай, когда хочется поесть на ходу или сделать небольшой перерыв.',source:'https://t.me/ayda_bistro/924'},
  pizza:{title:'Римская пицца',category:'В РУКИ / ПИЦЦА',image:'assets/pizza.jpg',description:'Римская пицца кусочками. Варианты начинки и сегодняшнее наличие подскажет команда на кассе.',source:'https://t.me/ayda_bistro/964'},
  wok:{title:'Вок',category:'НА ОБЕД / ГОРЯЧЕЕ',image:'assets/wok.jpg',description:'Вок с куриной грудкой, шампиньонами, луком, соусом терьяки и кунжутом. В публикации бистро — варианты с лапшой и японским рисом. Уточни, какие доступны сегодня.',source:'https://t.me/ayda_bistro/962'},
  shawarma:{title:'Шаурма барбекю',category:'В РУКИ / ШАУРМА',description:'Шаурма барбекю — одна из новинок, о которых мы рассказывали в канале. Точный состав, варианты и наличие подскажет сотрудник бистро.',source:'https://t.me/ayda_bistro/958'},
  hot:{title:'Супы и горячее',category:'НА ОБЕД / ГОРЯЧЕЕ',description:'Сырный суп, лагман и мясо по-чешски — блюда, которые появляются на нашей витрине. Позвони или загляни, чтобы узнать сегодняшнее меню.',source:'https://t.me/ayda_bistro/968'},
  coffee:{title:'Кофе',category:'КОФЕ И НАПИТКИ',description:'Для утра перед занятиями или короткой паузы днём. Выбор кофе, объём и добавки уточни у бариста.',source:'https://t.me/ayda_bistro'},
  drinks:{title:'Напитки',category:'КОФЕ И НАПИТКИ',description:'Молочные коктейли, горячие и холодные напитки. Какие вкусы есть сегодня — подскажет команда бистро.',source:'https://t.me/ayda_bistro'}
};
const dishDialog=document.querySelector('#dish-dialog');
menuItems.forEach(button=>button.addEventListener('click',()=>{
  const dish=dishes[button.dataset.dish];
  document.querySelector('#dish-title').textContent=dish.title;
  document.querySelector('#dish-category').textContent=dish.category;
  document.querySelector('#dish-description').textContent=dish.description;
  document.querySelector('#dish-source').href=dish.source;
  const photo=document.querySelector('#dish-image');
  photo.hidden=!dish.image;
  if(dish.image){photo.src=dish.image;photo.alt=dish.title;}
  document.querySelector('.dish-dialog-content').classList.toggle('no-image',!dish.image);
  dishDialog.showModal();
}));
document.querySelector('#bonus-open').addEventListener('click',()=>document.querySelector('#bonus-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';});
  const observer=new MutationObserver(()=>{if(dialog.open)document.body.style.overflow='hidden';});
  observer.observe(dialog,{attributes:true,attributeFilter:['open']});
});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.section-heading,.place-copy,.bonus-section>div:first-child,.community-layout,.contact-heading').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
}
