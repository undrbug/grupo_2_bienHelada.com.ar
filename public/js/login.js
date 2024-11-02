document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    form.addEventListener("submit", function(event) {
        let valid = true;

        // validacion de correo
        if (!emailInput.value) {
            emailError.textContent = "El email es obligatorio.";
            emailInput.classList.add("is-invalid");
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
            emailError.textContent = "Ingrese un email válido.";
            emailInput.classList.add("is-invalid");
            valid = false;
        } else {
            emailError.textContent = "";
            emailInput.classList.remove("is-invalid");
        }

        // validacion de contraseña
        if (!passwordInput.value) {
            passwordError.textContent = "La contraseña es obligatoria.";
            passwordInput.classList.add("is-invalid");
            valid = false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = "La contraseña debe tener al menos 8 caracteres.";
            passwordInput.classList.add("is-invalid");
            valid = false;
        } else {
            passwordError.textContent = "";
            passwordInput.classList.remove("is-invalid");
        }

        // no envia el formulario si hay errores
        if (!valid) {
            event.preventDefault();
        }
    });
});