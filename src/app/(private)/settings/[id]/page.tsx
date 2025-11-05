import {
  ActionBar,
  Navegation,
  RadioButton,
  RadioGroup,
} from '@/src/components';
import { ConfigLayout } from '@/src/components/layout/configLayout';
import {
  bottomSettingsNavegation,
  generateNavElements,
  upperSettingsNavegation,
} from '@/src/utils';

const Settings = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const navElements = generateNavElements([
    upperSettingsNavegation,
    bottomSettingsNavegation,
  ]);

  return (
    <div className="flex w-full">
      <Navegation whitoutLogo navElements={navElements} />
      <ConfigLayout id={id}></ConfigLayout>
    </div>
  );
};
export default Settings;
