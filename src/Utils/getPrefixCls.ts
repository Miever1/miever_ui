/**
 * The global class-name prefix shared by every component in the library.
 *
 * Every component renders its root and inner elements with this prefix
 * (e.g. `miever-btn`, `miever-card`, `miever-input`) so the styles stay
 * namespaced and consistent. The matching SCSS selectors use the same
 * `miever-` prefix — keep both sides in sync when adding components.
 */
export const PREFIX_CLS = 'miever';

/**
 * Build a prefixed class name.
 *
 * @example
 * getPrefixCls('btn')          // -> 'miever-btn'
 * getPrefixCls('btn', 'lg')    // -> 'miever-btn-lg'
 * getPrefixCls()               // -> 'miever'
 */
export const getPrefixCls = (...suffixes: Array<string | undefined | false>): string => {
    const parts = suffixes.filter(Boolean) as string[];
    return [PREFIX_CLS, ...parts].join('-');
};

export default getPrefixCls;
