setTimeout(function() {
    var loader = document.querySelector('.loader');
    loader.classList.add('fadeOut'); // Add class to fade out
    
    setTimeout(function() {
        loader.parentElement.style.display = 'none'; // Hide after fade out animation
        var myDiv = document.getElementById('main');
        myDiv.style.display = 'block';
        myDiv.classList.add('fadeIn'); // Add class to fade in
    }, 1000); // Adjust to match transition duration

}, 3000);

function uploadImage() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];
  var formData = new FormData();
  formData.append('image', file);

  // เริ่มการส่งข้อมูลด้วย AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'upload.php', true);
  xhr.onload = function () {
      if (xhr.status === 200) {
          var response = xhr.responseText;
          // เมื่ออัพโหลดเสร็จสิ้น แทรกโค้ด HTML เพื่อแสดงภาพ
          var gallery = document.querySelector('.gallery');
          gallery.innerHTML += '<a href="images/' + response + '" data-lightbox="models"><img src="images/' + response + '"></a>';
      } else {
          alert('การอัพโหลดล้มเหลว: ' + xhr.status);
      }
  };
  xhr.send(formData);
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