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
        expect(testNode).toHaveClass('miever-input-inner');
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
        expect(testNode).toHaveClass('miever-input-size-lg');
        expect(smallTestNode).toHaveClass('miever-input-size-sm');
    });

    it("associates a rendered label with the input via htmlFor", () => {
        const wrapper = render(<Input {...defaultProps} label="Email" placeholder="email" />);
        // getByLabelText resolves the input through the label association.
        const input = wrapper.getByLabelText('Email') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass('miever-input-inner');
        const label = wrapper.getByText('Email');
        expect(label).toHaveAttribute('for', input.id);
        expect(input.id).toBeTruthy();
    });

    it("respects a caller-supplied id for the label association", () => {
        const wrapper = render(<Input {...defaultProps} id="custom-id" label="Name" placeholder="name" />);
        const input = wrapper.getByLabelText('Name') as HTMLInputElement;
        expect(input.id).toBe('custom-id');
    });

    it("renders no label element when label is omitted", () => {
        const wrapper = render(<Input {...defaultProps} placeholder="no-label" />);
        expect(wrapper.container.querySelector('.miever-input-label')).not.toBeInTheDocument();
        expect(wrapper.container.querySelector('.miever-input-field')).not.toBeInTheDocument();
    });
});