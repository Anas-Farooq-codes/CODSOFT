var loader = document.getElementById("preloader");
window.addEventListener('load', function(){
    loader.style.display = 'none';
    })
    document.addEventListener("DOMContentLoaded", function () {
        var btn = document.getElementById("backToTopBtn");
  
        window.addEventListener("scroll", function () {
          if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btn.style.display = "block";
          } else {
            btn.style.display = "none";
          }
        });
  
        btn.addEventListener("click", function () {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        });
      });
      function openModal(title, content) {
        document.getElementById('modalTitle').innerHTML = title;
        document.getElementById('modalContent').innerHTML = content;
        document.getElementById('blogModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close the modal
    function closeModal() {
        document.getElementById('blogModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Close the modal if the user clicks outside of it
    window.onclick = function (event) {
        var modal = document.getElementById('blogModal');
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };