window.addEventListener("load", function () {
	let input = document.querySelector("#input-search");
	let actionSearch = document.querySelector("#search");

	const handleSearch = () => {
        let search = input.value;
        if (!search) {
            alert("El campo de búsqueda no puede estar vacío");
		}else{
                window.location.href = `/products/search/${search}`;
        }
	};
    //disparador click
	actionSearch.addEventListener("click", handleSearch);
	//disparador enter
    input.addEventListener("keypress", (e) =>{
        e.preventDefault();
        if (e.key === "Enter") {
            handleSearch();
        }
    });
});
