const btnBack = document.getElementById('btn-back');
console.log("click");

btnBack.addEventListener('click', () => {
    alert("back");
    window.history.back();
});