import {FETCH_POSTS, FETCH_POST} from '../actions/index';

const INITIAL_STATE = { all : [], post : null};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case FETCH_POSTS:
      return {
        all : action.payload.data,
        post: state.post
      };
      break;

    case FETCH_POST:
      return {
        all : state.all,
        post: action.payload.data
      };
      break;

    default:
    return state;
  }
}
