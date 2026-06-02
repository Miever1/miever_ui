import InternalRadio from './Radio';
import RadioGroup from './RadioGroup';

type CompoundRadio = typeof InternalRadio & {
    Group: typeof RadioGroup;
};

const Radio = InternalRadio as CompoundRadio;
Radio.Group = RadioGroup;

export { Radio, RadioGroup };
export default Radio;
export * from './interface';
export type { RadioValue } from './context';
