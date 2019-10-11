export default class Product{
    constructor(item){
        this._code = item.code;
        this._name = item.name;
        this._price = item.price;
        this._quantity = item.quantity;
        this._description = item.description;
    }
    /////////Lecturas
    get code(){
        return this._code;
    }
    get name(){
        return this._name;
    }
    get price(){
        return this._price;
    }
    get quantity(){
        return this._quantity;
    }
    get description(){
        return this._description;
    }
    ////////Escrituras
    set price(price){
        this._price = price;
    }
    set quantity(quantity){
        this._quantity = quantity;
    }
    set description (description){
        this._description = description;
    }
    /////////String
    toString(){
        return "El producto " + this._name + 
        " con el codigo " + this._code + 
        " tiene el costo de $" + this._price + 
        " hay de existencia " + this._quantity + " . " + 
        " Tiene la descripcion de " + this._description;
    }
}