import {animales} from '../main.js';
import {createCard} from './interface-builder.js'
import Leon from '../animales/variedades/leon.js';
import Lobo from '../animales/variedades/lobo.js';
import Oso from '../animales/variedades/oso.js';
import Serpiente from '../animales/variedades/serpiente.js';
import Aguila from '../animales/variedades/aguila.js';

const preview_card = document.getElementById('preview').parentNode;
let preview_img = null;
let is_img_changed = false;
const obj_animal_varierity_list = [Leon, Lobo, Oso, Serpiente, Aguila]
export let animal_list_to_show = [];

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
 export function resetToDefaultLayer(){
    is_img_changed = false;
    preview_img = null;
    document.getElementById('animal').selectedIndex = 0;
    document.getElementById('edad').selectedIndex = 0;
    document.getElementById('comentarios').value = '';
    preview_card.removeChild(preview_card.lastChild);
    document.getElementById('preview').className = '';
    preview_card.className = 'p-5 card bg-dark';
}

//Validator to ensure that the user complete all the fields before add another animal
export function Validator(){
    if(document.getElementById('animal').selectedIndex == 0){
        alert('No has seleccionado ningún Nombre!');
        return false;
    }else if(document.getElementById('edad').selectedIndex == 0){
        alert('No has seleccionado ninguna Edad!');
        return false;
    }else if(document.getElementById('comentarios').value == ''){
        alert('No has escrito ningún Comentario!');
        return false;
    }
    return true;
}

function animalInstancing(animal_id){
    animal_list_to_show.push(new obj_animal_varierity_list[animal_id](animales[animal_id].name,
        document.getElementById('edad').value,
        animales[animal_id].imagen,
        document.getElementById('comentarios'),
        animales[animal_id].sonido));
}

//Instancing a new object with the data collected from the form and pushing the object to the array
export function AnimalPusher(){
    switch(document.getElementById('animal').value){
        case animales[0].name: animalInstancing(0);
            break;
        case animales[1].name: animalInstancing(1);
            break;
        case animales[2].name: animalInstancing(2);
            break;
        case animales[3].name: animalInstancing(3);
            break;
        case animales[4].name: animalInstancing(4);
            break;
        default: break;
    }
    createCard(animal_list_to_show[animal_list_to_show.length - 1]);
}

export function ChangePreviewImg(){
    if(!is_img_changed){
        document.getElementById('preview').className = 'd-none';
        preview_card.className = 'card bg-dark';
        preview_img = preview_card.appendChild(document.createElement('img'));
        is_img_changed = true;
    }
    preview_img.src = `./assets/imgs/${getAnimalByName(document.getElementById('animal').value).imagen}`;
}