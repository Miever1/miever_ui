import React from 'react';
import Menu from './Components/Menu';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div style={{ margin: '120px'}}>
        <Menu onSelect={index => console.log(index)} defaultIndex={0}>
          <Menu.Item>
            MenuItem
          </Menu.Item>
          <Menu.SubMenu title="title">
            <Menu.Item>
              submenu 1
            </Menu.Item>
            <Menu.Item>
              submenu 2
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
      <Menu mode='vertical' onSelect={index => console.log(index)} defaultIndex={0}>
          <Menu.Item>
            MenuItem
          </Menu.Item>
          <Menu.SubMenu title="title">
            <Menu.Item>
              submenu 1
            </Menu.Item>
            <Menu.Item>
              submenu 2
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
    </div>
  );
}

export default App;
