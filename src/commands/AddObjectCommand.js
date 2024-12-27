export class AddObjectCommand {
    
    constructor( sceneManager, THREE ) {
        this.sceneManager = sceneManager;
        this.THREE = THREE;
    }

    execute() {
        
        this.sceneManager.textureLoading.dispatch( '../../assets/textures/crate.jpg' )
        const texture = new THREE.TextureLoader().load( '../../assets/textures/crate.jpg', this.sceneManager.renderScene.dispatch() );
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshLambertMaterial( { map: texture } );
    
        const mesh = new THREE.Mesh( geometry, material );
        // const cube = new this.THREE.Mesh(
        //     new this.THREE.BoxGeometry(1, 1, 1),
        //     new this.THREE.MeshStandardMaterial({ color: 0x00ff00 })
        // );
        this.sceneManager.addObject( mesh );
    }

    undo() {
        this.sceneManager.removeObject( this.object );
    }

}