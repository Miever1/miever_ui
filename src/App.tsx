import React from 'react';
import Button, { ButtonSize, ButtonType } from './Components/Button/Button';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div style={{ margin: '120px'}}>
        <Button
          disabled
          styleType={ButtonType.Link}
          onClick={() => console.log('hello world')}
        >
          123
        </Button>
        <hr />
        <Button
          styleType={ButtonType.Link}
          onClick={() => console.log('hello world')}
        >
          123
        </Button>
        <hr />
        <Button
          size={ButtonSize.Large}
          styleType={ButtonType.Primary}
        >
          123
        </Button>
        <hr />
        <Button
          size={ButtonSize.Small}
          disabled
        >
          123
        </Button>
        <hr />
        <Button
          styleType={ButtonType.Danger}
          size={ButtonSize.Large}
        >
          test
        </Button>
        <hr />
        <Button
          onClick={() => alert('hello world')}
        >
          test
        </Button>
      </div>
    </div>
  );
}

export default App;
