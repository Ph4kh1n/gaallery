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

const firebaseConfig = {
  apiKey: "AIzaSyCOcp6v39x5FFl8MLDkhHZAaAgmv_QsCkM",
  authDomain: "upload-images-e8dac.firebaseapp.com",
  projectId: "upload-images-e8dac",
  storageBucket: "upload-images-e8dac.appspot.com",
  messagingSenderId: "620222914132",
  appId: "1:620222914132:web:bf026dc1becd44c19ad7c1",
  measurementId: "G-FBDYTGSC3X"
};

firebase.initializeApp(firebaseConfig);

var fileText = document.querySelector(".fileText");
var fileItem;
var fileName;
var img = document.querySelector("img");
var newImageAnchor = document.createElement('a');
var gallery = document.querySelector('.gallery');
function getFile(e) {
  fileItem = e.target.files[0];
  fileName = fileItem.name;
  fileText.innerHTML = fileName;
}

// โหลดรูปภาพที่มีอยู่ใน Local Storage เมื่อหน้าเว็บโหลดขึ้นมาใหม่
function loadImagesFromLocalStorage() {
  const storedImages = JSON.parse(localStorage.getItem('images')) || [];

  storedImages.forEach(function(url) {
      const newImageAnchor = document.createElement('a');
      newImageAnchor.setAttribute('href', url);
      newImageAnchor.setAttribute('data-lightbox', 'models');

      const newImage = document.createElement('img');
      newImage.setAttribute('src', url);

      newImageAnchor.appendChild(newImage);
      gallery.appendChild(newImageAnchor);
  });
}

// เพิ่ม URL ของรูปภาพลงใน Local Storage
function addImageToLocalStorage(url) {
  const storedImages = JSON.parse(localStorage.getItem('images')) || [];
  storedImages.push(url);
  localStorage.setItem('images', JSON.stringify(storedImages));
}

// ฟังก์ชันสำหรับการอัปโหลดภาพ
function uploadImage() {
  let storageRef = firebase.storage().ref("images/" + fileName);
  let uploadTask = storageRef.put(fileItem);

  uploadTask.on("state_changed", (snapshot) => {
      console.log(snapshot);

      uploadTask.snapshot.ref.getDownloadURL().then(url => {
          console.log("URL", url);

          if (url != "") {
              // เพิ่ม URL ของรูปภาพลงใน Local Storage
              addImageToLocalStorage(url);

              const newImageAnchor = document.createElement('a');
              newImageAnchor.setAttribute('href', url);
              newImageAnchor.setAttribute('data-lightbox', 'models');

              const newImage = document.createElement('img');
              newImage.setAttribute('src', url);

              newImageAnchor.appendChild(newImage);
              gallery.appendChild(newImageAnchor);
          }
      })
  })
}

// เมื่อเอกสารโหลดเสร็จสมบูรณ์ โหลดรูปภาพจาก Local Storage
document.addEventListener("DOMContentLoaded", function() {
  loadImagesFromLocalStorage();
});

// โหลดรูปภาพที่มีอยู่ใน Firebase Storage เมื่อหน้าเว็บโหลดขึ้นมาใหม่
function loadImagesFromFirebase() {
  // ระบุพาธที่เก็บภาพใน Firebase Storage
  let storageRef = firebase.storage().ref("images");

  // ดึงรายการไฟล์ทั้งหมดภายในโฟลเดอร์ images
  storageRef.listAll().then(function(result) {
      result.items.forEach(function(imageRef) {
          // ดึง URL ของรูปภาพและแสดงผลใน Gallery
          imageRef.getDownloadURL().then(function(url) {
              const newImageAnchor = document.createElement('div'); // สร้าง Element div สำหรับรวมรูปภาพและปุ่มลบ

              const newImage = document.createElement('img');
              newImage.setAttribute('src', url);

              const deleteButton = document.createElement('button');
              deleteButton.textContent = 'Delete';
              deleteButton.addEventListener('click', function() {
                  // ลบรูปภาพ
                  deleteImage(imageRef);
                  // ลบ Element ที่ครอบรูปภาพและปุ่มลบ
                  newImageAnchor.remove();
              });

              newImageAnchor.appendChild(newImage);
              newImageAnchor.appendChild(deleteButton);

              gallery.appendChild(newImageAnchor);
          }).catch(function(error) {
              console.log(error);
          });
      });
  }).catch(function(error) {
      console.log(error);
  });
}

// ลบรูปภาพที่ถูกคลิก
function deleteImage(imageRef) {
  // ลบรูปภาพใน Firebase Storage
  imageRef.delete().then(function() {
      console.log('Image deleted successfully');
  }).catch(function(error) {
      console.log('Error deleting image: ', error);
  });
}

// เมื่อเอกสารโหลดเสร็จสมบูรณ์ โหลดรูปภาพจาก Firebase Storage
document.addEventListener("DOMContentLoaded", function() {
  loadImagesFromFirebase();
});

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