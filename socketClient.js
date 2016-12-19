var socket;

changeSocket = function ( host, port ) {
	if (typeof(host) == 'undefined') {
		host = 'http://127.0.0.1';
		jQuery('#server .host input' ).val(host);
	}

	if (typeof(port) == 'undefined') {
		port = '3000';
		jQuery('#server .port input' ).val(port);
	}

	console.log('change socket ' + host + ':' + port);
	socket = io(host + ':' + port);

	socket.on('camera', function (data) {
		guiDataChanged = true;
		guiData.separation = data.separation;
		updateGui();
	});
}
