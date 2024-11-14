let vrSession = null;
let viewer; // Marzipano viewer instance from index.js
const reticle = document.getElementById("reticle");

function enterVRMode() {
    if (navigator.xr) {
        navigator.xr.requestSession("immersive-vr").then((session) => {
            vrSession = session;
            session.addEventListener("end", exitVRMode);
            document.getElementById("vrButton").style.display = "none";
            reticle.style.display = "block";
            startVRRendering();
            startGazeInteraction();
        });
    } else {
        alert("WebXR not supported on this device.");
    }
}

function exitVRMode() {
    vrSession.end();
    vrSession = null;
    document.getElementById("vrButton").style.display = "block";
    reticle.style.display = "none";
}

function startVRRendering() {
    const xrLayer = new XRWebGLLayer(vrSession, viewer.renderer().context);
    vrSession.updateRenderState({ baseLayer: xrLayer });
    vrSession.requestAnimationFrame(onXRFrame);
}

function onXRFrame(time, frame) {
    const session = frame.session;
    const pose = frame.getViewerPose(session.renderState.baseLayer);

    viewer.renderer().context.clear();
    if (pose) {
        for (const view of pose.views) {
            const viewport = session.renderState.baseLayer.getViewport(view);
            viewer.renderer().context.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

            viewer.stage().setPose(view.transform.orientation, view.transform.position);
            viewer.render();
        }
    }

    session.requestAnimationFrame(onXRFrame);
}

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
    // Assuming you have hotspots defined in Marzipano
    const hotspots = viewer.hotspotContainer().listHotspots();

    // Simple gaze-based detection by checking if reticle is near a hotspot's position
    const reticlePosition = getReticlePositionInScene(); // Use a method to transform reticle to Marzipano scene coordinates

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
