import Animal from './animal.js';

class Lobo extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido);
    }
    Aullar(){
        return
    }
}
export default Lobo;