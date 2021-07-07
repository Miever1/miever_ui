type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface IMenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onSelect?: SelectCallback;
}

export interface IMenuItemProps {
    index?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
    children: React.ReactNode;
    className?: string;
}

export interface IMenuContext {
    mode?: string;
    index: string;
    onSelect?: SelectCallback;
}
export interface ISubmenuProps {
    index?: string,
    title: string,
    className?: string,
    children: React.ReactNode,
    isOpened?: boolean
}