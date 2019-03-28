import React from 'react';
import { render } from 'enzyme';
import TableResponsive from '.';

test('TableResponsive renders wrapper and children', () => {
    const component = render(
        <TableResponsive>
            <table></table>
        </TableResponsive>
    );

    expect(component.is('div')).toBe(true);
    expect(component.children().length).toBe(1);
    expect(component.find('table').length).toBe(1);
});
