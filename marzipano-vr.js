let vrSession = null;
let viewer; // Assume this is your Marzipano viewer instance from index.js

// Function to initialize VR mode
async function enterVRMode() {
    if (navigator.xr) {
        try {
            // Request immersive VR session
            vrSession = await navigator.xr.requestSession('immersive-vr');
            vrSession.addEventListener('end', exitVRMode);
            document.getElementById("vrButton").style.display = "none"; // Hide VR button
            document.getElementById("reticle").style.display = "block"; // Show reticle
            startVRRendering();
        } catch (err) {
            console.error("VR mode request failed:", err);
        }
    } else {
        alert("WebXR not supported on this device.");
    }
}

// Function to start rendering in VR
function startVRRendering() {
    const xrLayer = new XRWebGLLayer(vrSession, viewer.renderer().context);

    vrSession.updateRenderState({ baseLayer: xrLayer });
    vrSession.requestAnimationFrame(onXRFrame);
}

// Frame loop for rendering in VR
function onXRFrame(time, frame) {
    const session = frame.session;
    const pose = frame.getViewerPose(session.renderState.baseLayer);

    // Clear any previous rendering and apply new rendering based on pose
    viewer.renderer().context.clear();

    if (pose) {
        for (const view of pose.views) {
            const viewport = session.renderState.baseLayer.getViewport(view);
            viewer.renderer().context.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

            // Adjust viewer orientation and position based on XR pose data
            viewer.stage().setPose(view.transform.orientation, view.transform.position);
            viewer.render();
        }
    }

    session.requestAnimationFrame(onXRFrame); // Loop rendering in VR mode
}

// Function to exit VR mode
function exitVRMode() {
    vrSession.end();
    vrSession = null;
    document.getElementById("vrButton").style.display = "block"; // Show VR button
    document.getElementById("reticle").style.display = "none"; // Hide reticle
}

// Add event listener for exiting VR if VR button or hardware action is taken
window.addEventListener('vrdisplaydeactivate', exitVRMode);

// Gaze-based interaction setup (same as before)
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
        startGazeTimer(intersectedHotspot);
    } else {
        clearGazeTimer();
    }
}

function startGazeTimer(hotspot) {
    gazeTimer = setTimeout(() => {
        activateHotspot(hotspot);
    }, gazeDuration);
}

function clearGazeTimer() {
    clearTimeout(gazeTimer);
}

function activateHotspot(hotspot) {
    console.log(`Activated hotspot: ${hotspot.id}`);
    // Trigger teleport or hotspot action
}

// Placeholder for detecting hotspot
function detectHotspotUnderReticle() {
    // Implement actual hotspot detection logic here
    return null;
}
