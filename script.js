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

function uploadToGitHub() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch('upload_to_github.php', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          if (response.ok) {
              alert('File uploaded successfully!');
          } else {
              alert('Failed to upload file.');
          }
      })
      .catch(error => console.error('Error:', error));
  } else {
      alert('Please select a file to upload.');
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