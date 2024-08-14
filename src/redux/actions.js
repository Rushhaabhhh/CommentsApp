import { loadFromStorage, saveToStorage } from '../utils/storage';

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';

export const addComment = (name, text, parentId = null) => {
  return async (dispatch, getState) => {
    const newComment = {
      id: Date.now().toString(),
      name,
      text,
      date: new Date().toISOString(),
      parentId,
    };

    dispatch({
      type: ADD_COMMENT,
      payload: newComment,
    });

    const { comments } = getState();
    await saveToStorage(comments);
  };
};

export const editComment = (id, text) => {
  return async (dispatch, getState) => {
    dispatch({
      type: EDIT_COMMENT,
      payload: { id, text },
    });

    const { comments } = getState();
    await saveToStorage(comments);
  };
};

export const deleteComment = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: DELETE_COMMENT,
      payload: id,
    });

    const { comments } = getState();
    await saveToStorage(comments);
  };
};

export const loadComments = () => {
  return async (dispatch) => {
    const comments = await loadFromStorage();
    dispatch({
      type: LOAD_COMMENTS,
      payload: comments,
    });
  };
};