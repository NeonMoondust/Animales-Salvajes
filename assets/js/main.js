//Imports From modules
import {resetToDefaultLayer, Validator, AnimalPusher, ChangePreviewImg} from './modules/form-control.js';
import {LoadModalInfo, PlayAudio} from './modules/modal_interface.js'
import {container} from './modules/interface-builder.js';
//Export to work with another modules
export let animales;

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

//Listener of the Select to know which img preview
document.getElementById('animal').onchange = () => {ChangePreviewImg()};

//Listener of the event Click of the "Registrar" button
document.getElementById('btnRegistrar').onclick = () => {
    if(!Validator()) return;
    AnimalPusher();
    resetToDefaultLayer();
}

//-------MODAL-------AUDIO-------

container.addEventListener('click', (e) => {
    if(e.path[0].id.includes("imagen-")){
        LoadModalInfo(Number(e.path[0].id.split('-')[1]));
    }else if(e.path[1].id.includes("audio-") || e.path[0].id.includes("audio-")){
        PlayAudio(Number((e.path[1].id.includes("audio-") ? e.path[1].id.split('-')[1] : e.path[0].id.split('-')[1])));
    }
  });