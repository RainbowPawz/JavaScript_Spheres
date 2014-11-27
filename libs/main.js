var container, stats;
var camera, controls, scene, projector,particles, renderer,geometry, material, i, h, color, colors = [], sprite, size;
var objects = [], plane;
var spritey;
var light = new THREE.SpotLight( 0xffffff, 1.5 );
var nodeColor = new THREE.Color(Math.random() * 0xffffff);
var geoSize;
var mouse = new THREE.Vector2(),
        offset = new THREE.Vector3(),
        INTERSECTED,OUTLINE, SELECTED;

function createView() {

    init();
    createSpheres(14);
    createMenu();
    animate();

}

function init() {


    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    scene = new THREE.Scene();

    scene.add( new THREE.AmbientLight( 0x505050 ) );

    light.position.set( 0, 500, 2000 );
    light.castShadow = true;

    light.shadowCameraNear = 1;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 100;

    light.shadowBias = -0.00000022;
    light.shadowDarkness = 0.9;

    light.shadowMapWidth = 10;//2048
    light.shadowMapHeight = 10;//2048
    //scene.fog = new THREE.FogExp2( 0x000000, 0.000009 );
    scene.add( light );

    geometry = new THREE.Geometry();

    sprite = THREE.ImageUtils.loadTexture( "images/ball.png" );

    for ( var i = 0, l = 1000; i < l; i ++) {

        var vertex = new THREE.Vector3();

        var phi = Math.acos( -1 + ( 2 * i ) / l );
        var theta = Math.sqrt( l * Math.PI ) * phi;

       var varx = 15000 * Math.random() - 7500;//5000 * Math.cos( theta )* Math.random()-2500;// * Math.sin( phi );
       var vary = 15000 * Math.random() - 7500;//5000 * Math.sin( theta )* Math.random()-2500;// * Math.sin( phi );
       var varz = 20000 * Math.random() - 10000;//7500 * Math.cos( phi );

        if((varz <= 2500 && varz >= 0) || (varz >= -2500 && varz <= -1))
        {
            vertex.x = varx;
            vertex.y = vary;
            vertex.z = varz*10;
        }

        else
        {
            vertex.x = varx;
            vertex.y = vary;
            vertex.z = varz;
        }
            geometry.vertices.push( vertex );

            colors[ i ] = new THREE.Color();
            colors[ i ].setHSL( Math.random(), 1, 0.5 );
    }

    geometry.colors = colors;

    material = new THREE.ParticleSystemMaterial( { size: 65, map: sprite, vertexColors: true, transparent: true } );
    material.color.setHSL( 1.0, 0.2, 0.7 );

    particles = new THREE.ParticleSystem( geometry, material );
    particles.sortParticles = true;

    plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true, wireframe: true } ) );
    plane.visible = false;
    scene.add( particles );
    scene.add( plane );

    projector = new THREE.Projector();

    renderer = new THREE.WebGLRenderer( { clearAlpha: 1  } );

    renderer.setClearColor( 0x000000 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.sortObjects = false;

    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;

    renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
    renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
    renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 0.5;
    controls.noZoom = false;
    controls.noPan = true;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    //

    var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    projector.unprojectVector( vector, camera );

    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );



}

function onDocumentMouseDown( event ) {

    console.log(event);

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    projector.unprojectVector( vector, camera );
    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize());

    var intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {

        var xIntersect = intersects[ 0 ].object.position.x;

        console.log('x:' + xIntersect);


        var yIntersect = intersects[ 0 ].object.position.y;

        console.log('y:' + yIntersect);


        var zIntersect = intersects[ 0 ].object.position.z;

        var newCP = new THREE.Vector3(xIntersect,yIntersect,zIntersect).multiplyScalar(2);


        if((zIntersect >= 0 && zIntersect <= 1) || (zIntersect <= 0 && zIntersect >= -1))
        {
            zIntersect = intersects[ 0 ].object.position.z*100;
        }

        else if((zIntersect > 1 && zIntersect <= 150))
        {
            zIntersect += 100;
        }
        else if((zIntersect < -1 && zIntersect >= -150))
        {
            zIntersect -= 100;
        }
        else if((zIntersect >= 300))
        {
            zIntersect -= 100;
        }
        else if((zIntersect <= -300))
        {
            zIntersect += 100;
        }

        console.log('z:' + zIntersect);

                new TWEEN.Tween( camera.position).to(  {
                    x: xIntersect + newCP.x,
                    y: yIntersect + newCP.y,
                    z: zIntersect + newCP.z

        }, 600)
            .easing( TWEEN.Easing.Quadratic.Out).start();

        new TWEEN.Tween( light.position).to( {
            x: xIntersect + newCP.x,
            y: yIntersect+ newCP.y,
            z: zIntersect+ newCP.z

        }, 600)
            .easing( TWEEN.Easing.Sinusoidal.Out).start();

        if ( intersects.length > 0 ) {

            if ( intersects[ 0 ].object != OUTLINE )
            {
                if ( OUTLINE ) OUTLINE.highLight.visible = false;
                OUTLINE = intersects[ 0 ].object;
                OUTLINE.highLight.visible = true;
            }
        }
        else
        {
            if (OUTLINE) OUTLINE.highLight.visible = false;
            OUTLINE  = null;
        }


    }

}

function onDocumentMouseUp( event ) {

    event.preventDefault();

    controls.enabled = true;

    if ( INTERSECTED ) {

        plane.position.copy( INTERSECTED.position );

        SELECTED = null;

    }

    document.body.style.cursor = 'auto';

}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {

    var time = Date.now() * 0.000005;
    TWEEN.update();
    controls.update();

    if ( spritey ) spritey.lookAt( camera.position );

    for ( i = 0; i < scene.children.length; i ++ )
    {
        var object = scene.children[ i ];

        if ( object instanceof THREE.ParticleSystem ) {

            object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
        }
    }
    renderer.render( scene, camera );

}