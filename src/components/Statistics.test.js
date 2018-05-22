import React from 'react';
import { render, shallow } from 'enzyme';

import Statistics from './Statistics';

describe('Data being available', () => {
  it('rounds and trims numbers', () => {
    const props = {
      graphite: {
        last5mins: {
          checkReturned: true,
          cdnRequestsPerSecond: 100.75,
          cdn4xxResponsePercentage: 10.123,
          cdn5xxResponsePercentage: 5.501,
          originRequestsPerSecond: 300,
          origin429ResponsePercentage: 12,
          originOther4xxResponsePercentage: 1.657,
          origin5xxResponsePercentage: 0.0101
        },
        last30mins: {
          checkReturned: true,
          sentryErrorsLastHour: 5000
        }
      }
    };

    const wrapper = render(<Statistics {...props} />);

    expect(wrapper.text()).toMatch(/101 requests \/ second/);
    expect(wrapper.text()).toMatch(/10.12% 4xx responses/);
    expect(wrapper.text()).toMatch(/5.5% 5xx responses/);
    expect(wrapper.text()).toMatch(/300 requests \/ second/);
    expect(wrapper.text()).toMatch(/12% 429 responses/);
    expect(wrapper.text()).toMatch(/1.66% other 4xx responses/);
    expect(wrapper.text()).toMatch(/0.01% 5xx responses/);
  });
});

describe('Data not being available', () => {
  it('renders a message if data is unavailable', () => {
    const props = { graphite: { last5mins: {}, last30mins: {} } };
    const wrapper = render(<Statistics {...props} />);

    const message5mins = /Unable to retrieve last 5 mins data from Graphite/;
    expect(wrapper.text()).toMatch(message5mins);
    const message30mins = /Unable to retrieve last 30 mins data from Graphite/;
    expect(wrapper.text()).toMatch(message30mins);
  });
});
