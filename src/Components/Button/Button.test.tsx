import React from "react";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';
import { NativeButtonProps } from './interface';

const defaultProps = {
    onClick: jest.fn()
}

const testProps: NativeButtonProps = {
    type: 'primary',
    size: 'lg',
    className: 'class',
}

const disabledProps: NativeButtonProps = {
    disabled: true,
    onClick: jest.fn(),
}

describe('test Button Components', () => {
    test('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Button</Button>);
        const element = wrapper.getByText('Button') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element.disabled).toBeFalsy();
        expect(element).toHaveClass('miever-btn miever-btn-default');
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    test('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Button</Button>);
        const element = wrapper.getByText('Button');
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('miever-btn miever-btn-primary miever-btn-lg class');
    });

    test('should render a link when type equals link', () => {
        const wrapper = render(<Button type='link'>Link</Button>);
        const element = wrapper.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('miever-btn miever-btn-link');
    });

    test('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Disabled</Button>);
        const element = wrapper.getByText('Disabled') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        expect(disabledProps.onClick).not.toBeCalled();
    });

    test('forwards a ref to the underlying button element', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(<Button ref={ref}>Ref</Button>);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toHaveTextContent('Ref');
    });

    test('maps htmlType to the native type attribute', () => {
        const wrapper = render(<Button htmlType="submit">Submit</Button>);
        expect(wrapper.getByText('Submit')).toHaveAttribute('type', 'submit');
    });
})

