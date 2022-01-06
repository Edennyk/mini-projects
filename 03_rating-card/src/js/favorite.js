// when thumsup and heart button clicked, the colors are changed.
// toggle 'on' class

'use strict';

const favoriteElem = document.querySelector('.content-favorite');

favoriteElem.addEventListener('click', function (e) {
    const path = e.composedPath();
    // console.log(path);
    const element = path.find(element => element.tagName === 'BUTTON');

    if(!element){
        return;
    }

   element.classList.toggle('on');
});


