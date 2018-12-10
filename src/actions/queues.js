export const CREATE_QUEUE_INITIAL = 'CREATE_QUEUE_INITIAL';
export const CREATE_QUEUE_REQUEST = 'CREATE_QUEUE_REQUEST';
export const CREATE_QUEUE_SUCCESS = 'CREATE_QUEUE_SUCCESS';
export const CREATE_QUEUE_FAILURE = 'CREATE_QUEUE_FAILURE';
export const FETCH_QUEUES_REQUEST = 'FETCH_QUEUES_REQUEST';
export const FETCH_QUEUES_SUCCESS = 'FETCH_QUEUES_SUCCESS';
export const FETCH_QUEUES_FAILURE = 'FETCH_QUEUES_FAILURE';

function createQueueInitial() {
  return {
    type: CREATE_QUEUE_INITIAL,
    isFetching: false,
  };
}

function requestCreateQueue(queue) {
  return {
    type: CREATE_QUEUE_REQUEST,
    isFetching: true,
    queue,
  };
}

function createQueueSuccess(queue) {
  return {
    type: CREATE_QUEUE_SUCCESS,
    isFetching: false,
    queue,
  };
}

function createQueueError(message) {
  return {
    type: CREATE_QUEUE_FAILURE,
    isFetching: false,
    message,
  };
}

function requestFetchQueues() {
  return {
    type: FETCH_QUEUES_REQUEST,
    isFetching: true,
  };
}

function fetchQueuesSuccess(queues) {
  return {
    type: FETCH_QUEUES_SUCCESS,
    isFetching: false,
    queues,
  };
}

function fetchQueuesError(message) {
  return {
    type: FETCH_QUEUES_FAILURE,
    isFetching: false,
    message,
  };
}
/*
export function createQueue(queueData) {
  const config = {
    method: 'queue',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `mutation {
                addQueue(title: "${queueData.title}", content: "${
        queueData.content
      }"){
                  id,
                  title,
                  content
                }
              }`,
    }),
    credentials: 'include',
  };

  return dispatch => {
    // We dispatch requestCreateQueue to kickoff the call to the API
    dispatch(requestCreateQueue(queueData));

    return fetch('/graphql', config)
      .then(response => response.json().then(queue => ({ queue, response })))
      .then(({ queue, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(createQueueError(queue.message));
          return Promise.reject(queue);
        }
        // Dispatch the success action
        dispatch(createQueueSuccess(queue));
        setTimeout(() => {
          dispatch(createQueueInitial());
        }, 5000);
        return Promise.resolve(queue);
      })
      .catch(err => console.error('Error: ', err));
  };
}
*/
export function fetchQueues() {
  /* const config = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: '{queues{id,title,content,updatedAt}}',
    }),
    credentials: 'include',
  }; */

  return dispatch => {
    dispatch(requestFetchQueues());

    return fetch('/api/stl-converter/queue')
      .then(response =>
        response.json().then(responseJson => ({
          queues: responseJson.files, // .data.queues,
          responseJson,
        })),
      )
      .then(({ queues, responseJson }) => {
        if (responseJson.error) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(fetchQueuesError(queues.responseJson.error));
          return Promise.reject(queues);
        }
        // Dispatch the success action
        dispatch(fetchQueuesSuccess(queues));
        return Promise.resolve(queues);
      })
      .catch(err => {

          dispatch(fetchQueuesError(err.message));
          return Promise.reject(err);

       // const test=[{id:"-1",name:"service not responding"}]
        //  dispatch(fetchQueuesSuccess(test));
        //  return Promise.resolve(test);

        // console.error('Error: ', err)
      });
  };
}
