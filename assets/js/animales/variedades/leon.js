import Animal from '../animal.js';

class Leon extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido);
    }
    Rugir(){
        Audio(this.sonido).play();
    }
}
export default Leon;