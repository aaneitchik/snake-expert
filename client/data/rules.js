const rules = [
	{
		id: 1,
		if: [
			{
				characteristic: 'size',
				value: 'big'
			},
			{
				characteristic: 'encounter place',
				value: 'tropical'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'bothrops asper'
		}
	},
	{
		id: 2,
		if: [
			{
				characteristic: 'size',
				value: 'big'
			},
			{
				characteristic: 'spots',
				value: 'black transversal lines'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'green whip snake'
		}
	},
	{
		id: 3,
		if: [
			{
				characteristic: 'size',
				value: 'big'
			},
			{
				characteristic: 'spots',
				value: 'dark and light longitudinal'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'aesculapian snake'
		}
	},
	{
		id: 4,
		if: [
			{
				characteristic: 'size',
				value: 'big'
			},
			{
				characteristic: 'spots',
				value: 'none'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'montpellier snake'
		}
	},
	{
		id: 5,
		if: [
			{
				characteristic: 'size',
				value: 'big'
			},
			{
				characteristic: 'spots',
				value: 'black ladder'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'ladder snake'
		}
	},
	{
		id: 6,
		if: [
			{
				characteristic: 'size',
				value: 'small'
			},
			{
				characteristic: 'pupil',
				value: 'round'
			}
		],
		then: {
			characteristic: 'type',
			value: 'small grass-snake'
		}
	},
	{
		id: 7,
		if: [
			{
				characteristic: 'size',
				value: 'small'
			},
			{
				characteristic: 'pupil',
				value: 'vertical'
			}
		],
		then: {
			characteristic: 'type',
			value: 'viper'
		}
	},
	{
		id: 8,
		if: [
			{
				characteristic: 'type',
				value: 'small grass-snake'
			},
			{
				characteristic: 'spots',
				value: 'dark headband, nostrils and eyes'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'smooth snake'
		}
	},
	{
		id: 9,
		if: [
			{
				characteristic: 'type',
				value: 'small grass-snake'
			},
			{
				characteristic: 'spots',
				value: 'black tear'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'coronella girondica'
		}
	},
	{
		id: 10,
		if: [
			{
				characteristic: 'type',
				value: 'small grass-snake'
			},
			{
				characteristic: 'encounter place',
				value: 'aquatic'
			},
			{
				characteristic: 'spots',
				value: 'black transversal lines'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'grass snake'
		}
	},
	{
		id: 11,
		if: [
			{
				characteristic: 'type',
				value: 'small grass-snake'
			},
			{
				characteristic: 'spots',
				value: 'black zigzag'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'natrix maura'
		}
	},
	{
		id: 12,
		if: [
			{
				characteristic: 'size',
				value: 'small'
			},
			{
				characteristic: 'pupil',
				value: 'invisible'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'typhlops'
		}
	},
	{
		id: 13,
		if: [
			{
				characteristic: 'type',
				value: 'viper'
			},
			{
				characteristic: 'color',
				value: 'brown'
			}
		],
		then: {
			characteristic: 'type',
			value: 'brown viper'
		}
	},
	{
		id: 14,
		if: [
			{
				characteristic: 'type',
				value: 'viper'
			},
			{
				characteristic: 'color',
				value: 'gray'
			}
		],
		then: {
			characteristic: 'type',
			value: 'gray viper'
		}
	},
	{
		id: 15,
		if: [
			{
				characteristic: 'type',
				value: 'brown viper'
			},
			{
				characteristic: 'spots',
				value: 'black transversal lines'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'aspic viper'
		}
	},
	{
		id: 16,
		if: [
			{
				characteristic: 'type',
				value: 'brown viper'
			},
			{
				characteristic: 'encounter place',
				value: 'grassland'
			},
			{
				characteristic: 'head',
				value: 'oval'
			}
		],
		then: {
			characteristic: 'snake',
			value: "ursini's viper"
		}
	},
	{
		id: 17,
		if: [
			{
				characteristic: 'type',
				value: 'brown viper'
			},
			{
				characteristic: 'encounter place',
				value: 'prairie'
			},
			{
				characteristic: 'head',
				value: 'triangular'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'baskian viper'
		}
	},
	{
		id: 18,
		if: [
			{
				characteristic: 'type',
				value: 'gray viper'
			},
			{
				characteristic: 'encounter place',
				value: 'dry'
			},
			{
				characteristic: 'head',
				value: 'horned'
			}
		],
		then: {
			characteristic: 'snake',
			value: "lataste's viper"
		}
	},
	{
		id: 19,
		if: [
			{
				characteristic: 'type',
				value: 'gray viper'
			},
			{
				characteristic: 'encounter place',
				value: 'prairie'
			},
			{
				characteristic: 'head',
				value: 'triangular'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'common european viper'
		}
	},
	{
		id: 20,
		if: [
			{
				characteristic: 'type',
				value: 'gray viper'
			},
			{
				characteristic: 'encounter place',
				value: 'prairie'
			},
			{
				characteristic: 'head',
				value: 'horned'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'horned viper'
		}
	},
	{
		id: 21,
		if: [
			{
				characteristic: 'type',
				value: 'brown viper'
			},
			{
				characteristic: 'encounter place',
				value: 'woods'
			},
			{
				characteristic: 'head',
				value: 'triangular'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'baskian viper'
		}
	},
	{
		id: 22,
		if: [
			{
				characteristic: 'type',
				value: 'gray viper'
			},
			{
				characteristic: 'encounter place',
				value: 'woods'
			},
			{
				characteristic: 'head',
				value: 'triangular'
			}
		],
		then: {
			characteristic: 'snake',
			value: 'common european viper'
		}
	}
];

export default rules;
