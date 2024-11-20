function includeHTML() {
    var elements = document.querySelectorAll('[data-include-html]');
    elements.forEach(function(element) {
        var file = element.getAttribute('data-include-html');
        if (file) {
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    element.innerHTML = data;
                    element.removeAttribute('data-include-html');
                    includeHTML();
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
    });
}

document.addEventListener('DOMContentLoaded', includeHTML);
