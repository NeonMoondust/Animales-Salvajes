import Animal from './animal.js';
import Leon from './leon.js';
import Lobo from './lobo.js';
import Oso from './oso.js';
import Serpiente from './serpiente.js';
import Aguila from './aguila.js';

const preview_card = document.getElementById('preview').parentNode;
let div_to_insert = document.getElementById('Animales');

let animales, animal_list_to_show = [];
let select_nombre = '', select_edad = '', txtArea_comentario = '';
let modal_img, modal_age, modal_comment;

let container;
let preview_img = null;
let is_img_changed = false;

//Fetching data from json and saving it in a variable
(async () =>{
    try{
        const request = await fetch('animales.json');
        const json = await request.json();
        animales = json['animales'];
    }catch(e){
        console.log(e);
    }
})();

//Creating the layer to crc the inserted cards
(() => {
    container = div_to_insert = div_to_insert.appendChild(document.createElement('div'));
    div_to_insert.className = 'container';
    
    div_to_insert = div_to_insert.appendChild(document.createElement('div'));
    div_to_insert.className = 'row';
})();


//Setting up modal Structure.
(() => {
    const main_parent = document.querySelector('.modal-body');
    main_parent.className = 'text-center text-light';

    modal_img = main_parent.appendChild(document.createElement('img'));
    modal_img.style.marginBottom = '1rem';
    modal_img.setAttribute('width', '100%');

    modal_age = main_parent.appendChild(document.createElement('p'));
    modal_age.style.marginBottom = '1rem';

    main_parent.appendChild(document.createElement('h5')).textContent = 'Comentarios';

    modal_comment = main_parent.appendChild(document.createElement('p'));
    modal_comment.style.margin = '2rem 0px';
})();

//Validator to ensure that the user complete all the fields before add another animal
function Validator(){
    if(select_nombre == ''){
        alert('No has seleccionado ningún Nombre!');
        return false;
    }else if(select_edad == ''){
        alert('No has seleccionado ninguna Edad!');
        return false;
    }else if(txtArea_comentario == ''){
        alert('No has escrito ningún Comentario!');
        return false;
    }
    return true;
}

//A card creator with all the needed to insert a new card on html
function createCard(element){
    //Creating the col div that will contain the card
    let div = div_to_insert.appendChild(document.createElement('div'));
    div.className = 'bg-dark text-white mb-2 col-3';
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

//Instancing a new object with the data collected from the form and pushing the object to the array
function AnimalPusher(){
    switch(document.getElementById('animal').value){
        case animales[0].name:
            animal_list_to_show.push(new Leon(animales[0].name,
                select_edad,
                animales[0].imagen,
                txtArea_comentario,
                animales[0].sonido));
            break;
        case animales[1].name:
            animal_list_to_show.push(new Lobo(animales[1].name,
                select_edad,
                animales[1].imagen,
                txtArea_comentario,
                animales[1].sonido));
            break;
        case animales[2].name:
            animal_list_to_show.push(new Oso(animales[2].name,
                select_edad,
                animales[2].imagen,
                txtArea_comentario,
                animales[2].sonido));
            break;
        case animales[3].name:
            animal_list_to_show.push(new Serpiente(animales[3].name,
                select_edad,
                animales[3].imagen,
                txtArea_comentario,
                animales[3].sonido));
            break;
        case animales[4].name:
            animal_list_to_show.push(new Aguila(animales[4].name,
                select_edad,
                animales[4].imagen,
                txtArea_comentario,
                animales[4].sonido));
            break;
        default: break;
    }
    createCard(animal_list_to_show[animal_list_to_show.length - 1]);
}

//Get the animal object asking for the name
function getAnimalByName(animal_to_search){
    let animal_to_return;
    animales.forEach(element => {
        if(element.name === animal_to_search){
            animal_to_return = element;
            return;
        }
    });
    return animal_to_return;
}

//Reset to default the form
function resetToDefaultLayer(){
    is_img_changed = false;
    preview_img = null;
    document.getElementById('animal').selectedIndex = 0;
    document.getElementById('edad').selectedIndex = 0;
    document.getElementById('comentarios').value = '';
    preview_card.removeChild(preview_card.lastChild);
    document.getElementById('preview').className = '';
    preview_card.className = 'p-5 card bg-dark';
    select_nombre = '';
    select_edad = '';
    txtArea_comentario = '';
}

//Listener of Age selector
document.getElementById('edad').onchange = () => {select_edad = document.getElementById('edad').value;};

//Listener of the Select to know which img preview
document.getElementById('animal').onchange = () => {
    if(!is_img_changed){
        document.getElementById('preview').className = 'd-none';
        preview_card.className = 'card bg-dark';
        preview_img = preview_card.appendChild(document.createElement('img'));
        is_img_changed = true;
    }
    preview_img.src = `./assets/imgs/${getAnimalByName(document.getElementById('animal').value).imagen}`;
    select_nombre = document.getElementById('animal').value;
};

//Listener to a KeyUp of "Comentarios" textArea
document.getElementById('comentarios').onkeyup = () =>{txtArea_comentario = document.getElementById('comentarios').value}

//Listener of the event Click of the "Registrar" button
document.getElementById('btnRegistrar').onclick = () => {
    if(!Validator()) return;
    AnimalPusher();
    resetToDefaultLayer();
}

//-------MODAL-------AUDIO-------

function LoadModalInfo(id_number){
    const obj_animal = animal_list_to_show[id_number];
    modal_img.src = `./assets/imgs/${obj_animal.img}`;
    modal_age.textContent = obj_animal.edad;
    modal_comment.textContent = obj_animal.comentarios;
}

function PlayAudio(id_number){
    const obj_animal = animal_list_to_show[id_number];
    const player = document.getElementById('player');
    player.src = `./assets/sounds/${obj_animal.sonido}`;
    player.load();
    player.play();
}

container.addEventListener('click', (e) => {
    if(e.path[0].id.includes("imagen-")){
        LoadModalInfo(Number(e.path[0].id.split('-')[1]));
    }else if(e.path[1].id.includes("audio-")){
        PlayAudio(Number(e.path[1].id.split('-')[1]));
    }
  });