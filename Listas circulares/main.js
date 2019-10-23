import Bases from "./bases.js";
import Rutas from "./rutas.js";

class Main{
    constructor(){
        this._registro = new Rutas();
    }
    _getInfo(){
        let objBases ={
            name : document.querySelector("#name").value,
            minutes : document.querySelector("#minutes").value
        };
        return objBases;
    }
    sendInfo(){
        let objectInfo = new Bases(this._getInfo());
        this._registro.saveObject(objectInfo);
    }
    printStrings(){
        let divString = document.querySelector("#textString");
        this._registro.recordObject();
        divString.innerHTML = this._registro.text;
    }
    deleteObject(){
        let objectProduct = document.querySelector("#deleteObject").value;
        this._registro.quitFromRegister(objectProduct);
        this.printStrings();
    }
    searchObject(){
        let codeSearch = document.querySelector("#searchObject").value;
        let divResultado = document.querySelector("#resultSearch");
        divResultado.innerHTML = this._registro.consultFromRegister(codeSearch);
    }
    insertObject(position){
        let product = new Base(this._getInfo());
        this._registro.addPosition(position,product);
    }
    _showRoute() {
        let divRoute = document.querySelector("#showRoute");
        divRoute.innerHTML = this._registro.textR;
    }
    startJob(base,hour1,hour2){
        let divRoute = document.querySelector("#showRoute");
        divRoute.innerHTML = "";
        if(this._registro.executeRoute(base, hour1, hour2) == false) {
            divRoute.innerHTML = "Base not found";
        } else {
            this._showRoute();
        }
    }
}

var m = new Main();

let btnAdd = document.getElementById("btnAdd").addEventListener("click", ()=> {
    m.sendInfo();
    m.printStrings();
    console.log(m);
});
let btnSearch = document.getElementById("btnSerch").addEventListener("click", ()=>{
    m.searchObject();
});
let btnDelete = document.getElementById("btnDelete").addEventListener("click", ()=>{
    m.deleteObject();
});
let btntextReverse = document.querySelector("#btnTextReverse").addEventListener("click",()=>{
    m.reversePrintString();
});
let btnInsert = document.getElementById("btnInsert").addEventListener("click", ()=>{
    let position = document.querySelector("#position").value;
    m.insertObject(position);
    m.printStrings();
});
let btnStart = document.querySelector("#start").addEventListener("click", ()=>{
    let baseIniciar = document.querySelector("#startBase").value;
    let horaInicio = document.querySelector("#startHour").value;
    let horaFin = document.querySelector("#finishHour").value;
    m.startJob(baseIniciar,horaInicio,horaFin);
})
