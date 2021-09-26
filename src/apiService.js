const key = '17938383-23b84899bb94a0830d5ea1e5b';
const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&key=${key}`;
let page = 1;
let nextPage = 12;
let counter = 0;
let userInput;

export default (name) => {
  if(counter === 0){
    counter ++;
    userInput = name;
    return getImages(name);
  }else if (counter > 0 && userInput === name){
    page ++;
    return getImages(name);
  }else{
    page = 1;
    counter = 0;
    return getImages(name);
  }
}

const getImages = async (name) => {
  const allData = await fetch(url+`&q=${name}`+`&page=${page}`+`&per_page=${nextPage}`);
  const result = await allData.json();
  return result;
}

