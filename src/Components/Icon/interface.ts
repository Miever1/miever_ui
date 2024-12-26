import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { BRAND_COLORS } from '../../Designs';

export interface IIconProps extends FontAwesomeIconProps {
    theme?: keyof typeof BRAND_COLORS;
}