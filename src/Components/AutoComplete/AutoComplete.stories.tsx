import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AutoComplete from './AutoComplete';
import { AutoCompleteProps } from './interface';
import '../../Styles/index.scss';

export default {
  title: 'Data Entry/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Current input value',
    },
    options: {
      control: { type: 'object' },
      description: 'Array of options to display',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for input',
    },
  },
} as Meta;

// Template for basic stories
const Template: StoryFn<AutoCompleteProps> = (args) => <AutoComplete {...args} />;

// Basic AutoComplete Story
export const Basic = Template.bind({});
Basic.args = {
  options: [
    "Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", 
    "Honeydew", "Kiwi", "Lemon", "Mango", "Orange", "Papaya", "Strawberry"
  ],
  value: "",
  placeholder: "Search fruits...",
  onSelect: (value) => console.log("Selected:", value),
  onChange: (value) => console.log("Changed:", value),
};

// different sizes
export const Sizes = () => {
    const [value, setValue] = useState("");
    
    const options = [
       "Apple", "Banana", "Cherry", "Date", "Elderberry"
    ];
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <AutoComplete
            value={value}
            options={options}
            onChange={setValue}
            onSelect={(selected) => setValue(String(selected))}
            placeholder="Small Size"
            size="sm"
        />
        <AutoComplete
            value={value}
            options={options}
            onChange={setValue}
            onSelect={(selected) => setValue(String(selected))}
            placeholder="Large Size"
            size="lg"
        />
        </div>
    );
}

// Controlled Component Story
export const Controlled = () => {
  const [value, setValue] = useState("");
  
  const options = [
    "React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js", 
    "Gatsby", "Remix", "SvelteKit", "Solid.js"
  ];

  return (
    <div style={{ maxWidth: '400px' }}>
      <AutoComplete
        value={value}
        options={options}
        onChange={setValue}
        onSelect={(selected) => setValue(String(selected))}
        placeholder="Search frameworks..."
      />
      <p style={{ marginTop: '16px', color: '#666' }}>
        Current value: <strong>{value}</strong>
      </p>
    </div>
  );
};
Controlled.parameters = {
  docs: {
    description: {
      story: 'Demonstrates controlled AutoComplete where parent component manages the state.',
    },
  },
};

// Different Data Types
export const MixedDataTypes = Template.bind({});
MixedDataTypes.args = {
  options: [
    "Item 1", 2, "Item 3", 4, "JavaScript", 2024, "React", 18, "TypeScript", 5.5
  ],
  value: "",
  placeholder: "Search mixed types...",
  onSelect: (value) => console.log("Selected:", value, "Type:", typeof value),
};
MixedDataTypes.parameters = {
  docs: {
    description: {
      story: 'AutoComplete handling mixed data types (strings and numbers).',
    },
  },
};

// Custom Filter Function
export const CustomFilter = Template.bind({});
CustomFilter.args = {
  options: [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", 
    "Go", "Rust", "Swift", "Kotlin", "PHP", "Ruby"
  ],
  value: "",
  placeholder: "Type to search (starts with)...",
  filterFunction: (inputValue: string, options: (string | number)[]) => {
    return options.filter(option => 
      String(option).toLowerCase().startsWith(inputValue.toLowerCase())
    );
  },
  onSelect: (value) => console.log("Selected:", value),
};
CustomFilter.parameters = {
  docs: {
    description: {
      story: 'Custom filter function that only matches options starting with the input value.',
    },
  },
};

// Custom Render Option
export const CustomRenderOption = Template.bind({});
CustomRenderOption.args = {
  options: [
    { name: "Apple", price: "1.2", category: "Fruit" },
    { name: "Banana", price: "0.8", category: "Fruit" },
    { name: "Carrot", price: "0.5", category: "Vegetable" },
    { name: "Broccoli", price: "2.1", category: "Vegetable" },
  ],
  value: "",
  placeholder: "Search products...",
  renderOption: (option: any) => (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      padding: "12px 16px",
      borderBottom: "1px solid #f0f0f0"
    }}>
      <div style={{
        width: "40px",
        height: "40px",
        backgroundColor: option.category === 'Fruit' ? '#ff7875' : '#52c41a',
        borderRadius: "50%",
        marginRight: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "18px"
      }}>
        {option.category === 'Fruit' ? '🍎' : '🥕'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "4px"
        }}>
          <span style={{ fontWeight: "500", fontSize: "14px", color: "#262626" }}>
            {option.name}
          </span>
          <span style={{ 
            fontSize: "14px", 
            fontWeight: "600", 
            color: "#000" 
          }}>
            ${option.price}
          </span>
        </div>
        <span style={{ 
          fontSize: "12px", 
          color: "#8c8c8c",
          backgroundColor: "#f0f0f0",
          padding: "2px 6px",
          borderRadius: "3px"
        }}>
          {option.category}
        </span>
      </div>
    </div>
  ),
  filterFunction: (inputValue: string, options: any[]) => {
    return options.filter(option => 
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  },
  onSelect: (value) => console.log("Selected:", value),
};
CustomRenderOption.parameters = {
  docs: {
    description: {
      story: 'Custom option rendering with complex data structures and rich UI.',
    },
  },
};

// Performance Test with Long List
export const LongList = Template.bind({});
LongList.args = {
  options: Array.from({ length: 1000 }, (_, i) => `Option ${i + 1}`),
  value: "",
  placeholder: "Search from 1000 options...",
  onSelect: (value) => console.log("Selected:", value),
};
LongList.parameters = {
  docs: {
    description: {
      story: 'Performance test with 1000 options to demonstrate filtering efficiency.',
    },
  },
};

// Different States Showcase
export const StateShowcase = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
    <div>
      <h4>With Default Value</h4>
      <AutoComplete
        options={["New York", "Los Angeles", "Chicago", "Houston"]}
        value="New York"
        placeholder="Select city..."
      />
    </div>
    
    <div>
      <h4>Empty Options</h4>
      <AutoComplete
        options={[]}
        value=""
        placeholder="No options available..."
      />
    </div>
    
    <div>
      <h4>Single Option</h4>
      <AutoComplete
        options={["Only Option"]}
        value=""
        placeholder="Search..."
      />
    </div>
  </div>
);
StateShowcase.parameters = {
  docs: {
    description: {
      story: 'Showcases different states of the AutoComplete component.',
    },
  },
};

// Interactive Demo
export const InteractiveDemo = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  
  const options = [
    "Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Date", 
    "Elderberry", "Fig", "Grape", "Honeydew", "Kiwi", "Lemon"
  ];

  return (
    <div style={{ maxWidth: '400px' }}>
      <AutoComplete
        value={inputValue}
        options={options}
        onChange={setInputValue}
        onSelect={(value) => {
          setSelectedValue(String(value));
          setInputValue(String(value));
        }}
        placeholder="Try typing 'a' or 'b'..."
      />
      
      <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        <p><strong>Input Value:</strong> {inputValue || 'Empty'}</p>
        <p><strong>Selected Value:</strong> {selectedValue || 'None'}</p>
      </div>
    </div>
  );
};
InteractiveDemo.parameters = {
  docs: {
    description: {
      story: 'Interactive demo showing real-time input and selection values.',
    },
  },
};
