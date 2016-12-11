var guiData = {};
var guiDataChanged = false;
var gui;

function initGui() {
	var object = {
		separation: separation
	};
	gui = new dat.gui.GUI();
	gui.remember(object);
	gui.add( object , 'separation' , -0.20 , 0.1       ).onChange(function(v){updateGuiData( this,v )});
}

function updateObjectProperties() {
	if (guiData && typeof(gui) == 'object' && !gui.closed && guiDataChanged) {
		separation = guiData.separation;
		guiDataChanged = false;
	}

	updateGui(); //enabling gui breaks trackball controls
}

function updateGui() {
	if ( typeof(gui) != 'object' ) {
		initGui();
		return;
	}
	if (gui.closed) {
		return;
	}

	// Do properties
	jQuery.each( gui.__controllers, function ( i, controller ) {
		var property = controller.property;
		if ( !guiDataChanged ) {
			if (typeof(guiData[property]) != 'undefined') {
				if (controller.object[property] != guiData[property]) {
					controller.setValue(guiData[property]);
				}
			}
		}
	} );
}

function updateGuiDataItem(folder, property, value) {
	if (guiData[property] != value) {
		guiData[property] = value;
		guiDataChanged = true;

		var camera = {
			separation: separation,
			l: {
				position: {
					x: cameraLeft.position.x,
					y: cameraLeft.position.y,
					z: cameraLeft.position.z
				}
			},
			r: {
				position: {
					x: cameraRight.position.x,
					y: cameraRight.position.y,
					z: cameraRight.position.z
				}
			}
		}

		if (socket.connected) {
			socket.emit('camera', camera);
		}

	}
}

function updateGuiData( change,  value ) {
	var folder = null;
	updateGuiDataItem(folder, change.property, value);
}
