import { InputHTMLAttributes, RefAttributes } from 'react';
import { IconList } from '../utils';
import { Types, Document } from 'mongoose';
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

interface UpdateState {
  type: 'UPDATE_STATE';
  payload: { value: Record<string, string> };
}
interface SetEditMode {
  type: 'SET_TITLE_EDIT' | 'SET_CONTENT_EDIT' | 'SET_TAGS_EDIT';
}

export type Action = SetEditMode | EditNote | UpdateState;

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

export interface GetNoteParams {
  noteId?: string;
}

export interface UpdateNoteParams {
  noteId: string;
  userId?: string;
  noteInfo: INote;
  body: {
    content: string;
    tags: string;
    title: string;
  };
}

export interface DeleteNoteParams {
  noteId: string;
  noteInfo?: INote;
}

export interface ArchiveNoteParams {
  noteId: string;
  path: string;
  noteInfo?: INote;
  forceValue?: boolean;
}

export interface INote extends Document {
  user_id: Types.ObjectId;
  title: string;
  content: string;
  tags: { name: string; _id: string }[];
  lastEdited: Date;
  isArchived: boolean;
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetNotesParams {
  q?: string;
  tagName?: string;
  isArchived?: boolean;
}

export interface RadioElement {
  label: string;
  subtitle: string;
  id: string;
  icon: IconList;
}