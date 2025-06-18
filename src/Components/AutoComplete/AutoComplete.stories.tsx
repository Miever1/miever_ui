import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AutoComplete from './AutoComplete';
import { AutoCompleteProps } from './interface';
import '../../Styles/index.scss';

// 定义常用的数据类型
interface Product {
  name: string;
  price: string;
  category: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Meta 配置
export default {
  title: 'Data Entry/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'AutoComplete is a flexible input component that provides real-time suggestions based on user input. It supports both simple string arrays and complex object arrays with customizable filtering and rendering.'
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Current input value',
      table: { category: 'Data' }
    },
    options: {
      control: { type: 'object' },
      description: 'Array of options to display',
      table: { category: 'Data' }
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for input',
      table: { category: 'Appearance' }
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component',
      table: { category: 'Appearance' }
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the component is disabled',
      table: { category: 'State' }
    },
    onSelect: {
      action: 'selected',
      description: 'Callback when an option is selected',
      table: { category: 'Events' }
    },
    onChange: {
      action: 'changed',
      description: 'Callback when input value changes',
      table: { category: 'Events' }
    }
  }
} as Meta<AutoCompleteProps<string | Product | User>>;

// 泛型模板函数
function createTemplate<T>(): StoryFn<AutoCompleteProps<T>> {
  return (args) => <AutoComplete<T> {...args} />;
}

// 字符串类型模板
const StringTemplate = createTemplate<string>();

// 对象类型模板
const ProductTemplate = createTemplate<Product>();
const UserTemplate = createTemplate<User>();

// 基础 Story - 字符串数组
export const Basic: StoryFn<AutoCompleteProps<string>> = StringTemplate.bind({});
Basic.args = {
  options: [
    "Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", 
    "Honeydew", "Kiwi", "Lemon", "Mango", "Orange", "Papaya", "Strawberry"
  ],
  value: "",
  placeholder: "Search fruits...",
  size: 'md'
};
Basic.parameters = {
  docs: {
    description: {
      story: 'Basic usage with string array options.'
    }
  }
};

// 不同尺寸展示
export const Sizes = () => {
  const [value, setValue] = useState("");
  
  const options = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div>
        <h4>Small Size</h4>
        <AutoComplete<string>
          value={value}
          options={options}
          onChange={setValue}
          onSelect={(selected) => setValue(selected)}
          placeholder="Small size autocomplete"
          size="sm"
        />
      </div>
      <div>
        <h4>Medium Size (Default)</h4>
        <AutoComplete<string>
          value={value}
          options={options}
          onChange={setValue}
          onSelect={(selected) => setValue(selected)}
          placeholder="Medium size autocomplete"
          size="md"
        />
      </div>
      <div>
        <h4>Large Size</h4>
        <AutoComplete<string>
          value={value}
          options={options}
          onChange={setValue}
          onSelect={(selected) => setValue(selected)}
          placeholder="Large size autocomplete"
          size="lg"
        />
      </div>
    </div>
  );
};
Sizes.parameters = {
  docs: {
    description: {
      story: 'AutoComplete component in different sizes.'
    }
  }
};

// 受控组件
export const Controlled = () => {
  const [value, setValue] = useState("");
  
  const options = [
    "React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js", 
    "Gatsby", "Remix", "SvelteKit", "Solid.js"
  ];

  return (
    <div style={{ maxWidth: '400px' }}>
      <AutoComplete<string>
        value={value}
        options={options}
        onChange={setValue}
        onSelect={(selected) => setValue(selected)}
        placeholder="Search frameworks..."
      />
      <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <p><strong>Current value:</strong> {value || 'Empty'}</p>
      </div>
    </div>
  );
};
Controlled.parameters = {
  docs: {
    description: {
      story: 'Demonstrates controlled AutoComplete where parent component manages the state.'
    }
  }
};

