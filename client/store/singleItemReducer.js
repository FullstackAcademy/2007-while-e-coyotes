const axios = require("axios");

const GET_ITEM = "GET_ITEM";
const DESTROY_REVIEW = "DESTROY_REVIEW";
const UPDATE_REVIEW = "UPDATE_REVIEW";
const CREATE_REVIEW = "CREATE_REVIEW";

const _getItem = (item) => {
  return {
    type: GET_ITEM,
    item,
  };
};

const _updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review,
  };
};

const _createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

const _destroyReview = (id) => {
  return {
    type: DESTROY_REVIEW,
    id,
  };
};

export const getItem = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/items/${id}`);
    dispatch(_getItem(response.data));
  };
};

export const updateReview = (review, history) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/reviews/${review.id}`, review);
    dispatch(_updateReview(response.data));
    history.push(`/items/${review.itemId}`);
  };
};

export const createReview = (review, history) => {
  return async (dispatch) => {
    const res = await axios.post("/api/reviews", review);
    dispatch(_createReview(res.data));
    history.push(`/items/${review.itemId}`);
  };
};

export const destroyReview = (review) => {
  return async (dispatch) => {
    await axios.delete(`/api/reviews/${review.id}`);
    dispatch(_destroyReview(review.id));
  };
};

export default function singleItemReducer(state = { reviews: [] }, action) {
  if (action.type === GET_ITEM) {
    state = action.item;
  }
  if (action.type === UPDATE_REVIEW) {
    state = {
      ...state,
      reviews: state.reviews.map((review) => {
        return review.id === action.review.id ? action.review : review;
      }),
    };
  }
  if (action.type === CREATE_REVIEW) {
    state = {
      ...state,
      reviews: [action.review, ...state.reviews],
    };
  }
  if (action.type === DESTROY_REVIEW) {
    state = {
      ...state,
      reviews: state.reviews.filter((review) => {
        return review.id !== action.id * 1;
      }),
    };
  }
  return state;
}
