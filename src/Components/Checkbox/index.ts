import InternalCheckbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';

type CompoundCheckbox = typeof InternalCheckbox & {
    Group: typeof CheckboxGroup;
};

const Checkbox = InternalCheckbox as CompoundCheckbox;
Checkbox.Group = CheckboxGroup;

export { Checkbox, CheckboxGroup };
export default Checkbox;
export * from './interface';
export type { CheckboxValue } from './context';
