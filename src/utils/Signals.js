export class Signals {
    constructor() {
        this.listeners = [];
    }

    add( listener ) {
        this.listeners.push( listener );
    }

    dispatch( ...args ) {

        // dispatch가 수 천개가 넘을 시에는 for구문이 더 나음
        // for (let i = 0; i < this.listeners.length; i++) {
        //     this.listeners[i](...args);
        // }

        this.listeners.forEach( listener => listener( ...args ) )
    }

}