const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
  if (APIResponse.status == 200){

    const data = await APIResponse.json();
    return data;
  } 

}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if(data){
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
    ['animated']['front_default']
    searchPokemon = data.id;
    input.value= ''; 

  } else {
    pokemonName.innerHTML = 'Not Found';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
  }


}

form.addEventListener('submit', (event) => {

  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
  
});

btnPrev.addEventListener('click', () => {

  if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  } 
  
});

btnNext.addEventListener('click', () => {

  searchPokemon += 1;
  renderPokemon(searchPokemon);
  
});

renderPokemon(searchPokemon);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/src/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}