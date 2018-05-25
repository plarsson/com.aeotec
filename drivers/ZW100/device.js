'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class AeotecMultiSensorSixDevice extends ZwaveDevice {
	
	onMeshInit() {
		this.registerCapability('measure_battery', 'BATTERY');

		this.registerCapability('alarm_motion', 'SENSOR_BINARY');
		this.registerCapability('alarm_tamper', 'NOTIFICATION');

		this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
		this.registerCapability('measure_luminance', 'SENSOR_MULTILEVEL');
		this.registerCapability('measure_humidity', 'SENSOR_MULTILEVEL');
		this.registerCapability('measure_ultraviolet', 'SENSOR_MULTILEVEL');
	}
	
}

module.exports = AeotecMultiSensorSixDevice;