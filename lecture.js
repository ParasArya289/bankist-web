//selecting element
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

const allButton = document.getElementsByTagName('button')
console.log(allButton);

console.log(document.getElementsByClassName('btn'));

//creating and inserting elements

// .insertAdjacentHTML

const header = document.querySelector('.header')

const msg = document.createElement('div')
msg.classList.add('cookie-message')
// msg.textContent = `We use cookies for improved functionality and analytics`;
msg.innerHTML = `We use cookie for improved functionality and analytics <button class="btn btn--close--cookie">Got it!</button> `;

// header.prepend(msg)
header.append(msg)
// header.append(msg.cloneNode(true))

// header.before(msg)
// header.after(msg)

//Delete elements
// document.querySelector('.btn--close-cookie').addEventListener('click',function(){
//   msg.remove();
// })

////////////////////STYLES////////////////
msg.style.backgroundColor = '#37383d';
msg.style.width = '120%';

console.log(msg.style.backgroundColor);

console.log(getComputedStyle(msg).color);

msg.style.height = Number.parseFloat(getComputedStyle(msg).height,10)+30+'px'

document.documentElement.style.setProperty('--color-primary','orangered')

//Atributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

//DATA ATTRIBUTES
logo.dataset.versionNumber

//Classes
logo.classList.add('c','j')
logo.classList.remove('c','j')
logo.classList.toggle('c')
logo.classList.contains('c')

//Dont's use
logo.className = 'paras';

//Tyes of event and event handlers////

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter',function(){
//   alert('You are reading heading')
//   h1.removeEventListener('mouseenter',alertH1)
// })

// h1.onmouseenter = function(event){
//   alert('you are reading heading')
// }

//// EVENT PROPAGATION: BUBBLING AND CAPTURING/////

//Event bubbling is used to do event delegation 
const randomInt = (min,max) => Math.floor(Math.random() * max - min + 1) + min;

const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)})`;
console.log(randomColor(0,255));

document.querySelector('.nav__link').addEventListener('click',function(event){
  this.style.backgroundColor = randomColor
  console.log('link');

  //stop propagation
  event.stopPropagation();
})

/////// DOM TRAVERSING /////////

const h1 = document.querySelector('h1');

//GOING DOWNWARDS: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'white'

//GOING UPWARDS: Parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').getElementsByClassName.background = `var(--gradient-secondary)`

h1.closest('h1').style.background = 'var(--gradient-primary);'

//Going SIDEWAYS: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el){
  if(el !== h1) el.style.transform = 'scale(0.5)';
})