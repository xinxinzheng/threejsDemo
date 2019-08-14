function init(a, b, c) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerheight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor('gray');
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.x = -30,
    camera.position.y = 40,
    camera.position.z = 50;
    camera.lookAt(new THREE.Vector3(10, 0, 0));
    var latheMesh, spGroup;
    var step = 0;

    $("#demo").append(renderer.domElement);

    function generatePoints(segments, phiStart, phiLength) {
        var points = [];
        var height = 5;
        var count = 30;

        for(var i = 0; i < count; i++) {
            points.push(new THREE.Vector3((Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12, 0, (i - count) + count / 2));
        }

        var sphereMesh = new THREE.MeshBasicMaterial({color:'yellow', transparent: false});

        spGroup = new THREE.Object3D();
        points.forEach(function (point) {
            var sphere = new THREE.SphereGeometry(0.2);
            var sMesh = new THREE.Mesh(sphere, sphereMesh);
            sMesh.position.copy(point);
            spGroup.add(sMesh);
        })

        scene.add(spGroup);

        var latheGeo = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
        latheMesh = createMesh(latheGeo);
        scene.add(latheMesh);
        render(scene, camera);
    }

    function createMesh(geo) {
        var mesh = new THREE.MeshBasicMaterial();
        mesh.side = THREE.DoubleSide;
        var wiremesh = new THREE.MeshBasicMaterial();
        wiremesh.wireframe = true;
        var meshs = THREE.SceneUtils.createMultiMaterialObject(geo, [mesh, wiremesh]);
    
        return meshs;
    }

    function render() {
        spGroup.rotation.x = step;
        // latheMesh.rotation.x = step += 0.01;
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    generatePoints(a, b, c);

}

window.onload = function() {
    init(20, 2, Math.PI * 2);
};