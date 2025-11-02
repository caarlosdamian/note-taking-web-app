import {
  ActionBar,
  Navegation,
  RadioButton,
  RadioGroup,
} from '@/src/components';
import {
  bottomSettingsNavegation,
  generateNavElements,
  homeNavegation,
  normalizeTags,
  upperSettingsNavegation,
} from '@/src/utils';

const Settings = async ({ params }: { params: { id: string } }) => {
  const testing = await params;

  const navElements = generateNavElements([
    upperSettingsNavegation,
    bottomSettingsNavegation,
  ]);

  return (
    <div className="flex">
      <Navegation whitoutLogo navElements={navElements} />
      <div className="py-6 px-4">
        <RadioGroup />
      </div>
    </div>
  );
};
export default Settings;
