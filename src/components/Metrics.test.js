import React from 'react';
import { shallow } from 'enzyme';

import Metrics from './Metrics';

it('renders without crashing', () => {
  const minimalProps = {
    icinga: {
      ci: null,
      integration: null,
      production: null,
      staging: null
    },
    graphite: null
  }
  shallow(<Metrics {...minimalProps} />);
});
