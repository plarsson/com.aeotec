'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class AeotecSirenDevice extends ZwaveDevice {
	
	onMeshInit() {
		this._alarmOnFlow = new Homey.FlowCardAction('ZW080-turn_alarm_on')
			.register()
            .registerRunListener( async (args, state) => {
                return await this._onOffRunListener(args, state, true);
            });
		this._alarmOffFlow = new Homey.FlowCardAction('ZW080-turn_alarm_off')
			.register()
			.registerRunListener( async (args, state) => {
				return await this._onOffRunListener(args, state, false);
			});

        this._changeSoundFlow = new Homey.FlowCardAction('ZW080-set_alarm')
            .register()
            .registerRunListener( async (args, state) => {
            	return await this._changeSoundRunListener(args, state);
			});

		this.registerCapability('onoff', 'SWITCH_BINARY');
	}

	async _onOffRunListener(args, state, on) {
		let value;
		on ? value = 255 : value = 0;

		if (this.node && this.node.CommandClass.COMMAND_CLASS_SWITCH_BINARY &&
			args && args.device && args.device === this) {
				return await this.node.CommandClass.COMMAND_CLASS_SWITCH_BINARY.SWITCH_BINARY_SET({
					'Switch Value': value,
				});
		} else return Promise.reject('invalid_device_command_class');
	}

	async _changeSoundRunListener(args, state) {
		let settingsValue, zwaveValue;

		if (args && args.sound && args.volume) {
			settingsValue = parseInt(args.sound) + parseInt(args.volume);
			zwaveValue = new Buffer(2);
			zwaveValue.writeUIntBE(settingsValue, 0, 2);

			try {
				await this.node.CommandClass.COMMAND_CLASS_CONFIGURATION.CONFIGURATION_SET({
					'Parameter Number': 37,
					Level: {
						Size: 2,
						Default: false
					},
					'Configuration Value': zwaveValue
				});

				this.setSettings({
                    '37': settingsValue
				});
			} catch (err) {
				return Promise.reject(err);
            }
		}
	}
}

module.exports = AeotecSirenDevice;