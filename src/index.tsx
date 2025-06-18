import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './Styles/index.scss';

// Import components
import Box from './Components/Box';
import Button from './Components/Button';
import Icon from './Components/Icon';
import Input from './Components/Input';
import Menu from './Components/Menu';
import Transition from './Components/Transition';
import Card from './Components/Card';
import Tooltip from './Components/Tooltip';
import AutoComplete from './Components/AutoComplete';

import { designs } from './Designs';

// Add FontAwesome solid icons to the library
library.add(fas);

// Export components
export {
    Box,
    Button,
    Icon,
    Input,
    Menu,
    Transition,
    Card,
    Tooltip,
    AutoComplete,
    designs
};