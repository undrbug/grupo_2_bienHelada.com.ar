document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("drink_description");
    const imageInput = document.getElementById("image");
    const brandInput = document.getElementById("bodega");
    const quantityInput = document.getElementById("cantidad");
    const priceInput = document.getElementById("price");

    const showError = (input, message) => {
        const errorElement = input.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = message;
            input.classList.add("is-invalid");
        }
    };

    const clearError = (input) => {
        const errorElement = input.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = "";
            input.classList.remove("is-invalid");
        }
    };

    nameInput.addEventListener("blur", () => {
        if (nameInput.value.trim().length < 3) {
            showError(nameInput, "El nombre debe tener al menos 3 caracteres.");
        } else {
            clearError(nameInput);
        }
    });

    descriptionInput.addEventListener("blur", () => {
        if (descriptionInput.value.trim().length < 10) {
            showError(descriptionInput, "La descripción debe tener al menos 10 caracteres.");
        } else {
            clearError(descriptionInput);
        }
    });

    imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];
        if (file && !["image/jpeg", "image/png"].includes(file.type)) {
            showError(imageInput, "Solo se permiten archivos de imagen en formato JPEG o PNG.");
        } else {
            clearError(imageInput);
        }
    });

    brandInput.addEventListener("blur", () => {
        if (brandInput.value.trim().length < 2) {
            showError(brandInput, "La marca debe tener al menos 2 caracteres.");
        } else {
            clearError(brandInput);
        }
    });

    quantityInput.addEventListener("blur", () => {
        const quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity <= 0) {
            showError(quantityInput, "La cantidad debe ser un número positivo.");
        } else {
            clearError(quantityInput);
        }
    });

    priceInput.addEventListener("blur", () => {
        const price = parseFloat(priceInput.value);
        if (isNaN(price) || price <= 0) {
            showError(priceInput, "El precio debe ser un número positivo.");
        } else {
            clearError(priceInput);
        }
    });

    form.addEventListener("submit", (event) => {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    function validateForm() {
        let isValid = true;

        if (nameInput.value.trim().length < 3) {
            showError(nameInput, "El nombre debe tener al menos 3 caracteres.");
            isValid = false;
        }

        if (descriptionInput.value.trim().length < 10) {
            showError(descriptionInput, "La descripción debe tener al menos 10 caracteres.");
            isValid = false;
        }

        const file = imageInput.files[0];
        if (file && !["image/jpeg", "image/png"].includes(file.type)) {
            showError(imageInput, "Solo se permiten archivos de imagen en formato JPEG o PNG.");
            isValid = false;
        }

        if (brandInput.value.trim().length < 2) {
            showError(brandInput, "La marca debe tener al menos 2 caracteres.");
            isValid = false;
        }

        const quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity <= 0) {
            showError(quantityInput, "La cantidad debe ser un número positivo.");
            isValid = false;
        }

        const price = parseFloat(priceInput.value);
        if (isNaN(price) || price <= 0) {
            showError(priceInput, "El precio debe ser un número positivo.");
            isValid = false;
        }

        return isValid;
    }
});
