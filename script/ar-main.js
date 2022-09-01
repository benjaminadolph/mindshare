if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

THREE.Cache.enabled = true;

var globalTextArray;

function armain(commentsArray) {

    globalTextArray = commentsArray;

    if (globalTextArray) {

        registerComponent();
    }

}

function registerComponent() {

    AFRAME.registerComponent('commentgroup', {

        schema: {},
        init: function() {

            var textArray = window.globalTextArray;

            var scene = this.el.object3D;
            var speechbubbleGroup, textMesh1, textGeo, materials;
            var textArray;
            var height = 2, //20,
                size = 18,
                hover = -120,
                curveSegments = 2,
                bevelThickness = 1,
                bevelSize = 1.5,
                bevelEnabled = false,
                font = undefined,
                fontName = "exo2", // helvetiker, optimer, gentilis, droid sans, droid serif
                fontWeight = "bold"; // normal bold

            // COLOR
            var blau = 0x52C3EC;
            var blau2 = 0x149DC1;
            var blau3 = 0x106775;


            materials = [
                new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
                new THREE.MeshPhongMaterial({ color: 0x000000 }) // side
            ];

            var material = new THREE.MeshPhongMaterial({ color: 0x1e88e5, flatShading: true, needsUpdate: true });

            speechbubbleGroup = new THREE.Group();
            var speechbubbleShape = new THREE.Shape();
            speechbubbleShape.moveTo(0, 60);
            speechbubbleShape.lineTo(-220, 60);
            speechbubbleShape.quadraticCurveTo(-240, 60, -240, 40);
            speechbubbleShape.lineTo(-240, -40);
            speechbubbleShape.quadraticCurveTo(-240, -60, -220, -60);
            speechbubbleShape.lineTo(120, -60);
            speechbubbleShape.lineTo(40, -60);
            speechbubbleShape.lineTo(60, -80);
            speechbubbleShape.lineTo(80, -60);
            speechbubbleShape.lineTo(120, -60);
            speechbubbleShape.quadraticCurveTo(140, -60, 140, -40);
            speechbubbleShape.lineTo(140, 40);
            speechbubbleShape.quadraticCurveTo(140, 60, 120, 60);
            speechbubbleShape.lineTo(0, 60);


            var speechbubbleGeo = new THREE.ExtrudeGeometry(speechbubbleShape, {

                amount: 15,
                bevelEnabled: false,
                bevelSegments: 2,
                steps: 2,
                bevelSize: 1,
                bevelThickness: 1

            });

            speechbubbleGeo.computeBoundingBox();

            var speechbubble = new THREE.Mesh(speechbubbleGeo, material);
            speechbubble.name = "Speechbubble";
            speechbubble.scale.set(0.05, 0.05, 0.05);
            speechbubble.rotation.x = -89.5;

            loadFont();
            scene.add(speechbubbleGroup);

            function loadFont() {
                var loader = new THREE.FontLoader();
                loader.load('fonts/' + fontName + '_' + fontWeight + '.typeface.json', function(response) {
                    font = response;
                    refreshText();
                });
            }

            function refreshText() {

                createText();

            }

            function createText() {

                for (var i = (textArray.length - 12); i < textArray.length; i++) {

                    var speech = speechbubble.clone();

                    if (textArray[i].color == 'blau') {
                        speech.material = new THREE.MeshPhongMaterial({ color: blau, flatShading: true, needsUpdate: true });
                    }
                    if (textArray[i].color == 'blau2') {
                        speech.material = new THREE.MeshPhongMaterial({ color: blau2, flatShading: true, needsUpdate: true });
                    }
                    if (textArray[i].color == 'blau3') {
                        speech.material = new THREE.MeshPhongMaterial({ color: blau3, flatShading: true, needsUpdate: true });
                    }

                    speechbubbleGroup.add(speech);

                    textGeo = new THREE.TextGeometry(textArray[i].comment, {

                        font: font,
                        size: size,
                        height: height,
                        curveSegments: curveSegments,
                        bevelThickness: bevelThickness,
                        bevelSize: bevelSize,
                        bevelEnabled: bevelEnabled
                    });
                    textGeo.computeBoundingBox();

                    textGeo.computeVertexNormals();

                    textGeo = new THREE.BufferGeometry().fromGeometry(textGeo);
                    textMesh1 = new THREE.Mesh(textGeo, materials);
                    textGeo.name = "text" + i;
                    textMesh1.scale.set(0.05, 0.05, 0.05);
                    textMesh1.position.x = -11.5;
                    textMesh1.position.y = 0.9;
                    textMesh1.position.z = 0.6;
                    textMesh1.rotation.x = -89.5;

                    speechbubbleGroup.add(textMesh1);
                }


                // pairwise foorloop change position from speechbuuble and text 
                var nr1_pair = 0;
                var nr2_pair = 1;
                var x = 0,
                    y = 0,
                    z = 0;

                speechbubbleGroup.position.z = -15;
                speechbubbleGroup.position.x = -20;

                for (var i = 0; i < 2; i++) {

                    y = 0;

                    if (i > 0) {
                        z = z + 30;
                    }

                    for (var j = 0; j < 2; j++) {

                        x = 0;

                        if (j > 0) {
                            y = y + 15;
                        }

                        for (var k = 0; k < 3; k++) {

                            if (k > 0) {
                                x = x + 20;
                            }

                            var vorzeichen = Math.floor(Math.random() * Math.floor(2));
                            var rand = Math.floor(Math.random() * 10) * 2;


                            if (vorzeichen == 1) {
                                speechbubbleGroup.children[nr1_pair].position.x += x + rand;
                                speechbubbleGroup.children[nr2_pair].position.x += x + rand;
                            } else {
                                speechbubbleGroup.children[nr1_pair].position.x += x - rand;
                                speechbubbleGroup.children[nr2_pair].position.x += x - rand;
                            }

                            var vorzeichen2 = Math.floor(Math.random() * Math.floor(2));
                            var rand2 = Math.floor(Math.random() * 10) * 2;

                            if (vorzeichen2 == 1) {
                                speechbubbleGroup.children[nr1_pair].position.z += y + rand2;
                                speechbubbleGroup.children[nr2_pair].position.z += y + rand2;
                            } else {
                                speechbubbleGroup.children[nr1_pair].position.z += y - rand2;
                                speechbubbleGroup.children[nr2_pair].position.z += y - rand2;
                            }

                            var vorzeichen3 = Math.floor(Math.random() * Math.floor(2));
                            var rand3 = Math.floor(Math.random() * 10) * 3;

                            if (vorzeichen3 == 1) {
                                speechbubbleGroup.children[nr2_pair].position.y += z + rand3;
                                speechbubbleGroup.children[nr1_pair].position.y += z + rand3;
                            } else {
                                speechbubbleGroup.children[nr2_pair].position.y += z - rand3;
                                speechbubbleGroup.children[nr1_pair].position.y += z - rand3;
                            }

                            nr1_pair += 2;
                            nr2_pair += 2;

                        }
                    }
                }
            }
        },
        update: function() {},
        tick: function() {},
        remove: function() {},
        pause: function() {},
        play: function() {}
    });


    AFRAME.registerPrimitive('a-comment', AFRAME.utils.extendDeep({}, AFRAME.primitives.getMeshMixin(), {
        defaultComponents: {
            'commentgroup': {},
        }
    }))
}