export default class Bases{
    constructor(bases){
        this._name = bases.name;
        this._minutosAlProximo  = bases.minutes;
        this._next = null;
        this._previous = null;
    }
    get name(){
        return this._name;
    }
    get next(){
        return this._next;
    }
    get previous(){
        return this._previous;
    }
    get minutos(){
        return this._minutosAlProximo;
    }
    set next(newNext){
        this._next = newNext;
    }
    set previous(newPrevious){
        this._previous = newPrevious;
    }
    set minutos(newMinutos){
        this._minutosAlProximo = newMinutos;
    }
    toString(){
        return this._name + this._minutosAlProximo;
    }
}