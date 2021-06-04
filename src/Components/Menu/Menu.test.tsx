import React, { Children } from "react";
import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Menu from './Menu';
import MenuItem from './MenuItem';
import { IMenuProps } from './interface';

const testProps: IMenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
}

const testVerticalProps: IMenuProps = {
    defaultIndex: 0,
    mode: 'vertical',
    children: <div />
}

const generateMenu = (props : IMenuProps) => {
    return (
        <Menu {...props}>
          <MenuItem index={0}>
            active
          </MenuItem>
          <MenuItem index={1} disabled>
            disabled
          </MenuItem>
          <MenuItem index={2}>
            click
          </MenuItem>
        </Menu>
    )
}

let  wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement; 
describe('test Menu and MenuItem components', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps));
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    });
    test('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('menu test');
        expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        expect(activeElement).toHaveClass('menu-item active');
    });

    test('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('click');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('active');
        expect(testProps.onSelect).toHaveBeenCalledWith(2);
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
    });

    test('should render vertical mode when mode is set to vertical', () => {
        cleanup();
        const wrapper = render(generateMenu(testVerticalProps));
        const menuElement = wrapper.getByTestId('test-menu');
        expect(menuElement).toHaveClass('menu menu-vertical');
    });

    
    // to do
    // test('renders child component', () => {
    //     cleanup();
    //     const wrapper = render(<MenuItem index={0}><div>test</div></MenuItem>);
    //     expect(wrapper.getByLabelText('<div>')).toBeTruthy();
    // })
});