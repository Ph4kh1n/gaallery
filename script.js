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
var uploadPercent = document.querySelector(".uploadPercent");
var progress = document.querySelector(".progress");
var percentVal;
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

// ฟังก์ชันสำหรับการอัปโหลดภาพ
function uploadImages() {
  const fileInput = document.getElementById('fileinput');
  const files = fileInput.files;

  // วนลูปผ่านไฟล์ทั้งหมดที่ผู้ใช้เลือก
  for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // สร้างชื่อไฟล์ใหม่ด้วยวันที่และเวลา
      const currentDate = new Date();
      const fileName = currentDate.getFullYear() + '-' 
          + (currentDate.getMonth() + 1) + '-' 
          + currentDate.getDate() + '_' 
          + currentDate.getHours() + '-' 
          + currentDate.getMinutes() + '-' 
          + currentDate.getSeconds() + '_' + i + '.jpg';

      // เรียกฟังก์ชันอัปโหลดสำหรับแต่ละไฟล์
      uploadFile(file, fileName);
  }
}

function uploadFile(file, fileName) {
  let storageRef = firebase.storage().ref("images/" + fileName);
  let uploadTask = storageRef.put(file);

  uploadTask.on("state_changed", (snapshot) => {
      console.log(snapshot);
      // คำนวณเปอร์เซ็นต์ความคืบหน้า
      percentVal = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
      uploadPercent.innerHTML = percentVal + "%";
      progress.style.width = percentVal + "%";
  }, (error) => {
      console.log("Error is ", error);
  }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
          console.log("URL", url);
          
          if (url != "") {

            const newImageAnchor = document.createElement('a');
            newImageAnchor.setAttribute('href', url);
            newImageAnchor.setAttribute('data-lightbox', 'models');
        
            const newImage = document.createElement('img');
            newImage.setAttribute('src', url);
        
            // แทรกรูปภาพใหม่ข้างหน้ารูปภาพเก่า
            gallery.insertBefore(newImageAnchor, gallery.firstChild);
            newImageAnchor.appendChild(newImage);
          }
      });
  });
}

// โหลดรูปภาพที่มีอยู่ใน Firebase Storage เมื่อหน้าเว็บโหลดขึ้นมาใหม่
function loadImagesFromFirebase() {
  // ระบุพาธที่เก็บภาพใน Firebase Storage
  let storageRef = firebase.storage().ref("images");

  // ดึงรายการไฟล์ทั้งหมดภายในโฟลเดอร์ images
  storageRef.listAll().then(function(result) {
    // สร้างอาร์เรย์เพื่อเก็บข้อมูลของรูปภาพ
    let images = [];

    // วนลูปผ่านรายการไฟล์
    result.items.forEach(function(imageRef) {
      // ดึง URL ของรูปภาพและแสดงผลใน Gallery
      imageRef.getDownloadURL().then(function(url) {
        // เรียกเมื่อ URL ได้รับค่า
        images.push({ url: url, name: imageRef.name });
        
        // เมื่อเราได้รับ URL ของรูปภาพทั้งหมดแล้ว
        // เราสามารถเรียกฟังก์ชันเรียงลำดับและแสดงผลได้
        if (images.length === result.items.length) {
          displayImages(images);
        }
      }).catch(function(error) {
        console.log(error);
      });
    });
  }).catch(function(error) {
    console.log(error);
  });
}

// แสดงรูปภาพตามลำดับเวลา
function displayImages(images) {
  // เรียงลำดับรูปภาพตาม Timestamp จากมากไปหาน้อย
  images.sort((a, b) => b.name.localeCompare(a.name));

  // แสดงรูปภาพใน Gallery ตามลำดับ
  images.forEach(function(image) {
    const newImageAnchor = document.createElement('div'); // เปลี่ยนจาก 'a' เป็น 'div'
    newImageAnchor.setAttribute('class', 'imageContainer');

    const newImage = document.createElement('img');
    newImage.setAttribute('src', image.url);

    /*const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      // ลบรูปภาพ
      deleteImage(image.name);
      // ลบ Element ที่ครอบรูปภาพและปุ่มลบ
      newImageAnchor.remove();
    });*/

    newImageAnchor.appendChild(newImage);
    //newImageAnchor.appendChild(deleteButton);
    gallery.appendChild(newImageAnchor);
  });
}

function deleteImage(imageName) {
  let storageRef = firebase.storage().ref("images/" + imageName);
  storageRef.delete().then(function() {
    console.log('Image deleted successfully');
  }).catch(function(error) {
    console.log('Error deleting image: ', error);
  });
}

// เมื่อเอกสารโหลดเสร็จสมบูรณ์ โหลดรูปภาพจาก Firebase Storage
document.addEventListener("DOMContentLoaded", function() {
  loadImagesFromFirebase();
});

// ฟังก์ชันสำหรับดึง URL ของภาพแบบสุ่มจาก Firebase Storage
function getRandomImageURLFromFirebaseStorage() {
  // ระบุพาธที่เก็บภาพใน Firebase Storage
  let storageRef = firebase.storage().ref("images");

  return new Promise((resolve, reject) => {
      // ดึงรายการไฟล์ทั้งหมดภายในโฟลเดอร์ images
      storageRef.listAll().then(function(result) {
          // เลือกภาพแบบสุ่ม
          let randomImageRef = result.items[Math.floor(Math.random() * result.items.length)];

          // ดึง URL ของภาพ
          randomImageRef.getDownloadURL().then(function(url) {
              resolve(url); // ส่ง URL ของภาพแบบสุ่มออกไป
          }).catch(function(error) {
              reject(error); // หากเกิดข้อผิดพลาดในการดึง URL ของภาพ
          });
      }).catch(function(error) {
          reject(error); // หากเกิดข้อผิดพลาดในการดึงรายการไฟล์ภาพทั้งหมด
      });
  });
}

// เมื่อเอกสารโหลดเสร็จสมบูรณ์
document.addEventListener("DOMContentLoaded", async function() {
  try {
      // ดึง URL ของภาพแบบสุ่มจาก Firebase Storage
      const imageURL = await getRandomImageURLFromFirebaseStorage();

      // เพิ่ม URL ของภาพใน meta tag สำหรับการแชร์
      const metaImageTag = document.createElement('meta');
      metaImageTag.setAttribute('property', 'og:image');
      metaImageTag.setAttribute('content', imageURL);
      document.head.appendChild(metaImageTag);
  } catch (error) {
      console.error("Error fetching random image URL:", error);
  }
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