export const CustomFilter: StoryFn<AutoCompleteProps<string>> = StringTemplate.bind({});
CustomFilter.args = {
  options: [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", 
    "Go", "Rust", "Swift", "Kotlin", "PHP", "Ruby"
  ],
  value: "",
  placeholder: "Type to search (starts with)...",
  filterFunction: (inputValue: string, options: string[]) => {
    return options.filter(option => 
      option.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  }
};
CustomFilter.parameters = {
  docs: {
    description: {
      story: 'Custom filter function that only matches options starting with the input value.'
    }
  }
};

export const CustomRenderOption: StoryFn<AutoCompleteProps<Product>> = ProductTemplate.bind({});
CustomRenderOption.args = {
  options: [
    { name: "iPhone 14", price: "$999", category: "Electronics" },
    { name: "MacBook Pro", price: "$1299", category: "Computers" },
    { name: "AirPods Pro", price: "$249", category: "Audio" },
    { name: "iPad Air", price: "$599", category: "Tablets" },
    { name: "Apple Watch", price: "$399", category: "Wearables" }
  ],
  value: "",
  placeholder: "Search products...",
  renderOption: (option: Product) => (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      padding: "12px 16px",
      borderBottom: "1px solid #f0f0f0"
    }}>
      <div style={{
        width: "40px",
        height: "40px",
        backgroundColor: getCategoryColor(option.category),
        borderRadius: "50%",
        marginRight: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold"
      }}>
        {getCategoryIcon(option.category)}
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
            color: "#1890ff" 
          }}>
            {option.price}
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
  filterFunction: (inputValue: string, options: Product[]) => {
    return options.filter(option => 
      option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.category.toLowerCase().includes(inputValue.toLowerCase())
    );
  },
  getOptionLabel: (option: Product) => option.name
};

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Electronics': '#ff4d4f',
    'Computers': '#52c41a',
    'Audio': '#1890ff',
    'Tablets': '#fa8c16',
    'Wearables': '#722ed1'
  };
  return colors[category] || '#8c8c8c';
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Electronics': '📱',
    'Computers': '💻',
    'Audio': '🎧',
    'Tablets': '📱',
    'Wearables': '⌚'
  };
  return icons[category] || '📦';
}

CustomRenderOption.parameters = {
  docs: {
    description: {
      story: 'Custom option rendering with complex data structures and rich UI.'
    }
  }
};

// 用户数据示例
export const UserSelection: StoryFn<AutoCompleteProps<User>> = UserTemplate.bind({});
UserSelection.args = {
  options: [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
    { id: 4, name: "Alice Brown", email: "alice@example.com" }
  ],
  value: "",
  placeholder: "Search users...",
  renderOption: (user: User) => (
    <div style={{ padding: "8px 12px" }}>
      <div style={{ fontWeight: "500", marginBottom: "2px" }}>{user.name}</div>
      <div style={{ fontSize: "12px", color: "#666" }}>{user.email}</div>
    </div>
  ),
  filterFunction: (inputValue: string, options: User[]) => {
    return options.filter(user => 
      user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      user.email.toLowerCase().includes(inputValue.toLowerCase())
    );
  },
  getOptionLabel: (user: User) => user.name
};
UserSelection.parameters = {
  docs: {
    description: {
      story: 'AutoComplete with user objects, demonstrating custom filtering and rendering.'
    }
  }
};

// 性能测试
export const LongList: StoryFn<AutoCompleteProps<string>> = StringTemplate.bind({});
LongList.args = {
  options: Array.from({ length: 1000 }, (_, i) => `Option ${i + 1}`),
  value: "",
  placeholder: "Search from 1000 options..."
};
LongList.parameters = {
  docs: {
    description: {
      story: 'Performance test with 1000 options to demonstrate filtering efficiency.'
    }
  }
};

// 边界情况展示
export const EdgeCases = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
    <div>
      <h4>Empty Options</h4>
      <AutoComplete<string>
        options={[]}
        value=""
        placeholder="No options available..."
      />
    </div>
    
    <div>
      <h4>Single Option</h4>
      <AutoComplete<string>
        options={["Only Option"]}
        value=""
        placeholder="Search..."
      />
    </div>
    
    <div>
      <h4>Disabled State</h4>
      <AutoComplete<string>
        options={["Apple", "Banana", "Cherry"]}
        value="Apple"
        placeholder="Disabled..."
        disabled={true}
      />
    </div>
  </div>
);
EdgeCases.parameters = {
  docs: {
    description: {
      story: 'Showcases different edge cases and states of the AutoComplete component.'
    }
  }
};

// 交互式演示
export const InteractiveDemo = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  
  const options = [
    "Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Date", 
    "Elderberry", "Fig", "Grape", "Honeydew", "Kiwi", "Lemon"
  ];

  return (
    <div style={{ maxWidth: '400px' }}>
      <AutoComplete<string>
        value={inputValue}
        options={options}
        onChange={setInputValue}
        onSelect={(value) => {
          setSelectedValue(value);
          setInputValue(value);
        }}
        placeholder="Try typing 'a' or 'b'..."
      />
      
      <div style={{ 
        marginTop: '16px', 
        padding: '12px', 
        backgroundColor: '#f9f9f9', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <p><strong>Input Value:</strong> {inputValue || 'Empty'}</p>
        <p><strong>Selected Value:</strong> {selectedValue || 'None'}</p>
      </div>
    </div>
  );
};
InteractiveDemo.parameters = {
  docs: {
    description: {
      story: 'Interactive demo showing real-time input and selection values with state management.'
    }
  }
};
