import { ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, LOAD_COMMENTS } from './actions';

const initialState = {
  comments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      if (action.payload.parentId) {
        return {
          ...state,
          comments: state.comments.map(comment =>
            comment.id === action.payload.parentId
              ? { ...comment, replies: [...(comment.replies || []), action.payload] }
              : comment
          ),
        };
      }
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === action.payload.id
            ? { ...comment, text: action.payload.text }
            : {
                ...comment,
                replies: comment.replies
                  ? comment.replies.map(reply =>
                      reply.id === action.payload.id
                        ? { ...reply, text: action.payload.text }
                        : reply
                    )
                  : comment.replies,
              }
        ),
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => {
          if (comment.id === action.payload) {
            return false;
          }
          if (comment.replies) {
            comment.replies = comment.replies.filter(reply => reply.id !== action.payload);
          }
          return true;
        }),
      };

    case LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;