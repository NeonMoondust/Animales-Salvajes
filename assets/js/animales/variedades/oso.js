import Animal from '../animal.js';

class Oso extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido);
    }
    Gruñir(){
        return
    }
}
export default Oso;