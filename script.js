setTimeout(function() {
    var loader = document.querySelector('.loader');
    loader.classList.add('fadeOut'); // Add class to fade out

    const check = false;
    setTimeout(function() {
        loader.parentElement.style.display = 'none'; // Hide after fade out animation
        var myDiv = document.getElementById('main');
        myDiv.style.display = 'block';
        myDiv.classList.add('fadeIn'); // Add class to fade in
        check = true;
    }, 1000); // Adjust to match transition duration

}, 3000);

function uploadImage() {
    var fileInput = document.getElementById('fileInput');
    var files = fileInput.files;

    var gallery = document.querySelector('.gallery');

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();

        reader.onload = function(e) {
            var imageUrl = e.target.result;

            var link = document.createElement('a');
            link.href = imageUrl;
            link.setAttribute('data-lightbox', 'models');
            link.setAttribute('data-title', '');

            var image = document.createElement('img');
            image.src = imageUrl;

            link.appendChild(image);

            gallery.appendChild(link);
        };

        reader.readAsDataURL(file);
    }
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 100,
})

sr.reveal(`#main`, {interval: 100, delay:3500})
sr.reveal(`.loader-container`, {delay:100})
//sr.reveal(`.profile__name`, {delay: 500})