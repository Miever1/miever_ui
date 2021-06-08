import React from 'react';
import Button, { ButtonSize, ButtonType } from './Components/Button/Button';
import Menu from './Components/Menu';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div style={{ margin: '120px'}}>
        <Menu mode='vertical' onSelect={() => console.log(1)} defaultIndex={1}>
          <Menu.Item index={0}>
            012
          </Menu.Item>
          <Menu.Item index={1}>
            123
          </Menu.Item>
          <Menu.Item index={2} disabled>
            456
          </Menu.Item>
        </Menu>

        <Menu defaultIndex={0}>
          <Menu.Item index={0}>
            666
          </Menu.Item>
          <Menu.Item index={1}>
            888
          </Menu.Item>
        </Menu>
          <Button
            size={ButtonSize.Large}
            styleType={ButtonType.Primary}
            style={{ marginRight: '8px'}}
          >
              123
          </Button>
          <Button
            size={ButtonSize.Small}
            disabled
            style={{ marginRight: '8px'}}
          >
            123
          </Button>
          <Button
            styleType={ButtonType.Danger}
            size={ButtonSize.Large}
            style={{ marginRight: '8px'}}
          >
            test
          </Button>
          <Button
            onClick={() => alert('hello world')}
            style={{ marginRight: '8px'}}
          >
            test
          </Button>
          <Button
            styleType={ButtonType.Secondary}
            style={{ marginRight: '8px'}}
          >
            Second
          </Button>
      </div>
    </div>
  );
}

export default App;
