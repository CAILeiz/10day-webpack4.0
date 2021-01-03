class Subject {
    constructor() {
        this.observerCollections = [];
    }
    registerObserver(observer) {
        this.observerCollections.push(observer);
    }
    unregisterObserver(observer) {
        let index = this.observerCollections.indexOf(observer);
        if(index >= 0) this.observerCollections.splice(index, 1);
    }
    notifyObserver() {
        this.observerCollections.forEach(observer => observer.notify());
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    notify() {
        console.log(`${this.name} has been notified`);
    }
}

let subject = new Subject();
let obver1 = new Observer("watcher1")
let obver2 = new Observer("watcher2")
subject.registerObserver(obver1)
subject.registerObserver(obver2)
subject.notifyObserver()
subject.unregisterObserver(obver1)
subject.notifyObserver()
