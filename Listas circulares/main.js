import Bases from "./bases.js";
import Rutas from "./rutas.js";
let divString = document.querySelector("#textString");
let divRoute = document.querySelector("#showRoute");
class Main{
    constructor(){
        this._registro = new Rutas();
    }
    getInfo(){
        let object ={
            name : document.querySelector("#name").value,
            minutes : document.querySelector("#minutes").value
        };
        let objBase = new Bases(object)
        return objBase;
    }
    sendInfo(){
        divString.innerHTML = "";
        let objectInfo = this.getInfo();
        this._registro.saveObject(objectInfo);
        this.printStrings()
    }
    printStrings(){
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
        divString.innerHTML = "";
        let validate = this._registro.addPosition(this.getInfo(),position);
        if(validate == false){
            divString.innerHTML = "No se puede realizar"
        }else{
            this.printStrings();
        }
        
    }
    startJob(base,horaI,horaF){
        divRoute.innerHTML = "";
        if(this._registro.executeRoute(base, horaI, horaF) == false) {
            divRoute.innerHTML = "No se pudo iniciar";
        } else {
            this._showR();
        }
    }
    _showR() {
        divRoute.innerHTML = this._registro.textR;
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
let btnInsert = document.getElementById("btnInsert").addEventListener("click", ()=>{
    let position = document.querySelector("#position").value;
    m.insertObject(position);
});

let btnStart = document.querySelector("#start").addEventListener("click", ()=>{
    let baseIniciar = document.querySelector("#startBase").value;
    let horaInicio = document.querySelector("#startHour").value;
    let horaFin = document.querySelector("#finishHour").value;
    m.startJob(baseIniciar,horaInicio,horaFin);
})
