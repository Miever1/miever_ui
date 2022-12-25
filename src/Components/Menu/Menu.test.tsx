import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Menu from './Menu';
import SubMenu from "./SubMenu";
import MenuItem from './MenuItem';
import { IMenuProps } from './interface';

const testProps: IMenuProps = {
    defaultKey: '0',
    onSelect: jest.fn(),
    className: 'test',
    items: [
        {
          label: "active",
          key: "active",
        },
        {
          label: "disabled",
          key: "disabled",
        },
        {
          label: "click",
          key: "click",
        },
      ]
}

const testVerticalProps: IMenuProps = {
    defaultKey: '0',
    mode: 'vertical',
    items: [
        {
          label: "active",
          key: "active",
        },
        {
          label: "disabled",
          key: "disabled",
        },
        {
          label: "click",
          key: "click",
        },
      ]
}

const generateMenu = (props : IMenuProps) => {
    return (
        <Menu 
            {...props}
        />
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

});