import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import postsReducer from './posts'
import usersInfoReducer from './users';
import allUsersReducer from './allUsers';
import commentsReducer from './comments';
import photoReducer from './userPhotos';
import likesReducer from './UserLikes';

const rootReducer = combineReducers({
  session,
posts: postsReducer,
users: usersInfoReducer,
allUsers: allUsersReducer,
comments: commentsReducer,
photos: photoReducer,
likes: likesReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
