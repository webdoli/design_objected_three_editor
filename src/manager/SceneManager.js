
import { Signals } from "../utils/Signals.js";

export class SceneManager{
    constructor( THREE ) {
        this.scene = new THREE.Scene();
        this.objectAdded = new Signals();
        this.objectRemoved = new Signals();
        this.objectSelected = new Signals();

        this.initListeners(); // Signals 리스너 등록
    }

    addObject( obj ) {
        this.objectAdded.dispatch( obj );
    }

    removeObject( obj ) {
        this.objectRemoved.dispatch( obj );
    }

    selectObject( obj ) {
        this.objectSelected.dispatch( obj );
    }

    // Signals 이벤트 등록
    initListeners() {
        // this.objectAdded.add( obj => this.scene.add( obj ) );
        this.objectRemoved.add( obj => this.scene.remove( obj ) );
        this.objectSelected.add( obj => console.log('selected obj: ', obj ) );
    }

}