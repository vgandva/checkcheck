let viewer;
let xrSession = null;
let xrLayer = null;
let reticle = document.getElementById("reticle");

// Initialize Marzipano Viewer
function initMarzipano() {
    const viewerElement = document.getElementById('viewer');
    const panoImage = "path/to/360image.jpg";  // Path to your 360 image

    const viewerConfig = {
        stage: { useWebGL: true }
    };

    viewer = new Marzipano.Viewer(viewerElement, viewerConfig);
    const source = Marzipano.ImageUrlSource.fromString(panoImage);
    const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
    const view = new Marzipano.RectilinearView();
    const scene = viewer.createScene({ source, geometry, view });

    scene.switchTo();
}

// Enter VR Mode
function enterVRMode() {
    if (navigator.xr) {
        navigator.xr.requestSession("immersive-vr").then((session) => {
            xrSession = session;
            xrSession.addEventListener("end", exitVRMode);

            // Initialize WebGL context from Marzipano viewer
            const glContext = viewer.renderer().context;
            xrLayer = new XRWebGLLayer(xrSession, glContext);
            xrSession.updateRenderState({ baseLayer: xrLayer });

            // Hide VR Button and show Reticle
            document.getElementById("vrButton").style.display = "none"; 
            reticle.style.display = "block"; 

            // Start the VR rendering loop
            startVRRendering();
        }).catch(err => {
            console.error("Error entering VR session:", err);
        });
    } else {
        alert("WebXR is not supported on this device.");
    }
}

// Exit VR Mode
function exitVRMode() {
    xrSession.end();
    xrSession = null;
    document.getElementById("vrButton").style.display = "block";  // Show VR button again
    reticle.style.display = "none"; // Hide reticle
}

// Start VR Rendering Loop
function startVRRendering() {
    xrSession.requestAnimationFrame(onXRFrame);
}

// Handle the XR Frame (Update Marzipano based on head-tracking)
function onXRFrame(time, frame) {
    const session = frame.session;
    const pose = frame.getViewerPose(session.renderState.baseLayer);

    if (pose) {
        viewer.renderer().context.clear();
        for (const view of pose.views) {
            const viewport = session.renderState.baseLayer.getViewport(view);
            viewer.renderer().context.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
            
            // Update Marzipano scene based on XR pose
            viewer.stage().setPose(view.transform.orientation, view.transform.position);
            viewer.render();
        }
    }

    session.requestAnimationFrame(onXRFrame);
}

// Initialize Marzipano viewer when the page loads
window.onload = initMarzipano;
