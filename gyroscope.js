// gyroscope.js - Portable gyroscope integration for Marzipano VR
(function() {
  // This function will handle the gyroscope input and update the view in Marzipano
  function updateGyroscopeView(event, viewer) {
    // Get the device's orientation data (in degrees)
    var alpha = event.alpha;  // Rotation around Z-axis (0 to 360)
    var beta = event.beta;    // Rotation around X-axis (-180 to 180)
    var gamma = event.gamma;  // Rotation around Y-axis (-90 to 90)

    // Convert to radians (Marzipano uses radians)
    var alphaRad = alpha * Math.PI / 180;
    var betaRad = beta * Math.PI / 180;

    // Update Marzipano viewer's yaw and pitch based on gyroscope data
    viewer.view.setYawPitchRoll(alphaRad, -betaRad, 0);
  }

  // Function to start the gyroscope
  function enableGyroscope(viewer) {
    // Check if the device supports DeviceOrientationEvent
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", function(event) {
        // Ensure the device orientation data is available
        if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
          updateGyroscopeView(event, viewer);  // Update the Marzipano view based on device orientation
        }
      });
    } else {
      console.log("Device does not support gyroscope events.");
    }
  }

  // Expose the enableGyroscope function globally so it can be used anywhere
  window.enableGyroscope = enableGyroscope;
})();
