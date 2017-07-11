export const SET_SELECT_VALUES = 'SET_SELECT_VALUES';

export function setSelectValues(options) {
	return dispatch => {
		const selectOptions = options.map(option => ({
			value: option,
			label: option
		}));
		dispatch({
			type: SET_SELECT_VALUES,
			payload: selectOptions
		});
	};
}
