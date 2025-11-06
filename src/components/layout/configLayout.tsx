'use client';
import React, { PropsWithChildren, use, useEffect, useMemo } from 'react';
import { InnerHeader } from '../shared/innerHeader';
import { Button } from '../button';
import { RadioGroup } from '../shared/radioGroup';
import { colorRadioElements, fontRadioElements } from '@/src/utils';
import { fontContext, themeContext, ThemeType } from '@/src/context';
import { updateConfig } from '@/src/actions/user';
import { ResetPassword } from '../forms/resetPassword';
import { signOut } from 'next-auth/react';

interface Props extends PropsWithChildren {
  id: string;
}

export const ConfigLayout = ({ id }: Props) => {
  const { handleThemeChange, selectedTheme } = use(themeContext);
  const { handleFontChange, selectedKey } = use(fontContext) as {
    handleFontChange: (id: string) => void;
    selectedKey: string;
  };
  const isLogout = id === 'logout';

  useEffect(() => {
    if (isLogout) {
      signOut({ redirectTo: '/signin', redirect: true });
    }
  }, [id]);

  if (isLogout) return null;

  const content = useMemo(() => {
    return {
      font: {
        component: (
          <RadioGroup
            elements={fontRadioElements}
            defaultSelected={selectedKey}
          >
            {(selectedId) => {
              return (
                <Button
                  variant="primary"
                  className="self-end"
                  onClick={async () => {
                    handleFontChange(selectedId);
                    await updateConfig({ font: selectedId });
                  }}
                >
                  Apply Changes
                </Button>
              );
            }}
          </RadioGroup>
        ),
        title: 'Font Theme',
        subtitle: 'Choose your font theme:',
      },
      color: {
        component: (
          <RadioGroup
            elements={colorRadioElements}
            defaultSelected={selectedTheme}
          >
            {(selectedId) => {
              return (
                <Button
                  variant="primary"
                  className="self-end"
                  onClick={async () => {
                    handleThemeChange(selectedId as ThemeType);
                    await updateConfig({ theme: selectedId });
                  }}
                >
                  Apply Changes
                </Button>
              );
            }}
          </RadioGroup>
        ),
        title: 'Color Theme',
        subtitle: 'Choose your color theme:',
        action: () => console.log('testing'),
      },

      // <RadioGroup elements={radioDummyElements} />,
      password: {
        component: <ResetPassword />,
        title: 'Font Theme',
        subtitle: 'Choose your font theme:',
        action: () => console.log('testing'),
      },
    };
  }, [selectedKey, selectedTheme, id]);

  return (
    <div className="py-6 px-4 flex flex-col w-full lg:max-w-[528px]">
      <InnerHeader withoutActions withoutBorder urlLabel="Settings" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-preset-1 text-custom-neutral-950 dark:text-white">
            {content[id as unknown as keyof typeof content].title &&
              content[id as unknown as keyof typeof content].title}
          </h3>
          <h5 className="font-preset-5 text-custom-neutral-700 dark:text-custom-neutral-300">
            {content[id as unknown as keyof typeof content].subtitle &&
              content[id as unknown as keyof typeof content].subtitle}
          </h5>
        </div>
        {content[id as unknown as keyof typeof content].component}
      </div>
    </div>
  );
};
