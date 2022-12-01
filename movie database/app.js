const apiKey = "da102ad5";
const apiUrl = "https://www.omdbapi.com/";

const form = document.querySelector(".searchForm");
const resultWrapper = document.querySelector(".resultWrapper");
form.addEventListener("submit", submitForm);

function submitForm(e) {
	e.preventDefault();
	const searchValue = form.querySelector('#searchInput').value;
	const typeValue = form.querySelector('#typeInput').value;
	const yearValue = form.querySelector('#yearInput').value;
	const params = new URLSearchParams();
	params.append('apikey', apiKey);
	params.append('s', searchValue);
	params.append('type', typeValue);
	params.append('y', yearValue);

	fetch(`${apiUrl}?${params}`)
	.then(response => response.json())
	.then((data) => {
		clearResult()
		const output = resultWrapper.querySelector(".resultOutput");
		if(data.Response === 'True') {
			data.Search.forEach((film) => {
				const filmCards = `
				<div class="filmItem">
				  <h3>${film.Title}</h3>
				  <img src=${film.Poster} alt="${film.Title}" />
				  <p class="filmItem_year">${film.Year}</p>
				</div>
				`
				output.innerHTML += filmCards;
			});
		} else {
			output.innerHTML = '<p>По вашему запросу ничего не нашлось</p>';
		};
		isShowResult()
	})
}

function clearResult() {
	resultWrapper.classList.remove("isShown");
    const output = resultWrapper.querySelector(".resultOutput");
    output.innerHTML = '';
}

function isShowResult() {
	resultWrapper.classList.add('isShown');
}

