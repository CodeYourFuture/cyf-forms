import React from 'react';
import { render } from 'enzyme';
import LoadingAnimation from '.';

test('LoadingAnimation renders invisibly', () => {
    const component = render(<LoadingAnimation isVisible={false} />);

    expect(component.is('img')).toBe(true);
    expect(component.hasClass('loadingAnimation-isVisible')).toBe(false);
});

test('LoadingAnimation renders visibly', () => {
    const component = render(<LoadingAnimation isVisible={true} />);

    expect(component.is('img')).toBe(true);
    expect(component.hasClass('loadingAnimation-isVisible')).toBe(true);
});
