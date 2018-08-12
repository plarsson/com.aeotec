'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// https://aeotec.freshdesk.com/helpdesk/attachments/6009584521
// https://aeotec.freshdesk.com/support/solutions/articles/6000088076-gen1-2

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		onoff: [{
				command_class: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
				command_set: 'SWITCH_MULTILEVEL_SET',
				command_set_parser: value => ({
					'Value': (value) ? 'on/enable' : 'off/disable',
					'Dimming Duration': 255,
				}),
			},
			{
				command_class: 'COMMAND_CLASS_BASIC',
				command_get: 'BASIC_GET',
				command_report: 'BASIC_REPORT',
				command_report_parser: report => {
					if (report.hasOwnProperty('Current Value')) return report['Current Value'] !== 0;
					if (report.hasOwnProperty('Value')) return report['Value'] !== 0;
					return null;
				},
			},
		],
		dim: [{
				command_class: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
				command_set: 'SWITCH_MULTILEVEL_SET',
				command_set_parser: value => {
					if (value >= 1) value = 0.99;

					return {
						'Value': value * 100,
						'Dimming Duration': 255,
					};
				},
			},
			{
				command_class: 'COMMAND_CLASS_BASIC',
				command_get: 'BASIC_GET',
				command_report: 'BASIC_REPORT',
				command_report_parser: report => {
					if (report.hasOwnProperty('Current Value') && !isNaN(report['Value'])) {
						return report['Current Value'] / 100;
					}
					if (report.hasOwnProperty('Value')) {
						return report['Value'] / 100;
					}
					return null;
				},
			},
		],
		measure_power: {
			command_class: 'COMMAND_CLASS_METER',
			command_get: 'METER_GET',
			command_get_parser: () => ({
				'Sensor Type': 'Electric meter',
				'Properties1': {
					'Scale': 0,
				},
			}),
			command_report: 'METER_REPORT',
			command_report_parser: report => {
				if (report.hasOwnProperty('Properties2') &&
					report.Properties2.hasOwnProperty('Scale') &&
					report.Properties2['Scale'] === 2) {
					return report['Meter Value (Parsed)'];
				}
				return null;
			},
		},
		meter_power: {
			command_class: 'COMMAND_CLASS_METER',
			command_get: 'METER_GET',
			command_get_parser: () => ({
				'Sensor Type': 'Electric meter',
				'Properties1': {
					'Scale': 2,
				},
			}),
			command_report: 'METER_REPORT',
			command_report_parser: report => {
				if (report.hasOwnProperty('Properties2') &&
					report.Properties2.hasOwnProperty('Scale') &&
					report.Properties2['Scale'] === 0) {
					return report['Meter Value (Parsed)'];
				}
				return null;
			},
		},
	},
	settings: {
		101: {
			index: 101,
			size: 4,
		},
		102: {
			index: 102,
			size: 4,
		},
		103: {
			index: 103,
			size: 4,
		},
		111: {
			index: 111,
			size: 4,
		},
		112: {
			index: 112,
			size: 4,
		},
		113: {
			index: 113,
			size: 4,
		},
	},
});
