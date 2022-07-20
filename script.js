'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
//Modal
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//IMPLEMENTING SMOOTH SCROLL
btnScrollTo.addEventListener('click', function (event) {
  const s1coords = section1.getBoundingClientRect();

  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior:'smooth',
  // })

  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page navigation

//INEFFICIENT WAY:because we are creating copies of the same callback function.
// document.querySelectorAll('.nav__link').forEach(function(element){
//   element.addEventListener('click',function(event){
//     event.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//   })
// })

//EVENT DELIGATION:EFFICIENT
//1.Add event listner to common parent element

//2.Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click',function(e){
  event.preventDefault();
  console.log(e.target);

  //Matching startegy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
    console.log(id);
  }
});

//TABBED COMPONENT

tabsContainer.addEventListener('click',function(e){
  //matching startegy
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //Guard clause
  if(!clicked) return;
  
  //remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  tabsContent.forEach(content => content.classList.remove('operations__content--active'))

  //active tab
  clicked.classList.add('operations__tab--active')

  //Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

//Menu fade animation

const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !=link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }

}

//passing an 'agrument' into handler function
nav.addEventListener('mouseover',handleHover.bind(0.5))
nav.addEventListener('mouseout',handleHover.bind(1))

//Sticky Nav

//EFFIICIANT WAY: INTERSECTION OBSERVER API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function(entries){
  const [entry] = entries;
  // console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav,{
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

//Reveal Sections
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries,observer){
  const [entry] = entries;
  // console.log(entry);
  if(!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection,{
  revealSection,
  root:null,
  threshold: 0.15
})
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
})

//Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]')

const loadImage = function(entries,observer){
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)

}

const imgObserver = new IntersectionObserver(loadImage,{
  roo:null,
  threshold:0,
  rootMargin:'200px'
})

imgTargets.forEach(img => imgObserver.observe(img))

//SLIDER
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const dotContainer = document.querySelector('.dots');



const slider = document.querySelector('.slider');

let curSlide = 0;
const maxSlide = slides.length;

const createDots = function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}
createDots()

const activeDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}
activeDot(0)


const goToslide = function(slide){
  slides.forEach((s,i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
  
}
goToslide(0)

//Next slide
const nextSlide = function()
{

  if(curSlide === maxSlide-1){
    curSlide = 0;
  }else{
  
    curSlide++;
  }
  goToslide(curSlide)
  activeDot(curSlide)
}
const prevSlide = function(){
  if(curSlide === 0){
    curSlide = maxSlide - 1;
  }else{

    curSlide--;
  }
  goToslide(curSlide)
  activeDot(curSlide)
}

const init = function(){

}


//Event handlers
btnRight.addEventListener('click',nextSlide)
btnLeft.addEventListener('click',prevSlide)

document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft'){
    prevSlide();
  }
  if(e.key === 'ArrowRight'){
    nextSlide();
  }
})

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    console.log('DOT');
    const {slide} = e.target.dataset;
    goToslide(slide);
    activeDot(slide)
  }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////// DOM LIFECYCLE //////////
// document.addEventListener('DOMContentLoaded',function(e){
//   console.log('HTML parsed and DOM tree built!',e);
// })

// window.addEventListener('load',function(e){
//   console.log('Page fully loaded',e);
// })

// window.addEventListener('beforeunload',function(e){
//   e.preventDefault()
//   console.log(e);
//   e.returnValue = '';

// })

/////// EFFICIENT SCRIPT LOADING: DEFER AND ASYNC

