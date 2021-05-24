import React from "react";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Button, { ButtonSize, ButtonType, NativeButtonProps } from './Button';
const defaultProps = {
    onClick: jest.fn()
}

const testProps: NativeButtonProps = {
    styleType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'class',
}

const disabledProps: NativeButtonProps = {
    disabled: true,
    onClick: jest.fn(),
}

describe(' test Button Components', () => {
    test('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Button</Button>);
        const element = wrapper.getByText('Button') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element.disabled).toBeFalsy();
        expect(element).toHaveClass('btn btn-default');
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    test('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Button</Button>);
        const element = wrapper.getByText('Button');
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-primary btn-lg class');
    });

    test('should render a link when styleType equals link', () => {
        const wrapper = render(<Button styleType={ButtonType.Link}>Link</Button>);
        const element = wrapper.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-link');
    });

    test('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Disabled</Button>);
        const element = wrapper.getByText('Disabled') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        expect(disabledProps.onClick).not.toBeCalled();
    });
})

