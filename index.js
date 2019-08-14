function init() {
    var step = 0, convexMesh;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.x = 50;
    camera.lookAt(new THREE.Vector3(10, 0, 0));
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor('pink');
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    var axes = new THREE.AxesHelper(20);
    $("#demo").append(renderer.domElement);

    function generatePoint() {
        var points = [];
        for (var i = 0; i < 20; i++) {
            var randomX = -15 + Math.round(Math.random() * 30);
            var randomY = -15 + Math.round(Math.random() * 30);
            var randomZ = -15 + Math.round(Math.random() * 30);
            points.push(new THREE.Vector3(randomX, randomY, randomZ));
        }

        spGroup = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: false});

        points.forEach(function (point) {
            var spGeom = new THREE.SphereGeometry(0.2);
            var spMesh = new THREE.Mesh(spGeom, material);
            spMesh.position.copy(point);
            spGroup.add(spMesh);
        })

        scene.add(spGroup);
        var convexGeometry = new THREE.ConvexGeometry(points);
        convexMesh = createMesh(convexGeometry);
        scene.add(convexMesh);
    }
    function createMesh(geom) {
        var meshMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.2});
        meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshBasicMaterial();
        wireFrameMat.wireframe = true;
    
        // create a multimaterial
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);
    
        return mesh;
    }
    function render() {
        spGroup.rotation.y = step;
        convexMesh.rotation.y = step += 0.01;
    
        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    generatePoint();
    render(scene, camera);
}

window.onload = init();
