import { ActionBar, Navegation } from '@/src/components';
import {
  bottomSettingsNavegation,
  generateNavElements,
  upperSettingsNavegation,
} from '@/src/utils';

const Settings = () => {
  const navElements = generateNavElements([
    upperSettingsNavegation,
    bottomSettingsNavegation,
  ]);

  return (
    <div>
      <Navegation whitoutLogo navElements={navElements} />
    </div>
  );
};
export default Settings;
