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
		incrementation.fov = guiData.incrementation;
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
//	jQuery.each( guiObj, function ( i, controller ) {
//		var property = controller.property;
//		if ( !guiDataChanged ) {
//			console.log(property);
//		}
//	} );
}

function updateGuiDataItem(folder, property, value) {
	if (guiData[property] != value) {
		guiData[property] = value;
		guiDataChanged = true;
	}
}

function updateGuiData( change,  value ) {
	var folder = null;
	updateGuiDataItem(folder, change.property, value);
}
