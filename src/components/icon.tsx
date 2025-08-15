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
      // className="absolute right-4 top-4 stroke-custom-blue-700 fill-custom-blue-500 text-red-500"
      className={className}
      dangerouslySetInnerHTML={{
        __html: modifySvg(icons[icon], { color, width, height }),
      }}
    />
  );
};
