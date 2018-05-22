import React from 'react';
import { render, shallow } from 'enzyme';

import IcingaAlert from './IcingaAlert';

describe('number of issues', () => {
  let props;
  beforeEach(() => {
    props = {
      environment: 'Production',
      data: {
        checkReturned: true,
        critical: 0,
        warning: 0,
        unknown: 0,
      }
    };
  });

  it('can render plurals', () => {
    props.data = { ...props.data, critical: 20, warning: 15, unknown: 2 };
    const wrapper = render(<IcingaAlert {...props} />);

    expect(wrapper.text()).toMatch(/20 criticals/);
    expect(wrapper.text()).toMatch(/15 warnings/);
    expect(wrapper.text()).toMatch(/2 unknown/);
  });

  it('can render singulars', () => {
    props.data = { ...props.data, critical: 1, warning: 1, unknown: 1 };
    const wrapper = render(<IcingaAlert {...props} />);

    expect(wrapper.text()).toMatch(/1 critical/);
    expect(wrapper.text()).toMatch(/1 warning/);
    expect(wrapper.text()).toMatch(/1 unknown/);
  });

  it('shows a ? for undefined counts', () => {
    props.data = {};
    const wrapper = render(<IcingaAlert {...props} />);

    expect(wrapper.text()).toMatch(/\? criticals/);
    expect(wrapper.text()).toMatch(/\? warnings/);
    expect(wrapper.text()).toMatch(/\? unknown/);
  });
});

describe('environment', () => {
  const props = { environment: "Staging", data: {} };

  it('links to icinga', () => {
    const wrapper = shallow(<IcingaAlert {...props} />);
    const expectedUrl = 'https://alert.staging.publishing.service.gov.uk';
    expect(wrapper.props().href).toBe(expectedUrl);
  });

  it('has the environment name', () => {
    const wrapper = shallow(<IcingaAlert {...props} />);
    const header = <h3 className="IcingaAlert__header">Staging</h3>;
    expect(wrapper.contains(header)).toBe(true);
  });
});

describe('status based class name', () => {
  let props;
  beforeEach(() => {
    props = {
      environment: 'Production',
      data: {
        checkReturned: true,
        critical: 0,
        unknown: 0,
        warning: 0
      }
    };
  });

  function generateClassName(className) {
    return `IcingaAlert IcingaAlert--${className}`;
  }

  it('has a no-connection class when check failed', () => {
    props.data.checkReturned = false;
    const wrapper = shallow(<IcingaAlert {...props} />);
    expect(wrapper.props().className).toBe(generateClassName('no-connection'));
  });

  it('has a critical class when there are criticals', () => {
    props.data.critical = 1;
    const wrapper = shallow(<IcingaAlert {...props} />);
    expect(wrapper.props().className).toBe(generateClassName('critical'));
  });

  it('has a unknown class when there are unknowns', () => {
    props.data.unknown = 1;
    const wrapper = shallow(<IcingaAlert {...props} />);
    expect(wrapper.props().className).toBe(generateClassName('unknown'));
  });

  it('has a warning class when there are warnings', () => {
    props.data.warning = 1;
    const wrapper = shallow(<IcingaAlert {...props} />);
    expect(wrapper.props().className).toBe(generateClassName('warning'));
  });

  it('has a clear class when there are no problems', () => {
    const wrapper = shallow(<IcingaAlert {...props} />);
    expect(wrapper.props().className).toBe(generateClassName('clear'));
  });
});
