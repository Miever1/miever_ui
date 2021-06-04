import React from 'react';
import Button, { ButtonSize, ButtonType } from './Components/Button/Button';
import Menu from './Components/Menu/Menu';
import MenuItem from './Components/Menu/MenuItem';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div style={{ margin: '120px'}}>
        <Menu mode='vertical' onSelect={() => console.log(1)} defaultIndex={1}>
          <MenuItem index={0}>
            012
          </MenuItem>
          <MenuItem index={1}>
            123
          </MenuItem>
          <MenuItem index={2} disabled>
            456
          </MenuItem>
        </Menu>

        <Menu defaultIndex={0}>
          <MenuItem index={0}>
            <Button
              size={ButtonSize.Large}
              styleType={ButtonType.Primary}
            >
                123
            </Button>
          </MenuItem>
          <MenuItem index={1}>
            <Button
              size={ButtonSize.Small}
              disabled
            >
              123
            </Button>
          </MenuItem>
        </Menu>
        <Button
            styleType={ButtonType.Danger}
            size={ButtonSize.Large}
          >
            test
          </Button>
          <Button
            onClick={() => alert('hello world')}
          >
            test
          </Button>
          <Button
            styleType={ButtonType.Secondary}
          >
            Second
          </Button>
      </div>
    </div>
  );
}

export default App;
