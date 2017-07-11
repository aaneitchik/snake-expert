import * as actions from './AppActions';

const INITIAL_STATE = {
	selectValues: []
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case actions.SET_SELECT_VALUES:
			return {...state, selectValues: action.payload};
		default:
			return {...state};
	}
}