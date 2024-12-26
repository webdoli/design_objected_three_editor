export class AddObjectCommand {
    
    constructor( sceneManager, THREE ) {
        this.sceneManager = sceneManager;
        this.THREE = THREE;
    }

    execute() {
        // 외부에서 createCube class가져오기
        // 이래서 mr.doop은 Viewport.js라는 Manager겸 뷰포트를 만들어서 Viewport를 각 인터페이스로 모두 보냈구나.
        // 왜냐하면 Viewport에 three.js 랜더러와 씬 카메라가 있으니깐 Viewport 클래스 아니 프로토타입 함수의 값을 다른 곳에서 사용할 수가 있으니깐
        // 여기서 Viewport.renderer라고 하면 바로 사용할 수 있잖아?
        // 내일 SceneManager.js를 Viewport.js로 만들어 해당 인터페이스를 다른 곳에 사용하도록 설계를 해보자.
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