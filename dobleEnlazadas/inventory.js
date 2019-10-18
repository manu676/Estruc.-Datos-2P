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
    ///FIXME hacer validacion
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
    
    /*_ordenado(objData) {
        let start = this._start;
        let aux;
        if (start.code > objData.code) {
            aux = objData;
            aux.next = start;
        } else {
            start = start.next;
            while (start.code < objData.code) {
                start = start.next;
                if(start.next === null)
                {
                    break;
                }
            }
            if(start.next != null)
            {
                aux = objData;
                aux.next = start;
                aux.previous = start.previous;
                start.next.previous = aux;
            }
            
        }
    }*/
    ////ANCHOR Proceso para guardar*/
    consultFromInventory(code) {
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
    console.log(code);
    let start = this._start;
    //let tail = this._tail;
    if (start.code === code) {
        //start= start.next;
        return start = start.next;
        //start.previous = null;
    } else
        //if (tail.code === code){
        return tail.previous = tail;
    //tail = null;
    /*}else{
        let articleMiddle = this._nextStart(code);
        if(articleMiddle == -1){
            return "Not found";
        }else{
            return start.previous.next = start.next;
        }*/
    }
_nextStart(code) {
    let start = this._start;
    let objeto = null;
    while (start.next != null && start.code != code) {
        if (start.next.code === code) {
            objeto = start;
            return objeto;
        }
        start = start.next;
    }
    return -1;
    }
    /*while(start !=null && start.code != code){
        start = start.next;
        start.previous = null;
        }
    if(start === this._start){
        this._start = start.next;
        return  this._start;
    }else if(start === this._tail){
        this._tail = this._tail.previous;
        this._tail = null;
    }
    else{
        if(start.next !=null){
            start.next = start.previous;
            console.log(start.next);
            start.previous = start;
            console.log(start.previous);
            
        }else{
            start.previous.next = start.next;
        }
    }
    this._counter --;
    console.log(this._start);   
    }*/
    /*quitFromInventory(code){
    let previous = null;
    let start = this._start;
    while(start != null){
        if(start.code == code){
            if(start.previous !=null){
                return this._removeFromHead(code);
            }   
            else if(start.next != null){
                return this._removeFromTail(code);
            }
            else{
                previous.next = start.next;
                start.next.previous = previous;
            }
            return start.code;
        }
        previous = start;
        start = start.next;
    }
    return -1;
    }*/
    /////ANCHOR imprime normal;
    recordInventory() {
        this._inventoryString();
    }
    /////ANCHOR imprime contrariamente
    reverseRecordInventory() {
        this._reverseInventoryString();
    }
    _removeFromHead(code) {

        if (this._head === this._tail) {
            this._start = null;
            this._tail = null;
        } else {
            this._start = this._start.next;
            this._start.previous = null;
        }
    }
    _removeFromTail() {
        let value = this._tail.code;
        if (this._tail === this._start) {
            this._start = null;
            this._tail = null;
        } else {
            this._tail = this._tail.previous;
            this._tail.next = null;
        }
        return value;
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