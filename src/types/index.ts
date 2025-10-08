import { InputHTMLAttributes, RefAttributes } from 'react';
import { IconList } from '../utils';

export interface Note {
  title: string;
  tags?: string[];
  content?: string;
  lastEdited?: string;
  isArchived?: boolean;
  id?: string;
  _id?: string;
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

interface IconFn {
  iconLeft?: { fn: () => void };
  iconRight?: { fn: () => void };
}
export interface InputItem
  extends InputHTMLAttributes<HTMLInputElement>,
    RefAttributes<HTMLInputElement> {
  label?: string;
  iconLeft?: IconList;
  iconRight?: IconList;
  iconActions?: IconFn;
  hint?: string;
  error?: string | (() => string);
  linkLabel?: string;
  linkUrl?: string;
  variant?: 'sm' | 'md' | 'lg';
  name?: string;
  equals?: string;
}

export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  resetPasswordCode?: string;
}
