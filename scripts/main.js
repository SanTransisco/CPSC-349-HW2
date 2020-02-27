var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var TINY_EFFECT_CLASS = 'is-tiny';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function nextImage(){
  //Large Image
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  //Large Image

    var thumbnails = getThumbnailsArray();
    var i;
    var nextIndex = -1;
    //Use this For loop to find the place in the thumbnails where the current
    //Imave is located, then iterate to the next index.
    for (i = 0; i < thumbnails.length; i++){
      if(detailImage.getAttribute("src")===thumbnails[i].getAttribute("href")&& i+1<thumbnails.length){
        nextIndex = i+1;
        break;
      }
    }
    if(nextIndex !== -1){
      console.log(thumbnails[0].getAttribute("href"))
      
      detailImage.setAttribute('src', thumbnails[nextIndex].getAttribute("href"));

      detailTitle.textContent = thumbnails[nextIndex].getAttribute("data-image-title");
    }
}

function prevImage(){
  //Large Image
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  //Large Image

    var thumbnails = getThumbnailsArray();
    var i;
    var nextIndex = -1;
    //Use this For loop to find the place in the thumbnails where the current
    //Imave is located, then iterate to the next index.
    for (i = 0; i < thumbnails.length; i++){
      if(detailImage.getAttribute("src")===thumbnails[i].getAttribute("href")&& i-1>0){
        nextIndex = i-1;
        break;
      }
    }
    if(nextIndex !== -1){
      console.log(thumbnails[0].getAttribute("href"))
      
      detailImage.setAttribute('src', thumbnails[nextIndex].getAttribute("href"));

      detailTitle.textContent = thumbnails[nextIndex].getAttribute("data-image-title");
    }
}


function imageFromThumb(thumbnail) {
       'use strict';
       return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail){
    'use strict';
    setDetails(imageFromThumb(thumbnail),titleFromThumb(thumbnail));

}

function addThumbClickHandler(thumb){
    'use strict';
    thumb.addEventListener('click',function(event){
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
      frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}


function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
  document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === 39) {
      nextImage()
    }
  });
  document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === 37) {
      prevImage()
    }
  });
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();

  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();



  console.log(thumbnails[0].getAttribute("href"))
  console.log(thumbnails[0].getAttribute("data-image-title"))
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  console.log(detailImage.getAttribute("src"))

}

  initializeEvents();
