const data = {
  userName: 'jon15@jon.com',
  userPhoto:
    'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg',
  userId: '5f0bc147f05f38196774d6d4',
  gameId: '5ef41462b5cad675c9d2594b',
  type: 'create',
  initialRating: 1,
  title: '',
  description: '',
  reviewId: '',
  active: true,
  isBeingEdited: false
};

export const createData = {
  data: {
    status: 'success',
    review: {
      createdAt: '2020-07-18T02:40:01.848Z',
      _id: '5f13b046414a491d21935724',
      title: 'Hello this is my review',
      description: 'This is my review description',
      game: '5ef41462b5cad675c9d2594b',
      rating: 4,
      user: '5f0bc147f05f38196774d6d4',
      __v: 0,
      id: '5f13b046414a491d21935724'
    }
  },
  status: 201,
  statusText: 'Created',
  headers: {
    'content-length': '302',
    'content-type': 'application/json; charset=utf-8'
  },
  config: {
    url: 'http://localhost:5000/api/v1/games/5ef41462b5cad675c9d2594b/reviews',
    method: 'post',
    data:
      '{"title":"Hello this is my review","description":"This is my review description","game":"5ef41462b5cad675c9d2594b","rating":4}',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=utf-8'
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1
  },
  request: {}
};

export const updateData = {
  data: {
    status: 'success',
    review: {
      createdAt: '2020-07-19T20:45:23.763Z',
      _id: '5f14bb9598661546f738f7df',
      title: 'Hello!',
      description: 'This is my brand new review',
      game: '5ef41462b5cad675c9d2594b',
      rating: 5,
      user: {
        photo:
          'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg',
        _id: '5f0bc147f05f38196774d6d4',
        name: 'jon15@jon.com',
        id: '5f0bc147f05f38196774d6d4'
      },
      __v: 0,
      likes: [],
      dislikes: [],
      id: '5f14bb9598661546f738f7df'
    }
  },
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '473',
    'content-type': 'application/json; charset=utf-8'
  },
  config: {
    url: 'http://localhost:5000/api/v1/reviews/5f14bb9598661546f738f7df',
    method: 'patch',
    data:
      '{"title":"Hello!","description":"This is my brand new review","rating":5}',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=utf-8'
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1
  },
  request: {}
};

export default data;
