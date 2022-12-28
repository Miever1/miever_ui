# Miever UI

Miever UI is a personal React Components Library which can provide plenty of UI components to enrich my web applications.

## 🧳Install

```
npm i miever_ui
```

```
yarn add miever_ui
```

## 🛠Usage

```
import { Icon, Button } from "miever_ui";

const App = () => (
  <>
    <Button
        styleType="link"
        onClick={() => window.open("https://github.com/Miever1")}
    >
        <Icon icon={["fab", "github"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }}/>
    </Button>
  </>
);
```


