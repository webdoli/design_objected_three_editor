import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

export class Viewport {
    constructor( manager ) {

        this.signals = manager.signals_;
        this.container = document.body;

        this.renderer = null;
        this.camera = manager.currentCam;
        this.scene = manager.scene;

        this.objects = [];
        this.grid = this.createGrid();
        this.transformCtrl = this.createTransformCtrl( this.camera, this.container )
    }

    createGrid() {
        
        const grid = new THREE.Group();

        const grid1 = new THREE.GridHelper( 30, 30, 0x888888 );
        grid1.material.color.setHex( 0x888888 );
        grid1.material.vertexColors = false;
        grid.add( grid1 );

        const grid2 = new THREE.GridHelper( 30, 6, 0x222222 );
        grid2.material.color.setHex( 0x222222 );
        grid2.material.depthFunc = THREE.AlwaysDepth;
        grid2.material.vertexColors = false;
        grid.add( grid2 );

        return grid;
    }

    createTransformCtrl( camera_, container_ ) {

        const transformControls = new TransformControls( camera_, container_ );

    }

    render() {
        
    }
}