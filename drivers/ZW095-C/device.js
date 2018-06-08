'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class AeotecHomeEnergyDevice extends ZwaveDevice {
	
	onMeshInit() {
		this.registerCapability('measure_power', 'METER');
        this.registerCapability('meter_power', 'METER');
        this.registerCapability('measure_voltage', 'METER');
        this.registerCapability('measure_current', 'METER');
    }
	
}

module.exports = AeotecHomeEnergyDevice;