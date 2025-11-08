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
    <div className="max-lg:w-full">
      <Navegation
        whitoutLogo
        navElements={navElements}
        mobileHidden={false}
        className="max-lg:!border-r-0 max-lg:!w-full"
      />
    </div>
  );
};
export default Settings;
