var APP_DATA = {
  "scenes": [
    {
      "id": "0-living-room1",
      "name": "living room1",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "yaw": 1.6272339268764098,
        "pitch": 8.881784197001252e-15,
        "fov": 1.4150327825709237
      },
      "linkHotspots": [
        {
          "yaw": 1.6288501240928674,
          "pitch": 0.4099440652126667,
          "rotation": 0,
          "target": "1-living-room-2"
        },
        {
          "yaw": 2.2976150013921224,
          "pitch": 0.34885286999994847,
          "rotation": 0,
          "target": "2-garden"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-living-room-2",
      "name": "living room 2",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.492212224177738,
          "pitch": 0.536232297021586,
          "rotation": 0,
          "target": "0-living-room1"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-garden",
      "name": "garden",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.2049799794003775,
          "pitch": 0.42133098747978437,
          "rotation": 0,
          "target": "1-living-room-2"
        },
        {
          "yaw": -2.2896389594375854,
          "pitch": 0.3350503787941346,
          "rotation": 0,
          "target": "0-living-room1"
        },
        {
          "yaw": 1.3298245666998927,
          "pitch": 0.19182474829537988,
          "rotation": 0,
          "target": "3-kitchen"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-kitchen",
      "name": "Kitchen",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.6541817248797877,
          "pitch": 0.10999086752474874,
          "rotation": 0,
          "target": "2-garden"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "jkcheck",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
