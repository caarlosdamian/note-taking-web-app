export interface Note {
  title: string;
  tags?: string[];
  content?: string;
  lastEdited?: string;
  isArchived?: boolean;
  id?: string;
  isEdited?: boolean;
}

export interface EditMode {
  isEditMode: boolean;
}
export interface NoteInitialState {
  noteData: Note;
  fields: {
    title: EditMode;
    tags: EditMode;
    content: EditMode;
  };
}

interface EditNote {
  type: 'EDIT_NOTE';
  payload: { name: string; value: string };
}

interface SetEditMode {
  type: 'SET_TITLE_EDIT' | 'SET_CONTENT_EDIT' | 'SET_TAGS_EDIT';
}

export type Action = SetEditMode | EditNote;

export interface NoteAction {
  type: '';
  payload: {};
}
