import Inventory from "./inventory.js";
import Article from "./article.js";

class Main{
    constructor(){
        this._table = new Inventory();
    }
    /////////ANCHOR Crea el objeto
    objProduct(){
        let obj={
            code: Number(document.getElementById("code").value),
            name: document.getElementById("name").value,
            price : document.getElementById("price").value,
            quantity : document.getElementById("quantity").value,
            description : document.getElementById("description").value
        };
        return obj;
    }
    //////////////ANCHOR envia el producto para guardarse
    sendInfoProduct(){
        let object = new Article(this.objProduct());
        this._table.saveProduct(object);
    }
    /////////////ANCHOR Imprime el contenido visualmente normal
    printInventory(){
        let divInventory = document.querySelector("#textInventory");
        this._table.recordInventory();
        divInventory.innerHTML = this._table.text;
    }
    /////////////ANCHOR Imprime el contenido visualmente contrariamente
    reversePrintInventory(){
        let divInventoryReverse = document.querySelector("#reverseTextInventory");
        this._table.reverseRecordInventory();
        divInventoryReverse.innerHTML = this._table.textReverse;
    }
    ///////////ANCHOR Envia el producto a eliminar y llama la funcion de imprimir
    deleteProduct(){
        let productDelete = document.querySelector("#delete").value;
        this._table.quitFromInventory(productDelete);
        this.printInventory();
    }
    ////////////ANCHOR Busca el producto dentro del contenido
    searchProduct(){
        let codeSearch = document.querySelector("#search").value;
        let divResultado = document.querySelector("#resultSearch");
        let res=this._table.consultFromInventory(codeSearch);
        if (res!=null)
            divResultado.innerHTML =res.toString(); 
    }
}
var m = new Main();
//m.default();

let btnAdd = document.querySelector("#btnAdd").addEventListener("click", ()=>{
    m.sendInfoProduct();
    m.printInventory();
    console.log(m);
})
let btnDelete = document.querySelector("#btnDelete").addEventListener("click", ()=>{
    m.deleteProduct();
})
let btnSearch = document.querySelector("#btnSearch").addEventListener("click",()=>{
    m.searchProduct();
})
let btntextReverse = document.querySelector("#btnTextReverse").addEventListener("click",()=>{
    m.reversePrintInventory();
})
