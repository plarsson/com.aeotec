'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class AeotecRangeExtenderSixDevice extends ZwaveDevice {
	
	onMeshInit() {
		this.registerSetting('82', value => new Buffer( [Number(!value)]))
	}
	
}

module.exports = AeotecRangeExtenderSixDevice;