export default class Rutas{
    constructor(){
        this._start = null;
        this._text = "";
        this._textR = "";
        this._counter = 0;
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
            //this._end = this._start;
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
                this._counter--;
            } else if (this._start != null) {
                this._start.previous.next = this._start.next;
                this._start.next.previous = this._start.previous;
                this._start = this._start.next;
                this._counter--;
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
            this._counter--;
        }
    }
    addPosition(data,position){
        if(position <= (this._counter + 1) && (position > 0)){
            if(position == 1){
                if(this._start == null){
                    this._start = data
                }else{
                    this._beforeBegin(data, this._start);
                    this._start = this._start.previous;
                    this._counter++;
                }
            }else{
                let nextStart = this._searchNextStart(position - 1, this._start);
                console.log(nextStart);
                data.next = nextStart.next;
                data.previous = nextStart;
                nextStart.next.previous = data;
                nextStart.next = data;
                this._counter++;
            }
        }else{
            return false;
        }
    }
    _beforeBegin(data, startNext) {
        data.previous = startNext.previous;
        data.next = startNext;
        startNext.previous.next = data;
        startNext.previous = data;
    }
    _searchNextStart(position,start){
        let i = 1;
        let objeto = null
        do{
            if( i == position){
                objeto = start
                return objeto;
            }
            start = start.next; 
            i++;
        } while(start != this._start);
    }
    executeRoute(base, horaI, horaF) {
        console.log(base);
        console.log(horaI);
        console.log(horaF);
        if (this._start != null) {
            let startBase = null;
            if (this._start.name == base) {
                startBase = this._start;
            } else {
                startBase = this._nextStart(base, this._start.next);
            }
            if (startBase != null) {
                this._doRoute(startBase, horaI, horaF);
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
    _doRoute(base, hI, hF) {
        this._textR = "";
        hI = this._miliseconds(hI);
        hF = this._miliseconds(hF);
        console.log(hI);
        console.log(hF);    
        if (hI < hF) {
            this._textR += "Tiempo Actual: " + this._covertToHours(hI) + 
            "Base Actual: " + base.name + "<br>";
            base = base.next;
            do {
                let añadirTiempo = this._minutesToMili(base.minutes);
                hI += añadirTiempo;
                this._textR += "Tiempo Actual: " + this._covertToHours(hI) + 
                "Base Actual: " + base.name + "<br>";
                base = base.next;
            } while (hI < hF);
        } else {
            let counter = 0;
            let horaFin = this._miliseconds("23:59");

            this._textR += this._textR += "Tiempo : " + this._covertToHours(hI) + 
            "Base: " + base.name + "<br>";
            base = base.next;
            do {
                let añadirTiempo = this._minutesToMili(base.minutes);
                hI += añadirTiempo;
                if (hI > horaFin) {
                    hI -= (horaFin + 60000);
                    counter++;
                }
                this._textR += this._textR += "Tiempo : " + this._covertToHours(hI) + "Base: " + base.name + "<br>";
                base = base.next;
            } while ((hI < hF) || (counter == 0));
        }
    }
    ////Imprimir 
    recordObject(){
        this._text = "";
        this._counter
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
        if(hours < 10){
            hours = "0" + hours;
        }
        if(min < 10){
            min = "0" + min;
        }

        return hours + ":" + min;
    }
}