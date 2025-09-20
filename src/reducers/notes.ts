import { Action, NoteInitialState } from '../types';

export const defaultState = {
  id: '',
  title: '',
  lastEdited: '',
  tags: [],
  content: '',
  isArchived: false,
  isEdited: false,
};

export const initialState: NoteInitialState = {
  noteData: {
    ...defaultState,
  },
  fields: {
    title: {
      isEditMode: false,
    },
    content: {
      isEditMode: false,
    },
    tags: {
      isEditMode: false,
    },
  },
};

export const noteFormReducer = (state: NoteInitialState, action: Action) => {
  switch (action.type) {
    case 'SET_TITLE_EDIT':
      return {
        ...state,
        fields: {
          ...state.fields,
          title: { isEditMode: !state.fields.title.isEditMode },
        },
      };
      break;
    case 'SET_CONTENT_EDIT':
      return {
        ...state,
        fields: {
          ...state.fields,
          content: { isEditMode: !state.fields.content.isEditMode },
        },
      };
      break;
    case 'SET_TAGS_EDIT':
      return {
        ...state,
        fields: {
          ...state.fields,
          tags: { isEditMode: !state.fields.tags.isEditMode },
        },
      };
    case 'EDIT_NOTE':
      return {
        ...state,
        noteData: {
          ...state.noteData,
          isEdited: true,
          [action.payload.name]: action.payload.value,
        },
      };
      break;

    default:
      return state;
      break;
  }
};
