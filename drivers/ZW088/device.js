'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;
const sceneMap = {
	1: '_press1Trigger',
    2: '_hold1Trigger',
    3: '_press2Trigger',
    4: '_hold2Trigger',
    5: '_press3Trigger',
    6: '_hold3Trigger',
    7: '_press4Trigger',
    8: '_hold4Trigger',
};

class AeotecKeyFobDevice extends ZwaveDevice {
	
	onMeshInit() {
		this._press1Trigger = new Homey.FlowCardTriggerDevice('zw088_press_1').register();
        this._press2Trigger = new Homey.FlowCardTriggerDevice('zw088_press_2').register();
        this._press3Trigger = new Homey.FlowCardTriggerDevice('zw088_press_3').register();
        this._press4Trigger = new Homey.FlowCardTriggerDevice('zw088_press_4').register();

        this._hold1Trigger = new Homey.FlowCardTriggerDevice('zw088_hold_1').register();
        this._hold2Trigger = new Homey.FlowCardTriggerDevice('zw088_hold_2').register();
        this._hold3Trigger = new Homey.FlowCardTriggerDevice('zw088_hold_3').register();
        this._hold4Trigger = new Homey.FlowCardTriggerDevice('zw088_hold_4').register();


        this.registerSetting('measure_battery', 'BATTERY', {
			pollInterval: 'poll_interval'
		});

		this.registerReportListener('SCENE_ACTIVATION', 'SCENE_ACTIVATION_SET', (report) => {
			if (report && report['Scene ID']) {
				let trigger = sceneMap[report['Scene ID']];
				this[trigger].trigger(this, null, null);
			}
		});
	}
}

module.exports = AeotecKeyFobDevice;