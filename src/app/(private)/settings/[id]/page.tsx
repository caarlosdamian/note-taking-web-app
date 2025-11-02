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
  radioDummyElements,
  upperSettingsNavegation,
} from '@/src/utils';

const Settings = async ({ params }: { params: { id: string } }) => {
  const testing = await params;

  const navElements = generateNavElements([
    upperSettingsNavegation,
    bottomSettingsNavegation,
  ]);

  // todo: dynamic content required @@
  return (
    <div className="flex w-full">
      <Navegation whitoutLogo navElements={navElements} />
      <ConfigLayout title="Font Theme" subtitle="Choose your color theme:">
        <RadioGroup elements={radioDummyElements} />
      </ConfigLayout>
    </div>
  );
};
export default Settings;
