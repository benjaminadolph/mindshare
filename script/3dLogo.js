logo3dAnimation();


function logo3dAnimation() {

    var scene_element = document.getElementById( "sceneElement" );
    var element_width = sceneElement.offsetWidth;
    var element_height = sceneElement.offsetHeight;
    var scene_logo = new THREE.Scene();
    var logoGLTFLoader, logo, renderer_logo;

    LogoSceneInit();

    function LogoSceneInit() {

            camera_logo = new THREE.PerspectiveCamera( 75, element_width/element_height, 0.1, 1000 );
            camera_logo.position.z = 5;

        var pointLight_logo = new THREE.PointLight( 0xffffff, 1.5, 100 );
            pointLight_logo.position.set(1, 1, 5 );
            scene_logo.add( pointLight_logo );
    
            renderer_logo = new THREE.WebGLRenderer( { alpha: true} );
            renderer_logo.setSize( element_width, element_height );
    
            scene_element.appendChild( renderer_logo.domElement );

            // GeometryLoader();
            // GLTFLogoLoader();
            fbxLogoLoader();
            // objLogoLoader();
    }
    
    function GeometryLoader() {
        var geometry_logo = new THREE.BoxGeometry( 1.2, 1.2, 1.2 );
		var material_logo = new THREE.MeshPhongMaterial( { color: 0xffffff } );
        logo = new THREE.Mesh( geometry_logo, material_logo );
        
        scene_logo.add( logo );
        
    }

    function GLTFLogoLoader() {

        logoGLTFLoader = new THREE.GLTFLoader().setPath( './assets/logo/' );
        logoGLTFLoader.load( 'ms_logo.gltf', function ( gltf ) {
            
            logo = gltf;

            gltf.scene.scale.set( 0.4,0.4,0.4 );
            gltf.scene.position.y = -3;
            gltf.scene.position.x = -1;
            gltf.scene.traverse( function ( child ) {
                if ( child.isMesh ) {
                    // child.geometry.center(); // center here
                }
            });

            scene_logo.add( gltf.scene );

        }, onprogress, function ( e ) {

            console.error( e );
        } );
    }

    function fbxLogoLoader() {
        // model
				var loader = new THREE.FBXLoader();
				loader.load( 'assets/logo/3D-MS-Logo_v2.fbx', function ( object ) {

                    logo = object;
                    console.log(object);
					object.traverse( function ( child ) {

						if ( child.isMesh ) {
                            child.geometry.center(); // center here
						}

                    } );
                    
                    object.children[1].position.z = 0.7;
                    object.children[1].position.y = 0.6;

                    object.scale.set(0.4,0.4,0.4);
                    scene_logo.add( object );
				} );
    }

    function objLogoLoader() {
        // instantiate a loader
        var loader = new THREE.OBJLoader();

        // load a resource
        loader.load(
            // resource URL
            'assets/logo/obj_logo.obj',
            // called when resource is loaded
            function ( object ) {

                logo = object;
                object.position.y = -3;
                object.position.x = -3;
                scene_logo.add( object );

            },
            // called when loading is in progresses
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error happened' );

            }
        );
    }


    var animate_logo = function () {

        requestAnimationFrame( animate_logo );
        
        if( logo ) {
            // logo.rotation.z += 0.01;
            logo.rotation.y += 0.025;
            // logo.rotation.x += 0.01;
        }

        renderer_logo.render( scene_logo, camera_logo );
    };

    animate_logo();
};