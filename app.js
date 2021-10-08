const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const makeGalleryMarkup = ({ preview, original, description }) => {
    return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
        </a>
    </li>
    `;
};

const listEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImageEl = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');

const makeGallery = galleryItems.map(makeGalleryMarkup).join(' ');
listEl.insertAdjacentHTML('afterbegin', makeGallery);

listEl.addEventListener('click', onImageClick);
closeModalBtn.addEventListener('click', onCloseBtnClick);
lightboxOverlayEl.addEventListener('click', onOverlayClick);

function onImageClick(event) {
  event.preventDefault();

  window.addEventListener('keydown', onEscKeyPress);
  listEl.addEventListener('keydown', onArrowPress);

  const isGalleryImage = event.target.classList.contains('gallery__image');

  if (!isGalleryImage) return;

  lightboxEl.classList.add('is-open');

  const originalImage = event.target.dataset.source;
  const imagesAlt = event.target.getAttribute('alt');

  lightboxImageEl.setAttribute("src", originalImage);
  lightboxImageEl.setAttribute("alt", imagesAlt);
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onEscKeyPress);
  listEl.removeEventListener('keydown', onArrowPress);

  lightboxImageEl.removeAttribute("src");
  lightboxImageEl.removeAttribute("alt");

  lightboxEl.classList.remove('is-open');
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseBtnClick();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseBtnClick();
  }
}

function onArrowPress(event) {
  let currentIndex = galleryItems.findIndex(image => image.original === lightboxImageEl.src);

  if (event.code === 'ArrowRight') {
    currentIndex < galleryItems.length - 1 ? (currentIndex += 1) : 0;
  }

   if (event.code === 'ArrowLeft') {
    currentIndex > 0 ? (currentIndex -= 1) : galleryItems.length - 1;
   }

  lightboxImageEl.src = galleryItems[currentIndex].original;
  lightboxImageEl.alt = galleryItems[currentIndex].alt;
}