document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");

    form.addEventListener("submit", function(event) {
        emailInput.classList.remove("is-invalid");

        // validación de email
        if (!emailInput.value) {
            alert("El campo de email es obligatorio.");
            emailInput.classList.add("is-invalid");
            event.preventDefault();
        } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
            alert("Por favor, ingresa un email válido.");
            emailInput.classList.add("is-invalid");
            event.preventDefault();
        }
    });
});
