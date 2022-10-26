const initialState = {
    token: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_TOKEN':
            return {
                ...state,
                token: action.token,
            };
        default:
            return state;
    }
};