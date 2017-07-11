export const rules = [{
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
			value: 'ursini\'s viper'
		}
	},
	{
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
			value: 'lataste\'s viper'
		}
	},
	{
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