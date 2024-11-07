document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
  
  
    const inputs = document.querySelectorAll("#name, #description, #Image, #brand, #Stock, #price, #Barcode");
  
    let fieldErrors = {
      name: true,
      drink_description: true,
      Image: true,
      brand: true,
      Stock: true,
      price: true,
      Barcode: true
    };
  
   
    inputs.forEach(input => {
      input.addEventListener("blur", (e) => handleFieldValidation(e, fieldErrors));
    });
  
    form.addEventListener("submit", (e) => {
      if (Object.values(fieldErrors).includes(true)) {
        e.preventDefault(); 
        alert("Hay campos incompletos o con errores."); 
      }
    });
  });
  
  function handleFieldValidation(e, fieldErrors) {
    const errors = [];
    const errorContainer = e.target.nextElementSibling;
  
    if (errorContainer) errorContainer.textContent = "";

  // Validación de cada campo según el nombre del input
  switch (e.target.name) {
    case "name":
      if (e.target.value.trim() === "") {
        errors.push("El campo nombre no puede estar vacío.");
        fieldErrors.name = true;
      } else if (e.target.value.length < 4) {
        errors.push("El nombre debe tener más de 4 caracteres.");
        fieldErrors.name = true;
      } else {
        fieldErrors.name = false;
      }
      break;

    case "drink_description":
      if (e.target.value.trim() === "") {
        errors.push("La descripción no puede estar vacía.");
        fieldErrors.drink_description = true;
      } else if (e.target.value.length < 10) {
        errors.push("La descripción debe tener al menos 10 caracteres.");
        fieldErrors.drink_description = true;
      } else {
        fieldErrors.drink_description = false;
      }
      break;

    case "Image":
      if (e.target.files.length === 0) {
        errors.push("Debe seleccionar una imagen.");
        fieldErrors.Image = true;
      } else {
        fieldErrors.Image = false;
      }
      break;

    case "brand":
      if (e.target.value.trim() === "") {
        errors.push("La marca no puede estar vacía.");
        fieldErrors.brand = true;
      } else {
        fieldErrors.brand = false;
      }
      break;

    case "Stock":
      if (e.target.value.trim() === "" || parseInt(e.target.value) <= 0) {
        errors.push("La cantidad debe ser mayor a 0.");
        fieldErrors.Stock = true;
      } else {
        fieldErrors.Stock = false;
      }
      break;

    case "price":
      if (e.target.value.trim() === "" || parseFloat(e.target.value) <= 0) {
        errors.push("El precio debe ser mayor a 0.");
        fieldErrors.price = true;
      } else {
        fieldErrors.price = false;
      }
      break;

    case "Barcode":
      if (e.target.value.trim() === "" || e.target.value.length < 5) {
        errors.push("El código debe tener al menos 5 dígitos.");
        fieldErrors.Barcode = true;
      } else {
        fieldErrors.Barcode = false;
      }
      break;
  }


  if (errors.length > 0 && errorContainer) {
    errorContainer.textContent = errors.join(" ");
    errorContainer.classList.add("text-danger");
  } else if (errorContainer) {
    errorContainer.textContent = ""; // Limpiar si no hay errores
  }
}
