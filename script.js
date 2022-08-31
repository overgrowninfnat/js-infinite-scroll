const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const COUNT = 30;
const API_KEY = 'eLfrJjdBJH-dXGEgocjAcEutqUJ58bZ0Zmf7dsQ3ZdE';
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${COUNT}`;

// Check if images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        imagesLoaded = 0;
    }
}

// Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links and Photos -> Add them to the DOM
function displayPhotos() {
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
       /*  item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank'); */
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img');
        /* img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description); */
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Fetch Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(API_URL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error)
    }
}

// Check if the scroll position is near to the bottom of the page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();