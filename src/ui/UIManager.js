import { AddObjectCommand } from "../commands/AddObjectCommand.js";

export class UIManager {

    constructor( sceneManager, commandManager, THREE ) {
        
        this.sceneManager = sceneManager;
        this.commandManager = commandManager;
        this.selectedObject = null;
        this.THREE = THREE;
        this.initUI();
    }

    initUI() {
        // Add Cube button
        document.getElementById('addCube').addEventListener('click', () => {
            // const cube = new this.THREE.Mesh(
            //     new this.THREE.BoxGeometry(1, 1, 1),
            //     new this.THREE.MeshStandardMaterial({ color: 0x00ff00 })
            // );
            const command = new AddObjectCommand( this.sceneManager, this.THREE );
            this.commandManager.execute( command );
        })
    }

}