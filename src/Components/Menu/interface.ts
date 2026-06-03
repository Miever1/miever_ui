import { CSSProperties, ReactNode } from 'react';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface IMenuProps {
    /** Initial active item key (uncontrolled). */
    defaultKey?: string;
    /**
     * Controlled active item key. When provided, the menu always reflects this
     * value — pass the current route key so the highlight follows navigation.
     */
    activeKey?: string;
    className?: string;
    mode?: MenuMode;
    style?: CSSProperties;
    onSelect?: SelectCallback;
    items: IMenuItemProps[];
    prefix?: ReactNode;
    suffix?: ReactNode;
}

interface LabelKey {
    label?: ReactNode;
    key: string;
}

export interface IMenuItemProps extends LabelKey {
    disabled?: boolean;
    children?: LabelKey[];
}

export interface ISubmenuProps {
    currentKey: string;
    itemKey: string;
    title: ReactNode;
    isOpened?: boolean;
    items: LabelKey[];
    mode: MenuMode;
    handleClick: (key: string) => void;
}
