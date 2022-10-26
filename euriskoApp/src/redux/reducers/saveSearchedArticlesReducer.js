const initialState = {
    searchedArticles: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_SEARCHED_ARRTICLES':
            return {
                ...state,
                searchedArticles: action.searchedArticles,
            };
        default:
            return state;
    }
};