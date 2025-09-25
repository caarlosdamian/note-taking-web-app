'use client';
import { useParams } from 'next/navigation';
import React, { use, useReducer } from 'react';
import { Icon } from '../icon';
import { Button } from '../button';
import { noteContext } from '@/src/context';
import { Note as NoteI } from '@/src/types';
import { TextInput } from '../textInput';
import { initialState, noteFormReducer } from '@/src/reducers';
import { TextArea } from '../shared/textArea';
import { InnerHeader } from '../shared/innerHeader';

const transformText = (text: string) => {
  const formatedContent = text.split('\n').map((el, index) => {
    const id = crypto.randomUUID();
    if (el === '') {
      return <br key={id} />;
    }
    return <p key={id}>{el}</p>;
  });

  return formatedContent;
};

export const Note = () => {
  const { id } = useParams<{ id: string }>();
  const { notes } = use(noteContext);
  const [noteInfo] = notes.filter(
    (ele) => (ele as unknown as NoteI).id === id
  ) as NoteI[];
  const [state, dispatch] = useReducer(noteFormReducer, {
    ...initialState,
    noteData: { ...initialState.noteData, ...noteInfo },
  });

  const { title, lastEdited, tags, content, id: noteId, isArchived } = noteInfo;

  const date = lastEdited
    ? new Date(lastEdited as string).toLocaleDateString('GB', {
        month: 'short',
        year: 'numeric',
        day: '2-digit',
      })
    : (new Date() as unknown as string);
  // si no hay info
  // si es create o edit
  // todo : mobile add innerHeader

  return (
    <section className="flex flex-col gap-5 basis-full lg:basis-2/3 px-6 py-5  lg:h-full">
      {/* navegacion mobile */}
      <InnerHeader withArchived withDelete />
      {state.fields.title.isEditMode ? (
        <TextInput
          onBlur={() => dispatch({ type: 'SET_TITLE_EDIT' })}
          name="title"
          variant="sm"
          value={
            state.noteData.isEdited ? state.noteData.title : noteInfo.title
          }
          onChange={(event) => {
            const {
              target: { value, name },
            } = event;
            dispatch({ type: 'EDIT_NOTE', payload: { name, value } });
          }}
        />
      ) : (
        <h1
          className="font-preset-1 text-neutral-950 dark:text-white"
          onClick={() => dispatch({ type: 'SET_TITLE_EDIT' })}
        >
          {state.noteData.isEdited ? state.noteData.title : noteInfo.title}
        </h1>
      )}
      <div className="flex gap-3 flex-col">
        <div className="flex item-center gap-2">
          <div className="flex items-center gap-1.5">
            <Icon icon="tag" color="#717784" />
            <span className="text-neutral-950 dark:text-white">Tags</span>
          </div>
          {/* tags van a ser ids */}
          {/* Todo: estas se editan en linea */}
          {state.fields.tags.isEditMode ? (
            <TextInput
              onBlur={() => dispatch({ type: 'SET_TAGS_EDIT' })}
              name="tags"
              variant="sm"
              value={
                state.noteData.isEdited ? state.noteData.tags : noteInfo.tags
              }
              onChange={(event) => {
                const {
                  target: { value, name },
                } = event;
                dispatch({ type: 'EDIT_NOTE', payload: { name, value } });
              }}
            />
          ) : (
            <div
              className="flex items-center"
              onClick={() => dispatch({ type: 'SET_TAGS_EDIT' })}
            >
              {(state.noteData.isEdited
                ? Array.isArray(state.noteData.tags)
                  ? state.noteData.tags
                  : (state.noteData?.tags as unknown as string)?.split(',')
                : tags
              )?.map((tag, index) => (
                <span
                  {...(index !== 0 ? { before: ',' } : {})}
                  key={tag}
                  className="text-neutral-950 dark:text-white after:content before:content-[attr(before)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {lastEdited && (
          <div className="flex item-center gap-2">
            <div className="flex items-center gap-1.5">
              <Icon icon="clock" color="#717784" />
              <span className="text-neutral-950 dark:text-white">
                Last edited
              </span>
            </div>
            {/* tags van a ser ids */}
            <div className="flex items-center">
              <span className="text-neutral-950 dark:text-white after:content before:content-[attr(before)]">
                {lastEdited && date && <span>{date}</span>}
              </span>
            </div>
          </div>
        )}
      </div>
      <hr className="bg-custom-neutral-200 dark:bg-custom-neutral-800 border-0 h-[1px] w-full" />
      <div className="flex justify-between flex-col h-full gap-4 overflow-scroll">
        <div
          className={`text-neutral-950 dark:text-white overflow-scroll basis-full flex`}
        >
          {state.fields.content.isEditMode ? (
            <TextArea
              onChange={(event) => {
                const {
                  target: { value, name },
                } = event;
                dispatch({ type: 'EDIT_NOTE', payload: { name, value } });
              }}
              name="content"
              onBlur={() => dispatch({ type: 'SET_CONTENT_EDIT' })}
              value={state.noteData.isEdited ? state.noteData.content : content}
            />
          ) : (
            <div
              onClick={() => dispatch({ type: 'SET_CONTENT_EDIT' })}
              className="overflow-scroll"
            >
              {(content || state.noteData.content) &&
                transformText(
                  state.noteData.isEdited
                    ? (state.noteData.content as string)
                    : (content as string)
                )}
            </div>
          )}
        </div>
        <hr className="bg-custom-neutral-200 dark:bg-custom-neutral-800 border-0 h-[1px] w-full hidden lg:block" />
        <div className="hidden lg:flex gap-4 justify-self-end items-end">
          <Button variant="primary">Save Note</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </div>
    </section>
  );
};
