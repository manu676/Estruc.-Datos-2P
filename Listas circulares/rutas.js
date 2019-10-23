export default class Rutas{
    constructor(){
        this._start = null;
        this._end = null;
        this._text = "";
        this._textR = "";
    }
    get start(){
        return this._start;
    }
    get end(){
        return this._end;
    }
    get text(){
        return this._text;
    }
    get textR(){
        return this._textR;
    }
    set start(start){
        this._start = start;
    }
    set end(end){
        this._end = end;
    }
    saveObject(objData){
        if(this._start == null){
            this._start = objData;
            this._start.next = this._start;
            this._start.previous = this._start;
            this._end = this._start;
            this._counter++;
        }
        else if (this._start.next == this._start){
            this._start.next = objData;
            this._start.previous = objData;
            objData.previous = this._start;
            objData.next = this._start;
            this._counter++;
        }else{
            let startNew = this._start;
            objData.previous = startNew.previous;
            objData.next = startNew;
            startNew.previous.next = objData;
            startNew.previous = objData;
            this._counter++;
        }
    }
    consultFromRegister(code) {
            if (this._start.name == code) {
                return this._start.toString();
            } else {
                let base = this._checkExist(code, this._start.next);
                if (base == null) {
                    return "Not found";
                } else {
                    return base.toString();
                }
            }
        }
    _checkExist(code,starNew) {
        while (starNew != this._start) {
            if (starNew.name == code) {
                return starNew;
            }
            starNew = starNew.next;
        }
        return null;
    }
    quitFromRegister(base) {
        if (this._start.name == base) {
            if (this._start.next == this._start) {
                this._start = null;
            } else if (this._start != null) {
                this._start.previous.next = this._start.next;
                this._start.next.previous = this._start.previous;
                this._start = this._start.next;
            }
        } else {
            this._find(base);
        }
    }
    _find(name) {
        let base = this._nextStart(name, this._start.next);
        if (base == null) {
            return;
        } else {
            base.next.previous = base.previous;
            base.previous.next = base.next
        }
    }
    executeRoute(base, hour1, hour2) {
        if (this._start != null) {
            let startBase = null;
            if (this._start.name == base) {
                startBase = this._start;
            } else {
                startBase = this._nextStart(base, this._start.next);
            }
            if (startBase != null) {
                this._doRoute(startBase, hour1, hour2);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    _nextStart(base, start) {
        while (start != this._start) {
            if (start.name == base) {
                return start;
            }
            start = start.next;
        }
        return null;
    }
    ////Imprimir 
    recordObject(){
        this._text = "";
        if (this._start != null) {
            this._text += this._start.toString() + "<br>";
            this._stringInventory(this._start.next);
        }
    }
    _stringInventory(startNext) {
        if (startNext != this._start) {
            this._text += startNext.toString() + "<br>";
            this._stringInventory(startNext.next);
        }
    }
    ///horas a milisegundos
    _miliseconds(hour){
        hour = hour.split(":");
        let hours = hour[0];
        let min = hour[1];
        let mili = (hours*3600000)+ (min * 60000);
        return mili;
    }
    ////Minutos a milisegundos
    _minutesToMili(min){
        let mili = min *60000;
        return mili;
    }
    ////Covertir todo a hora
    _covertToHours(mili){
        let min = parseInt((mili / (1000*60)))%60;
        let hours = parseInt((mili / (1000*60*60))) %24;
        if(min < 10){
            min += 0;
        }
        if(hours < 10){
            hours += 0;
        }
        return hours + " : " + min;
    }
}