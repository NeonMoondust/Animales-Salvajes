import {animal_list_to_show} from './form-control.js'
let modal_img, modal_age, modal_comment;
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

export function LoadModalInfo(id_number){
    const obj_animal = animal_list_to_show[id_number];
    modal_img.src = `./assets/imgs/${obj_animal.img}`;
    modal_age.textContent = obj_animal.edad;
    modal_comment.textContent = obj_animal.comentarios;
}

export function PlayAudio(id_number){
    const obj_animal = animal_list_to_show[id_number];
    const player = document.getElementById('player');
    player.src = `./assets/sounds/${obj_animal.sonido}`;
    player.load();
    player.play();
}