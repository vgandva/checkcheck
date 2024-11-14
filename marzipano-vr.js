let vrSession = null;
let viewer; // Marzipano viewer instance from index.js
let xrLayer = null;
const reticle = document.getElementById("reticle");

// Initialize Marzipano viewer and load a 360 image (modify according to your setup)
function initMarzipano() {
    const viewerElement = document.getElementById('viewer');
    const panoImage = "path/to/360image.jpg";  // Path to your 360 image

    const viewerConfig = {
        stage: { 
            useWebGL: true
        }
    };
    
    viewer = new Marzipano.Viewer(viewerElement, viewerConfig);
    const source = Marzipano.ImageUrlSource.fromString(panoImage);
    const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
    const view = new Marzipano.RectilinearView();
    const scene = viewer.createScene({ source, geometry, view });

    scene.switchTo();
}

// Enter VR mode
function enterVRMode() {
    if (navigator.xr) {
        navigator.xr.requestSession("immersive-vr").then((session) => {
            vrSession = session;
            session.addEventListener("end", exitVRMode);

            const glContext = viewer.renderer().context; // WebGL context from Marzipano
            xrLayer = new XRWebGLLayer(vrSession, glContext);
            vrSession.updateRenderState({ baseLayer: xrLayer });

            document.getElementById("vrButton").style.display = "none"; // Hide VR button
            reticle.style.display = "block"; // Show reticle

            startVRRendering();
        });
    } else {
        alert("WebXR not supported on this device.");
    }
}

// Exit VR mode
function exitVRMode() {
    vrSession.end();
    vrSession = null;
    document.getElementById("vrButton").style.display = "block"; // Show VR button again
    reticle.style.display = "none"; // Hide reticle
}

// Start VR rendering
function startVRRendering() {
    vrSession.requestAnimationFrame(onXRFrame);
}

// Handle XR frame rendering
function onXRFrame(time, frame) {
    const session = frame.session;
    const pose = frame.getViewerPose(session.renderState.baseLayer);
    if (pose) {
        viewer.renderer().context.clear();
        for (const view of pose.views) {
            const viewport = session.renderState.baseLayer.getViewport(view);
            viewer.renderer().context.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
            
            // Update Marzipano view based on XR pose
            viewer.stage().setPose(view.transform.orientation, view.transform.position);
            viewer.render();
        }
    }

    session.requestAnimationFrame(onXRFrame);
}

// Handle gaze interaction for hotspot selection (this is an advanced feature)
function startGazeInteraction() {
    function animate() {
        checkGazeIntersection();
        requestAnimationFrame(animate);
    }
    animate();
}

function checkGazeIntersection() {
    const intersectedHotspot = detectHotspotUnderReticle();
    if (intersectedHotspot) {
        activateHotspot(intersectedHotspot);
    }
}

function detectHotspotUnderReticle() {
    const hotspots = viewer.hotspotContainer().listHotspots();
    const reticlePosition = getReticlePositionInScene(); // Convert reticle position to Marzipano's coordinate system

    for (const hotspot of hotspots) {
        if (isNear(reticlePosition, hotspot.position)) {
            return hotspot;
        }
    }
    return null;
}

function isNear(pos1, pos2) {
    const threshold = 0.05; // Define a threshold for proximity detection
    const distance = Math.sqrt(
        Math.pow(pos1.x - pos2.x, 2) +
        Math.pow(pos1.y - pos2.y, 2) +
        Math.pow(pos1.z - pos2.z, 2)
    );
    return distance < threshold;
}

function activateHotspot(hotspot) {
    console.log("Hotspot triggered:", hotspot.id);
    // Trigger teleport or hotspot interaction logic
}

// Initialize Marzipano viewer when the page loads
window.onload = initMarzipano;
