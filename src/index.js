import './styles.css';
import 'material-design-icons/iconfont/material-icons.css';
import { debounce } from "../node_modules/debounce";
import {default as apiService} from './apiService';
import liPhotoTemplate from './template/li-template.hbs';
import * as basicLightbox from 'basiclightbox'

let userInput;
let modalSrc;
let instance;

const refs = {
  list: document.querySelector('.gallery'),
  form: document.getElementById('search-form'),
  btn: document.getElementById('js-btn'),
  img: document.querySelectorAll('.img')
}

const checkInput = debounce(function(event) {
  userInput = event.target.value;
  if(userInput.length === 0){
    userInput = '';
    clearHtml();
    // ! For BTN
    // refs.btn.classList.remove('is-visible');
  }else{
    clearHtml();
    getInput(userInput);
  }
}, 500)

function clearHtml() {
  refs.list.innerHTML = '';
}

const getInput = () => {
  const promice = apiService(userInput);
  console.log('promice',promice);
  promice.then(data => drawHtml(data));
};

const drawHtml = (data) => {
  const item = liPhotoTemplate(data);
  refs.list.insertAdjacentHTML('beforeend',item);
  // ! For BTN
  // refs.btn.classList.add('is-visible');
}

const checkClick = (ev) => {
  if(ev.target.nodeName != 'IMG'){
    return;
  } else {
    modalSrc = ev.target.dataset.src;
    openModal();
  }
}

const openModal = () => {
  instance = basicLightbox.create(
    `<div class="modal">
      <img class="img" src="${modalSrc}">
    </div>`
    ,{
  onShow: (instance) => {
      instance.element().querySelector('.modal').onclick = instance.close
    }
  })
  instance.show()
}

refs.form.addEventListener('input', checkInput);
refs.list.addEventListener('click', checkClick);

window.addEventListener('scroll', debounce(function(){
  if (refs.list.scrollTop + refs.list.clientHeight >= refs.list.scrollHeight) {
    getInput();
  }
}),500);

// ! BTN and FUNCTIONS for scroll load more
// refs.btn.addEventListener('click',smoothScroll);
// const count = 0;
// const smoothScroll = () => {
  // count += 800;
  // window.scroll({
  //   bottom: count,
  //   left: 0,
  //   behavior: 'smooth'
  // });
// }