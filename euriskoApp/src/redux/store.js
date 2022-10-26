import { createStore, combineReducers } from 'redux';
import SaveTokenReducer from './reducers/saveTokenReducer';
import SaveSearchedArticlesReducer from './reducers/saveSearchedArticlesReducer';
import SaveArticlesReducer from './reducers/saveArticlesReducer';
const rootReducer = combineReducers({
  token: SaveTokenReducer,
  articles: SaveArticlesReducer,
  searchedArticles: SaveSearchedArticlesReducer,
});

export const store = createStore(rootReducer);