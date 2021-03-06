/**
 * Created with JetBrains WebStorm.
 * User: Heather
 * Date: 3/2/14
 * Time: 10:43 PM
 * To change this template use File | Settings | File Templates.
 */
var arrayG = [];
var targets = { randomArray: [], sphereArray: [], helixArray: [], gridArray: [] };

var nodeColor;
function createSpheres( sphereCount)
{

    for ( var i = 0, l = sphereCount; i < sphereCount; i ++)
    {

        var g = new THREE.SphereGeometry(60,30,15);
        nodeColor = new THREE.Color(Math.random() * 0xffffff);



        var obj = new THREE.Mesh( g, new THREE.MeshLambertMaterial( { color: nodeColor} ) );
        obj.material.ambient = obj.material.color;


/*
        var phi = Math.acos( -1 + ( 2 * i ) / l );
        var theta = Math.sqrt( l * Math.PI ) * phi;

        obj.position.x = 600 * Math.random() -300;
        obj.position.y = 600 * Math.random() -300;
        obj.position.z = 750* Math.random() -350;
*/


        var phi = Math.acos( -1 + ( 2 * i ) / l );
        var theta = Math.sqrt( l * Math.PI ) * phi;

        obj.position.x = 300 * Math.cos( theta ) * Math.sin( phi );
        obj.position.y = 300 * Math.sin( theta ) * Math.sin( phi );
        obj.position.z = 300 * Math.cos( phi );

        //vector.copy( object.position ).multiplyScalar( 2 );

        obj.castShadow = false;
        obj.receiveShadow = false;

        scene.add( obj );
        objects.push( obj );

        var outlineMaterial1 = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true,opacity:0.5, blending: THREE.AdditiveBlending} );
        var outlineMesh1 = new THREE.Mesh( g, outlineMaterial1 );
        outlineMesh1.scale.multiplyScalar(1.05);
        outlineMesh1.position = obj.position;
        outlineMesh1.visible = false;

        obj.highLight = outlineMesh1;
        scene.add( outlineMesh1);
        arrayG.push(outlineMesh1);
    }

}
function setGeometrySize()
{
    return g;
}

