'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useReducer, useRef } from 'react';
import { Icon } from '../icon';
import { Button } from '../button';
import { TextInput } from '../textInput';
import { initialState, noteFormReducer } from '@/src/reducers';
import { TextArea } from '../shared/textArea';
import { InnerHeader } from '../shared/innerHeader';
import { useRouter } from 'next/navigation';
import { useGetNote } from '@/src/hooks/useGetNote';
import { archiveNote, deleteNote, updateNote } from '@/src/actions/notes';
import { useGetNoteDetails } from '@/src/hooks/useGetNoteDetails';

// todo: validacion de form
// todo : agregar refresh al momento de guardar

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
  const { id: paramId, noteId: idFromHook } = useGetNoteDetails();
  const id = paramId || idFromHook;
  const tagRef = useRef(null);
  const router = useRouter();
  const pathName = usePathname();
  const { noteInfo } = useGetNote(id as string);
  // todo: revisar formulario
  // todo: toast de actualizacion

  const [state, dispatch] = useReducer(noteFormReducer, {
    ...initialState,
    noteData: { ...initialState.noteData, ...noteInfo },
  });

  useEffect(() => {
    dispatch({
      type: 'UPDATE_STATE',
      payload: {
        value: {
          ...noteInfo,
          tags: noteInfo?.tags
            ? noteInfo?.tags?.map((tag: { name: string }) => tag.name)
            : [],
        },
      },
    });
  }, [noteInfo]);

  const {
    title,
    lastEdited,
    tags,
    content,
    id: noteId,
    isArchived,
  } = state.noteData || {};

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateNote({
      noteInfo,
      noteId: id as string,
      body: {
        title: state.noteData.title,
        tags: Array.isArray(state.noteData.tags)
          ? state.noteData.tags.join(',')
          : state.noteData.tags,
        content: state.noteData.content,
      },
    });
  };

  const tagToRender = Array.isArray(state.noteData?.tags)
    ? state.noteData?.tags
    : state.noteData?.tags?.split(',');

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 basis-full lg:basis-2/3 px-6 py-5  lg:h-full"
    >
      {/* navegacion mobile */}
      <InnerHeader
        archivedAction={() =>
          archiveNote({ noteId: id as string, noteInfo, path: pathName })
        }
        breadCrumbs
        deleteAction={() => deleteNote({ noteId: id as string, noteInfo })}
      />
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
          {state?.noteData?.isEdited
            ? state?.noteData?.title
            : noteInfo?.title || 'Agrega un titulo'}
        </h1>
      )}
      <div className="flex gap-3 flex-col">
        <div className="flex item-center gap-2">
          <div
            className="flex items-center gap-1.5"
            onClick={() => {
              dispatch({ type: 'SET_TAGS_EDIT' });
            }}
          >
            <Icon icon="tag" color="#717784" />
            <span className="text-neutral-950 dark:text-white">Tags</span>
          </div>

          {state.fields.tags.isEditMode ? (
            <TextInput
              ref={tagRef}
              onBlur={() => dispatch({ type: 'SET_TAGS_EDIT' })}
              name="tags"
              variant="sm"
              value={state?.noteData?.tags}
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
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
              {tagToRender.length !== 0 ? (
                tagToRender?.map((tag: string, index: number) => (
                  <span
                    {...(index !== 0 ? { before: ',' } : {})}
                    key={tag}
                    className="text-neutral-950 dark:text-white after:content before:content-[attr(before)]"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-neutral-400">
                  Add tags separated by commas (e.g. Work, Planning)
                </span>
              )}
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
              {content || state.noteData.content ? (
                transformText(
                  state.noteData.isEdited
                    ? (state.noteData.content as string)
                    : (content as string)
                )
              ) : (
                <p>Click para editar</p>
              )}
            </div>
          )}
        </div>
        <hr className="bg-custom-neutral-200 dark:bg-custom-neutral-800 border-0 h-[1px] w-full hidden lg:block" />
        {/* todo: mobile submit hay que configurarlo */}
        <div className="hidden lg:flex gap-4 justify-self-end items-end">
          <Button type="submit" variant="primary">
            Save Note
          </Button>
          <Button variant="secondary" onClick={() => router.push('/notes')}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};
