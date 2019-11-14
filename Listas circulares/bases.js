export default class Bases{
    constructor(bases){
        this._name = bases.name;
        this._minutes  = bases.minutes;
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
    get minutes(){
        return this._minutes;
    }
    set next(newNext){
        this._next = newNext;
    }
    set previous(newPrevious){
        this._previous = newPrevious;
    }
    toString(){
        return this._name + this._minutes;
    }
}