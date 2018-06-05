'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class AeotecNanoDimmerDevice extends ZwaveDevice {
	
	onMeshInit() {
        this.registerCapability('onoff', 'SWITCH_BINARY');
        this.registerCapability('dim', 'SWITCH_MULTILEVEL');

        this.registerCapability('measure_power', 'METER');
        this.registerCapability('meter_power', 'METER');
    }

}

module.exports = AeotecNanoDimmerDevice;