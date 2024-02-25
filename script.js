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
  // เลือกไฟล์จาก input
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];

  // สร้างออบเจก File Reader
  var reader = new FileReader();

  // เมื่ออ่านไฟล์เสร็จสิ้น
  reader.onload = function(e) {
      // นำข้อมูลรูปภาพไปใช้งาน
      var imageData = e.target.result;

      // สร้าง Element ของรูปภาพ
      var imgElement = document.createElement('img');
      imgElement.src = imageData;

      // สร้าง Element ของลิงก์
      var linkElement = document.createElement('a');
      linkElement.href = imageData; // ให้ลิงก์นี้ชี้ไปยังรูปภาพ
      linkElement.setAttribute('data-lightbox', 'models'); // เพิ่ม Attribute data-lightbox
      linkElement.appendChild(imgElement); // เพิ่ม Element ของรูปภาพลงในลิงก์

      // นำ Element ของลิงก์ไปแทรกใน Element ที่มี class="gallery"
      var gallery = document.querySelector('.gallery');
      gallery.appendChild(linkElement);
  };

  // อ่านไฟล์เป็น Data URL
  reader.readAsDataURL(file);
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