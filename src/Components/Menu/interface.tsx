type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: number) => void;

export interface IMenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onSelect?: SelectCallback;
}

export interface IMenuItemProps {
    index: number;
    disabled?: boolean;
    style?: React.CSSProperties;
    children: React.ReactNode;
    className?: string;
}

export interface IMenuContext {
    index?: number;
    onSelect?: SelectCallback;
}