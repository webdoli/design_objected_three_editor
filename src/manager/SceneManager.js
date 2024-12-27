
import { Signals } from "../utils/Signals.js";
import * as THREE from 'three';

export class SceneManager{
    constructor() {
        const aspect = window.innerWidth / window.innerHeight;
        this.scene = new THREE.Scene();
        this.currentCam = new THREE.PerspectiveCamera( 50, aspect, 0.1, 100 );
        this.signals_ = Signals;

        // Signals
        this.objectAdded = new Signals();
        this.objectRemoved = new Signals();
        this.objectSelected = new Signals();
        this.textureLoading = new Signals();

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