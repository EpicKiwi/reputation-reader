const Rx = require("rxjs");

class Store {

    constructor(){
        this.state = {};
        this.actionSubjects = {};
        this.commitSubject = new Rx.Subject()
    }

    commit(action,options){
        let actionName = action+"Action"
        if(!this[actionName] || typeof this[actionName] != 'function') throw new Error("No action named "+actionName+" on this store");
        let payload = {
            id: this.generateId(),
            date: new Date(),
            action: action,
            options: options,
            state: this.state,
            store: this.constructor.name
        };
        let result = this[actionName](options,payload);
        if(result === false) return;
        if(this.actionSubjects[action]){
            this.actionSubjects[action].next(payload)
        }
        this.commitSubject.next(payload)
        return payload;
    }

    getCommitObservable(){
        return this.commitSubject
    }

    getActionObservable(action){
        if(!this.actionSubjects[action])
            this.actionSubjects[action] = new Rx.Subject()
        return this.actionSubjects[action]
    }

    generateId(){
        return (new Date()).getTime().toString(16)+""+Math.round(Math.random()*999999).toString(16)
    }

}

module.exports = Store;