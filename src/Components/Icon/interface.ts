import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export interface IIconProps extends FontAwesomeIconProps {
    theme?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
}