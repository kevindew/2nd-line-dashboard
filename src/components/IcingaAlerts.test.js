import React from 'react';
import { shallow } from 'enzyme';

import IcingaAlerts from './IcingaAlerts';

it('renders without crashing', () => {
  shallow(<IcingaAlerts />);
});
