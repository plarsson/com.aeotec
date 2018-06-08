'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class AeotecGarageControllerDevice extends ZwaveDevice {

	onMeshInit() {
		this.registerCapability('locked', 'BARRIER_OPERATOR', {
			get: 'BARRIER_OPERATOR_GET',
			report: 'BARRIER_OPERATOR_REPORT',
			reportParser: report => report.State !== 'Closed',
			set: 'BARRIER_OPERATOR_SET',
			setParser: input => ({
				'Target Value': (input) ? 'OPEN' : 'CLOSE',
			}),
		});
	}

	async onSettings(oldSettings, newSettings, changedKeys) {
		if (changedKeys.indexOf('371') >= 0 ||
            changedKeys.indexOf('372') >= 0 ||
            changedKeys.indexOf('373') >= 0 ||
            changedKeys.indexOf('374') >= 0) {
				await this._setAlarmConfiguration(37, 4);
		}

        if (changedKeys.indexOf('381') >= 0 ||
            changedKeys.indexOf('382') >= 0 ||
            changedKeys.indexOf('383') >= 0 ||
            changedKeys.indexOf('384') >= 0) {
            await this._setAlarmConfiguration(38, 4);
        }

        if (changedKeys.indexOf('391') >= 0 ||
            changedKeys.indexOf('392') >= 0 ||
            changedKeys.indexOf('393') >= 0 ||
            changedKeys.indexOf('394') >= 0) {
            await this._setAlarmConfiguration(39, 4);
        }

        if (changedKeys.indexOf('401') >= 0 ||
            changedKeys.indexOf('402') >= 0 ||
            changedKeys.indexOf('403') >= 0 ||
            changedKeys.indexOf('404') >= 0) {
            await this._setAlarmConfiguration(40, 4);
        }
	}

	async _setAlarmConfiguration(parameter, size) {
        await this.node.CommandClass.COMMAND_CLASS_CONFIGURATION.CONFIGURATION_SET({
            'Parameter Number': parameter,
            'Level': {
                'Size': size,
                'Default': false
            },
            'Configuration Value': new Buffer([
                newSettings[`${parameter}1`],
                newSettings[`${parameter}2`],
                newSettings[`${parameter}3`],
                newSettings[`${parameter}4`],
            ])
        });
	}
}

module.exports = AeotecGarageControllerDevice;
