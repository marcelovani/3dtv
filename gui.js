var gui;
var guiData = {};
var guiDataChanged = false;

function initGui() {
	var object = {
		separation: separation
	};
	gui = new dat.gui.GUI();
	gui.remember( object );
	gui.add( object, 'separation', -0.20, 0.1 ).onChange( function ( v ) {
		updateGuiData( this, v )
	} );
}

function updateObjectProperties() {
	if ( typeof(gui) == 'object' && Object.keys( guiData ).length > 0 ) {
		separation = guiData.separation;
		delete(guiData['separation']);
	}
}

function updateGui() {
	if ( typeof(gui) != 'object' ) {
		initGui();
	}

	// Do properties
	if ( guiDataChanged ) {
		jQuery.each( gui.__controllers, function ( i, controller ) {
			var property = controller.property;
			console.log( 'update gui' );

			if ( typeof(guiData[property]) != 'undefined' ) {
				if ( controller.object[property] != guiData[property] ) {
					controller.setValue( guiData[property] );
				}
			}
		} );
		guiDataChanged = false;
	}
}

function updateGuiDataItem( folder, property, value ) {
	console.log( 'guiDataQueue' );
	var camera = {
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
	camera[property] = value;

	if ( socket.connected ) {
		// Socket will update when it gets the message.
		socket.emit( 'camera', camera );
	}
	else {
		// No socket, update now.
		guiDataChanged = true;
		guiData.separation = camera.separation;
	}
}

function updateGuiData( change, value ) {
	var folder = null;
	updateGuiDataItem( folder, change.property, value );
}
