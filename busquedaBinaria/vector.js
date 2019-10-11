class vector{
    constructor(){
        this._vector = new Array(100);
    }
    get vector(){
        return this._vector;
    }
    numerosAleatorios(){
        let vector = this._vector
        for(let i = 0; i <=100 ; i++){
            vector[i] = (Math.ceil(Math.random()*1000) +1)
        }
        vector.sort(function(a,b){
            return a-b;
        })
        console.log(vector);
    }
    buscarNumero(numero){
        let minimo = 0;
        let maximo = this._vector.length;
        let medio = Math.trunc(maximo/2);
        while((maximo - minimo) > 2){
            if(this._vector[medio] > numero){
                maximo = medio;
                medio = Math.trunc((maximo-minimo)/2);
            }
            else if(numero > this._vector[medio]){
                minimo = medio;
                medio += Math.trunc((maximo-minimo)/2)
            }else{
                console.log("El numero se encuentra en :" + medio); 
                break;
            }/*console.log ("El numero ingresado no existe") 
            break;*/
        }
        if((maximo-minimo) <= 2){
            return console.log("Numero no encontrado");
        }
    }
}
var v = new vector();
console.log(v);
v.numerosAleatorios();
let btnIngresarNumero = document.querySelector("#btnIngresar").addEventListener("click",()=>{

    let numero = document.getElementById("numeroBuscar").value;
    v.buscarNumero(numero);
})

//v.llenarCasillas();