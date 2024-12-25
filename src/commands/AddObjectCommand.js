export class AddObjectCommand {
    
    constructor( sceneManager, THREE ) {
        this.sceneManager = sceneManager;
        this.THREE = THREE;
    }

    execute() {
        const cube = new this.THREE.Mesh(
            new this.THREE.BoxGeometry(1, 1, 1),
            new this.THREE.MeshStandardMaterial({ color: 0x00ff00 })
        );
        this.sceneManager.addObject( cube );
    }

    undo() {
        this.sceneManager.removeObject( this.object );
    }

}