export const saveSearchedArticles = (articles) => {
    return {
        type: 'SAVE_SEARCHED_ARRTICLES',
        searchedArticles: articles
    };
};