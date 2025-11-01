'use client';
import React, { use } from 'react';
import { Button } from '../button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Icon } from '../icon';
import { themeContext } from '@/src/context';

// notes
// => go back || eliminar , archivar , cancelar , guardar
// archive
// => go back || eliminar , des-archivar , cancelar , guardar
// tags
// => go back || eliminar , archivar , cancelar , guardar
// search no lleva

interface Props {
  archivedAction?: () => void;
  deleteAction?: () => void;
  saveAction?: () => void;
  withoutActions?: boolean;
  withoutBorder?: boolean;
  breadCrumbs?: boolean;
  urlLabel?: string;
}

export const InnerHeader = ({
  archivedAction,
  deleteAction,
  saveAction,
  withoutActions = false,
  withoutBorder,
  urlLabel = 'Go back',
  breadCrumbs,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const isArchiveRoute = pathname.split('/').includes('archived');
  const { isDarkMode } = use(themeContext);
  const searchQuery = useSearchParams();

  return (
    <section
      className={`flex lg:hidden justify-between pb-4 ${
        withoutBorder
          ? ''
          : 'border-b-custom-neutral-200 dark:border-b-custom-neutral-800 border-b-[1px]'
      }`}
    >
      <div className="">
        <Button
          className="!font-preset-5 md:!font-preset-4"
          variant="link"
          icon="arrowLeft"
          onClick={() => {
            if (searchQuery.get('q')) {
              router.push(`/search?q=${searchQuery.get('q')}`);
              return;
            }
            const breadCrumbsPathname = pathname.substring(
              0,
              pathname.lastIndexOf('/')
            );

            breadCrumbs ? router.push(breadCrumbsPathname) : router.back();
          }}
        >
          {urlLabel}
        </Button>
      </div>
      <div className="flex items-center gap-4">
        {deleteAction && (
          <Icon
            width={18}
            height={18}
            className="cursor-pointer"
            color={isDarkMode ? '#99A0AE' : '#525866'}
            onClick={() => deleteAction()}
            icon="delete"
          />
        )}
        {archivedAction && (
          <Icon
            width={18}
            height={18}
            onClick={() => archivedAction()}
            className="cursor-pointer"
            color={isDarkMode ? '#99A0AE' : '#525866'}
            icon={isArchiveRoute ? 'restore' : 'archived'}
          />
        )}
        {!withoutActions && (
          <>
            <Button
              onClick={() => router.push('/notes')}
              className="!font-preset-5 md:!font-preset-4"
              variant="link"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="link"
              className="!text-custom-blue-500 dark:!text-custom-blue-500 !font-preset-5 md:!font-preset-4"
            >
              Save Note
            </Button>
          </>
        )}
      </div>
    </section>
  );
};
