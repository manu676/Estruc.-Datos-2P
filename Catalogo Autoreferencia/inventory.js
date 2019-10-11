export default class Inventory {
    constructor() {
        this._start = null;
        this._text = "";
        this._textReverse = "";
    }
    //////////////////Lectura
    get end() {
        return this._end;
    }
    get start() {
        return this._start;
    }
    get text() {
        return this._text;
    }
    get textReverse() {
        return this._textReverse;
    }
    get textConsult() {
        return this._textConsult;
    }
    /////////////////Escritura
    set next(next) {
        this._next = next;
    }
    set end(end) {
        this._end = end;
    }
    set start(start) {
        this._start = start;
    }
    /////ANCHOR  Guardar un producto
    ///FIXME hacer validacion
    saveProduct(objData) {
        let chequeo = this._checkExist(code);
        console.log(chequeo);
        if (chequeo >= 0) {
            alert("Ya existe un producto con ese codigo");

        } else {
            if (this._start == null) {
                this._start = objData;
            } else {
                let start = this._start;
                while (start.next != null) {
                    start = start.next;
                }
                start.next = objData;
            }
        }
    }
    ////ANCHOR Proceso para guardar*/
    consultFromInventory(code) {
        console.log(code);
        let articleSearch = this._checkExist(code);
        console.log(articleSearch);
        if (articleSearch == -1) {
            return "No existe el producto";
        }
        return articleSearch.toString();
        //
    }
    /////////ANCHOR Eliminar del inventario
    /////FIXME No borra el primero
    quitFromInventory(code) {
        let start = this._start;
        if (start.code === code) {
            //start= start.next;
            start.next = start;
        } else {
        let articleNext = this._nextStart(code);
            if (articleNext == -1) {
                return "Not found";
            } else {
                return articleNext.next = articleNext.next.next;
            }
        }
    }
    /////ANCHOR imprime normal;
    recordInventory() {
        this._inventoryString();
    }
    /////ANCHOR imprime contrariamente
    reverseRecordInventory() {
        let start = this._start;
        this._reverseInventoryString(start);
    }
    //////ANCHOR añadir a una posicion
    ///FIXME  NO inserta 
    addPosition(position, product){
        if (position == 1){
            product.next = this._start; 
            this._start = product;
        }else{
            for(let i = 1; i < position ; i++){
                if(i == position){
                    return this._start;
                }else{
                    this._start = this._start.next;
                }
            }
            //let productPosition = this._positionNext(position);
            if (this._start.next == -1) {
                return "Not found";
            } else {
                product.next = this._start.next;
                this._start.next = product;
            }
        }
    }
    /*_positionNext(position){
        for(let i = 1; i < position; i++){
            if(i == position){
                return this._start;
            }else{
                this._start = this._start.next;
            }
        }
    }*/
    /////NOTE Recorrer la lista
    _nextStart(code) {
        let start = this._start;
        let objeto = null;
        while (start.next!= null) {
            if (start.next.code == code) {
                objeto = start;
                return objeto;
            }
            start = start.next;
        }
        return -1;
    }
    /////NOTE checa la existencia 
    _checkExist(code) {
        let start = this._start;
        let objeto = null;
        while (start != null) {
            if (start.code == code) {
                objeto = start;
                return objeto;
            } else {
                start = start.next;
            }
        }
        return -1;
    }
    
    /////NOTE Desde el inicio hasta el fin para impresion
    _inventoryString() {
        let start = this._start;
        this._text = "";
        while (start != null) {
            this._text += start.toString() + "<br>";
            start = start.next;
        }
    }
    /////NOTE Desde el fin hasta el inicio para impresion
    _reverseInventoryString(start) {
        this._textReverse = "";
        if(start !=null){
            if(start.next != null){
                this._reverseInventoryString(start.next);
            }
            this._textReverse += start.toString() + "<br>";
        }
    }
}