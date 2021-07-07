import React, { Children } from "react";
import { render, fireEvent, RenderResult, cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Menu from './Menu';
import SubMenu from "./SubMenu";
import MenuItem from './MenuItem';
import { IMenuProps } from './interface';

const testProps: IMenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerticalProps: IMenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    children: <div />
}

const generateMenu = (props : IMenuProps) => {
    return (
        <Menu {...props}>
          <MenuItem>
            active
          </MenuItem>
          <MenuItem disabled>
            disabled
          </MenuItem>
          <MenuItem>
            click
          </MenuItem>
          <SubMenu title="dropdown">
              <MenuItem>
                drop1
              </MenuItem>
          </SubMenu>
        </Menu>
    )
}

let  wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

const createStyleFile = () => {
    const cssFile: string = `
        .submenu {
            display: none;
        }
        .submenu.submenu-visible {
            display: block;
        }
    `;
    const style = document.createElement('style');
    style.innerHTML = cssFile;
    return style
}

describe('test Menu and MenuItem components', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps));
        wrapper.container.append(createStyleFile());
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    });
    test('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('menu test');
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
        expect(activeElement).toHaveClass('menu-item active');
    });

    test('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('click');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('active');
        expect(testProps.onSelect).toHaveBeenCalledWith('2');
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

    test('should show dropdown items when hover on SubMenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible();
        const dropdownElement = wrapper.getByText('dropdown');
        fireEvent.mouseEnter(dropdownElement);
        await (() => {
            expect(wrapper.queryByText('drop1')).toBeVisible();
        });
        fireEvent.click(wrapper.getByText('drop1'));
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
        fireEvent.mouseLeave(dropdownElement);
        await (() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible();
        });
    });
});