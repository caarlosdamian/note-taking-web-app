import {  icons, IconList, modifySvg } from '../utils';

interface Props {
  icon: IconList;
  color: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const Icon = ({ icon, color, className, width, height }: Props) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: modifySvg(icons[icon], { color, width, height }),
      }}
    />
  );
};
