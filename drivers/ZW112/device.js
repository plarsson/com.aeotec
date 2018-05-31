'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class AeotecDoorSensorDevice extends ZwaveDevice {
	
	onMeshInit() {
		this.registerCapability('alarm_contact', 'BASIC');
		this.registerCapability('measure_batttery', 'BATTERY');
	}
	
}

module.exports = AeotecDoorSensorDevice;