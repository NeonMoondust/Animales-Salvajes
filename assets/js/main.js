//Imports From modules
import {resetToDefaultLayer, Validator, AnimalPusher, ChangePreviewImg} from './modules/form-control.js';
import {LoadModalInfo, PlayAudio} from './modules/modal_interface.js'
import {container} from './modules/interface-builder.js';
//Export to work with another modules
export let animales;

//-------//TEST-INJECTOR-DEPENDENCY//-------//
//let number_of_animal = 50;
//-------//TEST-INJECTOR-DEPENDENCY//-------//

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

//Listener of the event Click of the 'Registrar' button
document.getElementById('btnRegistrar').onclick = () => {
    if(!Validator()) return;
    AnimalPusher();
    resetToDefaultLayer();
    //TestInjector(number_of_animal);
}

//-------MODAL-------AUDIO-------//

//Listen every click made on interface where the cards are created and filter by the last on the path
//It brings his id and then split it to only send the id-number as parameter of the called method

container.addEventListener('click', (e) => {
    if(e.path[0].id.includes('imagen-')){
        LoadModalInfo(Number(e.path[0].id.split('-')[1]));
    }else if(e.path[1].id.includes('audio-') || e.path[0].id.includes('audio-')){
        PlayAudio(Number((e.path[1].id.includes('audio-') ? e.path[1].id.split('-')[1] : e.path[0].id.split('-')[1])));
    }
  });

//-------//TEST-INJECTOR//-------//

/*let id_count = 1;
function TestInjector(times){
    while(times > 0){
        document.getElementById('animal').selectedIndex = Math.floor(Math.random() * (6 - 1)) + 1;
        document.getElementById('edad').selectedIndex = Math.floor(Math.random() * (7 - 1)) + 1;
        document.getElementById('comentarios').value = `TEST PURPOSE \#${id_count++}`;
        AnimalPusher();
        times--;
    }
    resetToDefaultLayer();
}*/
