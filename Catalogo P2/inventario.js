import Product from "./producto.js";

export default class Inventory{
    constructor(){
        this._inventory = new Array();
        this._text = ""
    }
    ///////Lecturas
    get inventory(){
        return this._inventory;
    }
    get text(){
        return this._text;
    }
    //ANCHOR guardar objeto al vector
    saveProduct(productData) {
        let nuevoProducto = new Product(productData);
        let indice = this._checkExist(productData.code);
        console.log(indice);
        this._inventory[this._inventory.length] = nuevoProducto;
        console.log(nuevoProducto);
        console.log(this._inventory);
    }
    consultFromInventory(codigoX) {
        let inventario = this._inventory;
        let indice = this._checkExist(codigoX);
        if (indice >= 0) {
            return inventario[indice].toString();
        }
    }

    //NOTE verifica la existencia de un objeto en un array
    _checkExist(code) {
        let minimo = 0;
        let maximo = this._inventory.length;
        let medio = Math.trunc(maximo/2);
        let contador = 0;
        if(this._getDifference(maximo,minimo)>2){
            while(medio===code){
                if(this._inventory[medio] > code){
                    maximo = medio;
                    medio = this._getHalf(maximo,minimo);
                    contador = medio;
                }
                else if(code > this._inventory[medio]){
                    minimo = medio;
                    medio += this._getHalf(maximo,minimo);
                    contador =medio;
                }else{
                    console.log("El numero se encuentra en :" + medio); 
                    contador = medio;
                    return contador;
                }
            }
        console.log(contador);
        return contador
        }
        /*else(this._getDifference(maximo,minimo) <= 2)
            console.log("Numero no encontrado");
            contador = -1;
            return contador;*/
    }
    //NOTE  operacion de diferencia y mitad
    _getHalf(x, y) {
        return Math.trunc((x + y) / 2);
    }

    _getDifference(x, y) {
        return (x - y);
    }
    /////////////////////////////////////////////////////////////////
    //ANCHOR borra producto
    quitFromInventory(codigoX) {
        let index = this._checkExist(codigoX);
        if (index >= 0) {
            for (let i = index+1; i <= this._inventory.length; i++) {
                this._inventory[i-1] = this._inventory[i];
            }
        }
        let newInventory = [];
        for(let i = 0; i <= this._ -2; i++) {
            newInventory[i] = this._inventory[i];
        }
        this._inventory = newInventory;
    }
    //////////////////////////////////////////////////////////
    //ANCHOR inventario en texto
    recordInventory(){
        this._listProduct();
    }
    //NOTE hace el recorrido del listado de los objetos  
    _listProduct() {
        //Limpia el texto cada vez que se sobrescribe
        this._text = "";
        for (let i = 0; i < this._inventory.length; i++) {
            //console.log(this._inventory[i].toString());
            this._text += this._inventory[i].toString() + "<br>";
        };
    }
}
let i = new Inventory();
console.log(i.inventory);
i._checkExist();