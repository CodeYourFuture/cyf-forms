import React from 'react';
import { render, shallow } from 'enzyme';
import ButtonGroup from '.';

let spy = {};

beforeAll(() => {
    spy.console = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    spy.console.mockRestore();
});


test('ButtonGroup renders children', () => {
    const component = render(
        <ButtonGroup>
            <button />
            <button />
        </ButtonGroup>
    );

    expect(component.find('button').length).toBe(2);
});

test('ButtonGroup requires children', () => {
    shallow(<ButtonGroup />);

    expect(console.error).toHaveBeenCalled();
    expect(spy.console.mock.calls[0][0]).toContain('The prop `children` is marked as required in `ButtonGroup`');
});

test('ButtonGroup toggles LoadingAnimation', () => {
    const componentInvisible = shallow(
        <ButtonGroup isSubmissionInProgress={false} />
    );

    expect(componentInvisible.find('LoadingAnimation').length).toBe(1);
    expect(componentInvisible.find('LoadingAnimation').prop('isVisible')).toBe(false);

    const componentVisible = shallow(
        <ButtonGroup isSubmissionInProgress={true} />
    );

    expect(componentVisible.find('LoadingAnimation').length).toBe(1);
    expect(componentVisible.find('LoadingAnimation').prop('isVisible')).toBe(true);
});
