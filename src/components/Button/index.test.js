import React from 'react';
import { render } from 'enzyme';
import Button from '.';

test('Button renders correctly', () => {
    const component = render(<Button title="Click me" />);

    expect(component.is('button')).toBe(true);
    expect(component.text()).toBe('Click me');
});

test('Button has all given properties', () => {
    const component = render(<Button title="Click me" role="button" />);

    expect(component.attr('title')).toBe(undefined);
    expect(component.attr('role')).toBe('button');
});
