// Variables for VR mode and gaze interaction
let gazeDuration = 2000; // Duration in ms to trigger hotspot
let gazeTimer;

// Function to start VR mode
function enterVRMode() {
    // Check for WebXR or WebVR support to enter immersive VR mode
    if (navigator.xr) {
        navigator.xr.requestSession('immersive-vr').then((session) => {
            document.body.appendChild(session);
            startGazeInteraction();
        }).catch(err => {
            console.log("Failed to enter VR mode:", err);
        });
    } else {
        console.log("WebXR not supported on this device.");
    }
    document.getElementById("vrButton").style.display = "none"; // Hide VR button
    document.getElementById("reticle").style.display = "block"; // Show reticle
}

// Function to start gaze-based interaction loop
function startGazeInteraction() {
    function animate() {
        checkGazeIntersection();
        requestAnimationFrame(animate);
    }
    animate();
}

// Function to detect if the reticle is aligned with a hotspot
function checkGazeIntersection() {
    const intersectedHotspot = detectHotspotUnderReticle();
    if (intersectedHotspot) {
        startGazeTimer(intersectedHotspot);
    } else {
        clearGazeTimer();
    }
}

// Start timer when gaze stays on hotspot
function startGazeTimer(hotspot) {
    gazeTimer = setTimeout(() => {
        activateHotspot(hotspot);
    }, gazeDuration);
}

// Clear gaze timer when gaze moves away
function clearGazeTimer() {
    clearTimeout(gazeTimer);
}

// Function to activate the hotspot (teleport or action)
function activateHotspot(hotspot) {
    console.log(`Activated hotspot: ${hotspot.id}`);
    // Example action: teleport to a target scene
    // viewer.loadScene(hotspot.targetSceneId);
}

// Placeholder function to detect hotspot under reticle
function detectHotspotUnderReticle() {
    // Logic to detect hotspot aligned with reticle goes here
    // Replace this with appropriate logic for your Marzipano setup
    return null;
}
