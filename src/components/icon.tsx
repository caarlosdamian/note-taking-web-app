import { icons, IconList, modifySvg } from '../utils';

interface Props {
  icon: IconList;
  color: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
}

export const Icon = ({
  icon,
  color,
  className,
  width,
  height,
  onClick,
}: Props) => {
  return (
    <div
      onClick={() => onClick && onClick()}
      className={className}
      dangerouslySetInnerHTML={{
        __html: modifySvg(icons[icon], { color, width, height }),
      }}
    />
  );
};
