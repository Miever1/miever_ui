import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "./index";
import '@testing-library/jest-dom';

import { NativeInputProps } from "./interface";

const defaultProps: NativeInputProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
};

describe("Input Component", () => {
    it("should render the correct input element", () => {
        const wrapper = render(<Input {...defaultProps} />);
        const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement;
        expect(testNode).toBeInTheDocument();
        expect(testNode).toHaveClass('input-inner');
        fireEvent.change(testNode, { target: { value: 'test' } });
        expect(defaultProps.onChange).toHaveBeenCalled();
        expect(testNode.value).toBe('test');
    });

    it("should render the disabled Input on disabled prop", () => {
        const wrapper = render(<Input {...defaultProps} placeholder="disabled" disabled />);
        const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement;
        expect(testNode.disabled).toBeTruthy();   
    });

    it("should render the Input with size prop", () => {
        const largeWrapper = render(<Input {...defaultProps} placeholder="test-large-input" size="lg" />);
        const testNode = largeWrapper.getByPlaceholderText('test-large-input').parentElement as HTMLInputElement;
        const smallWrapper = render(<Input {...defaultProps} size="sm" placeholder="test-small-input" />);
        const smallTestNode = smallWrapper.getByPlaceholderText('test-small-input').parentElement as HTMLInputElement;
        expect(testNode).toHaveClass('input-size-lg');
        expect(smallTestNode).toHaveClass('input-size-sm');
    });
});