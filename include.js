function includeHTML() {
  var elements = document.querySelectorAll("[data-include-html]");
  elements.forEach(function (element) {
    var file = element.getAttribute("data-include-html");
    if (file) {
      fetch(file)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data) => {
          element.innerHTML = data;
          element.removeAttribute("data-include-html");
          includeHTML();
          // Añadir aquí el script para activar la clase 'active'
          if (file === "navbar.html") {
            activateLinkBasedOnURL();
          }
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  });
}

function activateLinkBasedOnURL() {
    const currentPath = window.location.pathname.split('/').pop();
    console.log("currentPath",currentPath);
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove the active class from all links
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('activo'); // Add the active class to the matching link
        }
    });
}

document.addEventListener("DOMContentLoaded", includeHTML);
