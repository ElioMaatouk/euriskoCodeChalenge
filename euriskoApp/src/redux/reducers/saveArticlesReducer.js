const initialState = {
    articles: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_ARRTICLES':
            return {
                ...state,
                articles: action.articles,
            };
        default:
            return state;
    }
};