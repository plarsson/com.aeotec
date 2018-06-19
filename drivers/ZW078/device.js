'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class MyDevice extends ZwaveDevice {
	
	onMeshInit() {
		this.registerCapability('onoff', 'BINARY_SWITCH');

        this.registerCapability('measure_power', 'SENSOR_MULTILEVEL');
        this.registerCapability('meter_power', 'METER');
    }
	
}

module.exports = MyDevice;