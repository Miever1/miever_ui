type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface IMenuProps {
    defaultKey?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    items: IMenuItemProps[];
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}

interface LabelKey {
    label?: React.ReactNode;
    key: string;
}

export interface IMenuItemProps extends LabelKey {
    disabled?: boolean;
    children?: LabelKey[];
}

export interface ISubmenuProps {
    currentKey: string;
    itemKey: string;
    title: React.ReactNode;
    isOpened?: boolean;
    items: LabelKey[];
    mode: MenuMode;
    handleClick: (key: string) => void;
}