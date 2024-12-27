import { SceneManager } from "./manager/SceneManager.js";
import { CommandManager } from "./manager/CommandManager.js";
import { Viewport } from "./ui/Viewport.js";
import { UIManager } from "./ui/UIManager.js";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

const sceneManager = new SceneManager();
const commandManager = new CommandManager();
const uiManager = new UIManager( sceneManager, commandManager );

let current_camera, renderer, camera_perspective, current_control, orbit_control, camera_ortho

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 1.5, 5 );

const init = () => {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement);

    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 5;

    camera_perspective = new THREE.PerspectiveCamera( 50, aspect, 0.1, 100 );
    camera_ortho = new THREE.OrthographicCamera( - frustumSize * aspect, frustumSize * aspect, frustumSize, - frustumSize, 0.1, 100 );
    current_camera = camera_perspective;
    current_camera.position.set( 5, 2.5, 5 );

    const light = new THREE.DirectionalLight( 0xffffff, 2 );
    light.position.set( 1, 1, 1 );
    sceneManager.scene.add( light );

    sceneManager.scene.add( new THREE.GridHelper( 5, 10, 0x888888, 0x444444 ) );

    orbit_control = new OrbitControls( current_camera, renderer.domElement );
    orbit_control.update();
    orbit_control.addEventListener( 'change', render );

    current_control = new TransformControls( current_camera, renderer.domElement );
    current_control.addEventListener( 'change', render );
    current_control.addEventListener( 'dragging-changed', function ( event ) {
        orbit_control.enabled = ! event.value;
    });

    // const texture = new THREE.TextureLoader().load( '../assets/textures/crate.jpg', render );
    // texture.colorSpace = THREE.SRGBColorSpace;
    // texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshLambertMaterial( { map: texture } );

    // const mesh = new THREE.Mesh( geometry, material );

    /*_________________*/
    /*____ Signals ____*/
    /*_________________*/
    sceneManager.objectAdded.add(( obj ) => {
        sceneManager.scene.add( obj );
        current_control.attach( obj );
    });

    sceneManager.textureLoading.add(( texture ) => {
        
    })

    const gizmo = current_control.getHelper();
    sceneManager.scene.add( gizmo );

    /* @@
    window.addEventListener( 'keydown', function ( event ) {

        switch ( event.key ) {

            case 'q':
                current_control.setSpace( current_control.space === 'local' ? 'world' : 'local' );
                break;

            case 'Shift':
                current_control.setTranslationSnap( 1 );
                current_control.setRotationSnap( THREE.MathUtils.degToRad( 15 ) );
                current_control.setScaleSnap( 0.25 );
                break;

            case 'w':
                current_control.setMode( 'translate' );
                break;

            case 'e':
                current_control.setMode( 'rotate' );
                break;

            case 'r':
                current_control.setMode( 'scale' );
                break;

            case 'c':
                const position = current_camera.position.clone();

                current_camera = current_camera.isPerspectiveCamera ? camera_ortho : camera_perspective;
                current_camera.position.copy( position );

                orbit_control.object = current_camera;
                current_control.camera = current_camera;

                current_camera.lookAt( orbit_control.target.x, orbit_control.target.y, orbit_control.target.z );
                onWindowResize();
                break;

            case 'v':
                const randomFoV = Math.random() + 0.1;
                const randomZoom = Math.random() + 0.1;

                camera_perspective.fov = randomFoV * 160;
                camera_ortho.bottom = - randomFoV * 500;
                camera_ortho.top = randomFoV * 500;

                camera_perspective.zoom = randomZoom * 5;
                camera_ortho.zoom = randomZoom * 5;
                onWindowResize();
                break;

            case '+':
            case '=':
                current_control.setSize( current_control.size + 0.1 );
                break;

            case '-':
            case '_':
                current_control.setSize( Math.max( current_control.size - 0.1, 0.1 ) );
                break;

            case 'x':
                current_control.showX = ! current_control.showX;
                break;

            case 'y':
                current_control.showY = ! current_control.showY;
                break;

            case 'z':
                current_control.showZ = ! current_control.showZ;
                break;

            case ' ':
                current_control.enabled = ! current_control.enabled;
                break;

            case 'Escape':
                current_control.reset();
                break;

        }

    });

    window.addEventListener( 'keyup', function ( event ) {

        switch ( event.key ) {

            case 'Shift':
                current_control.setTranslationSnap( null );
                current_control.setRotationSnap( null );
                current_control.setScaleSnap( null );
                break;

        }

    });
    */


}

function onWindowResize() {

    const aspect = window.innerWidth / window.innerHeight;

    camera_perspective.aspect = aspect;
    camera_perspective.updateProjectionMatrix();

    camera_ortho.left = camera_ortho.bottom * aspect;
    camera_ortho.right = camera_ortho.top * aspect;
    camera_ortho.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

function render() {
    renderer.render( sceneManager.scene, current_camera );
}

// const animate = () => {
//     requestAnimationFrame(animate);
//     renderer.render( sceneManager.scene, camera );
// };

init();
// animate();