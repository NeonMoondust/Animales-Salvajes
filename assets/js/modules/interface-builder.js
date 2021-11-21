import {animal_list_to_show} from './form-control.js';

export let container;
let div_to_insert = document.getElementById('Animales');

//Creating the layer to crc the inserted cards
(() => {
    container = div_to_insert = div_to_insert.appendChild(document.createElement('div'));
    div_to_insert.className = 'container';
    
    div_to_insert = div_to_insert.appendChild(document.createElement('div'));
    div_to_insert.className = 'row';
    div_to_insert.style.overflowY =  'auto';
    const width = div_to_insert.parentNode.getBoundingClientRect().width;
    div_to_insert.style.height = `${width}px`;

})();

//A card creator with all the needed to insert a new card on html
export function createCard(element){
    //Creating the col div that will contain the card
    let div = div_to_insert.appendChild(document.createElement('div'));
    div.className = 'bg-dark text-white mb-3 col-3';
    div.style.marginLeft = '2.7rem';
    div.style.padding = '0px';
    //Inserting the img with the attributes at the container(col) div
    let img = div.appendChild(document.createElement('img'));
    img.src = `./assets/imgs/${element.img}`;
    img.setAttribute('width', '100%');
    img.height = 200;
    img.setAttribute('data-toggle', 'modal');
    img.setAttribute('data-target', '#exampleModal');
    img.id = `imagen-${animal_list_to_show.length - 1}`;
    //Putting a bottom on the down-side of the element, right before the img
    let button = div.appendChild(document.createElement('div'));
    button = button.appendChild(document.createElement('button'));
    button.className = 'btn btn-secondary w-100';
    button.type = 'button';
    button.id = `audio-${animal_list_to_show.length - 1}`;
    //Including an image of "sound" to the button
    const button_img = button.appendChild(document.createElement('img'));
    button_img.src = './assets/imgs/audio.svg';
    button_img.height = 30;
}