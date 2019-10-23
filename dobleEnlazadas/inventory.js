export default class Inventory {
    constructor() {
        this._start = null;
        this._tail = null;
        this._counter = 0;
        this._text = "";
        this._textReverse = "";
    }
    //////////////////Lectura
    get start() {
        return this._start;
    }
    get tail() {
        return this._tail;
    }
    get text() {
        return this._text;
    }
    get textReverse() {
        return this._textReverse;
    }
    get counter() {
        return this._counter;
    }
    /////////////////Escritura
    set start(start) {
        this._start = start;
    }
    set tail(tail) {
        this._tail = tail;
    }
    /////ANCHOR  Guardar un producto
    saveProduct(objData){
        if(this._start != null){
            let start = this._start;
            while(start.next !=null && objData.code > start.code){
                start = start.next;
            }
            if(objData.code < start.code){
                if(start != this._start){
                    start.previous.next = objData;
                    objData.previous = start.previous;
                    objData.next = start;
                    start.previous = objData;
                }else{
                    this._start = objData;
                    objData.next = start;
                    start.previous = objData;
                }
            }else{
                start.next = objData;
                objData.previous = start;
            }
            this._tail = start.next;
            
        }else{
            this._start = objData;
        }
    }
    ////ANCHOR Proceso para guardar*/
    consultFromInventory(code) {
    let articleSearch = this._checkExist(code);
    console.log(articleSearch);
    if (articleSearch == -1) {
        return "No existe el producto";
    }
    return articleSearch.toString();
    }
    /////////ANCHOR Eliminar del inventario
    quitFromInventory(code) {
        if (this._start.code == code) {
            this._start = this._start.next;
            if (this._start != null) {
                this._start.previous = null;
            }
            if (this._start == this._end) {
                this._end = null;
            }
        } else {
            this._find(code);
        }
    }

    _find(code) {
        let product = this._nextStart(code, this._start);
        if (product == null) {
            return;
        } else {
            if (product == this._end) {
                if (product.previous == this._start) {
                    console.log("B");
                    this._start.next = null;
                    this._end = null;
                    console.log(this._start);
                } else {
                    this._end = product.previous;
                    this._end.next = null;
                }
            } else {
                product.next.previous = product.previous;
                product.previous.next = product.next;
            }
        }
    }
    _nextStart(code, start) {
        while ((start != null) && (start.code <= code)) {
            if (start.code == code) {
                return start;
            }
            start = start.next;
        }
        return null;
    }
    /////ANCHOR imprime normal;
    recordInventory() {
        this._inventoryString();
    }
    /////ANCHOR imprime contrariamente
    reverseRecordInventory() {
        this._reverseInventoryString();
    }
    /////NOTE checa la existencia 
    _checkExist(code) {
        let start = this._start;
        let objeto = null;
        while (start != null && objeto === null) {
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
    _reverseInventoryString() {
        let cola = this._tail;
        this._textReverse = "";
        while (cola != null) {
            this._textReverse += cola.toString() + "<br>";
            cola = cola._previous;
        }
        return this._textReverse;
    }
}