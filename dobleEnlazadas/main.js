import Inventory from "./inventory.js";
import Article from "./article.js";

class Main{
    constructor(){
        this._table = new Inventory();
    }
    default(){
        let obj1 = {
            code: "001",      
            name: "Camisa",        
            price: "$10" ,   
            quantity:  "40" ,     
            description: "Camisa Negra"      
        };
        let obj2 = {
            code: "002",      
            name: "Pantalon",        
            price: "$12" ,   
            quantity:  "30" ,     
            description: "Pantalon Negro"      
        };
        //Meterlos directamente a la funcion del Inventario
        let objeto1 = new Article(obj1), objecto2 = new Article(obj2);
        this._table.saveProduct(objeto1);
        this._table.saveProduct(objecto2);
        //Va a mostrar el inventario
        this.printInventory();
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
        
        divResultado.innerHTML = this._table.consultFromInventory(codeSearch);
    }
    ////////////ANCHOR Envia un producto y una posicion para ser agregado
    insertProduct(position,product){
        this._table.addPosition(position,product);
    }

}
var m = new Main();
m.default();

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

let btnInsert = document.querySelector("#btnInsert").addEventListener("click",()=>{
    let position = document.querySelector("#position").value;
    let product = m.objProduct();
    m.insertProduct(position,product);
    m.printInventory();
})
