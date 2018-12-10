import {
  CREATE_QUEUE_INITIAL,
  CREATE_QUEUE_REQUEST,
  CREATE_QUEUE_SUCCESS,
  CREATE_QUEUE_FAILURE,
  FETCH_QUEUES_REQUEST,
  FETCH_QUEUES_SUCCESS,
  FETCH_QUEUES_FAILURE,
} from '../actions/queues';

export default function queues(
  state = {
    isFetching: false,
  },
  action,
) {
  switch (action.type) {
    case CREATE_QUEUE_INITIAL:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
      });
    case CREATE_QUEUE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case CREATE_QUEUE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: 'Post created successfully',
      });
    case CREATE_QUEUE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message:
          'Due to security reasons queues creation is closed in demo version. Please setup locally to test',
      });
    case FETCH_QUEUES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_QUEUES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        queues: action.queues,
      });
    case FETCH_QUEUES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: "Service not running." // 'Something wrong happened. Please come back later',
      });
    default:
      return state;
  }
}
