import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Box from './Components/Box';
import Button from "./Components/Button";
import Icon from "./Components/Icon";
import Input from "./Components/Input";
import Menu from "./Components/Menu";
import Transition from "./Components/Transition";
import Card from './Components/Card';

import { designs } from './Designs';

library.add(fas);

export {
  designs,
  Box,
  Button,
  Icon,
  Input,
  Menu,
  Transition,
  Card
}
