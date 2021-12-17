//IIFE, Immediately Invoked Function Expression
(() => {
    const carouselList = document.querySelector('.carousel-list');
    const imageUpload = document.querySelector('#img-upload-input');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    function changeTransform() {
        const items = document.querySelectorAll('.carousel-item');

        items.forEach((el, index) => {
            let degree = 360 / items.length;

            if (items.length > 1) {
                if (index === 0) {
                    el.style.transform = 'rotateY(0deg) translateZ(250px)';
                } else {
                    el.style.transform = `rotateY(${
                    degree * index}deg) translateZ(250px) rotateY(-${degree * index}deg)`;
                }
            }
            // more than 5 pictures
            if (items.length >= 5) {
                if (index === 0) {
                    el.style.transform = 'rotateY(0deg) translateZ(250px)';
                } else if (index === 1) {
                    el.style.transform = 'rotateY(72deg) translateZ(250px) rotateY(-72deg)';
                } else if (index === 2) {
                    el.style.transform = 'rotateY(144deg) translateZ(250px) rotateY(-144deg) translateX(400px)';
                } else if (index === items.length - 2) {
                    el.style.transform = 'rotateY(216deg) translateZ(250px) rotateY(-216deg) translateX(-400px)';
                } else if (index === items.length - 1) {
                    el.style.transform = 'rotateY(288deg) translateZ(250px) rotateY(-288deg)';
                } else {
                    el.style.transform = `rotateY(${
                    degree * index}deg) translateZ(250px) rotateY(-${degree * index}deg)`;
                }
            }
        });
    }
    // prev, next buttons functions last picture go to the first
    function movePrev() {
        const items = document.querySelectorAll('.carousel-item');
        if (items.length > 1) {
            const curretItem = document.querySelector('.now');
            const lastItem = carouselList.lastElementChild;
            carouselList.insertBefore(lastItem, items[0]);
            curretItem
                .classList
                .remove('now');
            lastItem
                .classList
                .add('now');
        }
        changeTransform();
    }
    // first picture go to the end
    function moveNext() {
        const items = document.querySelectorAll('.carousel-item');
        if (items.length > 1) {
            const curretItem = document.querySelector('.now');
            const nextItem = curretItem.nextElementSibling;
            carouselList.appendChild(curretItem);
            curretItem
                .classList
                .remove('now');
            nextItem
                .classList
                .add('now');
        }
        changeTransform();
    }
    // create Tag
    function createTag(url) {
        const list = document.createElement('li');
        const img = document.createElement('img');
        //list.setAttribute('class', 'carousel-item');
        list
            .classList
            .add('carousel-item');
        img.src = url;
        list.appendChild(img);
        // add now class to list
        const items = document.querySelectorAll('.carousel-item');
        items.forEach((item) => {
            item
                .classList
                .remove('now');
        });
        list
            .classList
            .add('now');

        return list;
    }
    // upload image
    function uploadImg(value) {
        const items = document.querySelectorAll('.carousel-item');
        if (value.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgUrl = e.target.result;
                carouselList.insertBefore(createTag(imgUrl), items[0]);

                changeTransform();
            };
            reader.readAsDataURL(value.files[0]);
        }
    }

    // add image upload button
    imageUpload.addEventListener('change', (e) => {
        uploadImg(e.target);
    });
    // add event to Btns
    prevBtn.addEventListener('click', movePrev);
    nextBtn.addEventListener('click', moveNext);

    window.onload = () => {
        changeTransform();
    };
})();