'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;
const sceneMap = {
	1: '_pressTrigger',
	2: '_holdTrigger'
};

class AeotecPanicButtonDevice extends ZwaveDevice {
	
	onMeshInit() {
		this._pressTrigger = new Homey.FlowCardTriggerDevice('dsa38_press_1').register();
		this._holdTrigger = new Homey.FlowCardTriggerDevice('dsa38_hold_1').register();

		this.registerCapability('measure_battery', 'BATTERY');

		this.registerReportListener('SCENE_ACTIVATION', 'SCENE_ACTIVATION_SET', (report) => {
			if (report && report['Scene ID']) {
                let trigger = sceneMap[report['Scene ID']];
                this[trigger].trigger(this, null, null);
			}
		});
	}
	
}

module.exports = AeotecPanicButtonDevice;