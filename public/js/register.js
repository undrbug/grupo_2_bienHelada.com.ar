document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const image = document.querySelector("input[type='file']");
    const phone = document.getElementById("phone");
    const address = document.getElementById("adress");
    const country = document.getElementById("country");
    const state = document.getElementById("state");
    const password = document.getElementById("password");
    const rePassword = document.getElementById("rePassword");

    form.addEventListener("submit", function(event) {
        let valid = true;

        // validacion del nombre
        if (!firstName.value || firstName.value.length < 3 || firstName.value.length > 15) {
            alert("El nombre debe tener entre 3 y 15 caracteres.");
            valid = false;
        }

        // validacion del apellido
        if (!lastName.value || lastName.value.length < 3 || lastName.value.length > 20) {
            alert("El apellido debe tener entre 3 y 20 caracteres.");
            valid = false;
        }

        // validacion del correo
        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            alert("Ingrese un correo electrónico válido.");
            valid = false;
        }

        // vlidacion de la imagen
        const allowedExtensions = /(\.jpg|\.png)$/i;
        if (image.files.length > 0 && !allowedExtensions.exec(image.value)) {
            alert("El archivo debe ser una imagen con formato .jpg o .png");
            valid = false;
        }

        // validacion del telefono
        const phonePattern = /^\+?[0-9\s\-\(\)]{7,}$/;
        if (!phone.value || !phonePattern.test(phone.value)) {
            alert("Ingrese un número de teléfono válido.");
            valid = false;
        }

        // validacion de la direccion
        if (!address.value) {
            alert("La dirección es obligatoria.");
            valid = false;
        }

        // validacion del pais
        if (!country.value) {
            alert("Seleccione un país.");
            valid = false;
        }

        // validacion de la provincia
        if (!state.value) {
            alert("Seleccione una provincia.");
            valid = false;
        }

        // validacion de la contraseña
        if (!password.value || password.value.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            valid = false;
        }

        // confirmacion de la contraseña
        if (password.value !== rePassword.value) {
            alert("Las contraseñas no coinciden.");
            valid = false;
        }

        // evita el envio si alguna validacion fallo
        if (!valid) {
            event.preventDefault();
        }
    });
});
