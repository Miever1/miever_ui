import { RefObject, useEffect } from 'react';

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

const getFocusable = (container: HTMLElement): HTMLElement[] =>
    Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
    );

/**
 * Trap keyboard focus inside `containerRef` while `active` is true, and restore
 * focus to whatever was focused beforehand when it deactivates.
 *
 * Used by overlay components (Modal, Drawer) so keyboard and screen-reader users
 * stay within the dialog and land back where they started on close.
 *
 * - On activate: remembers the current `activeElement`, then moves focus to the
 *   first focusable child (falling back to the container itself).
 * - While active: `Tab` / `Shift+Tab` cycle within the container.
 * - On deactivate/unmount: restores focus to the remembered element.
 */
export const useFocusTrap = (
    containerRef: RefObject<HTMLElement>,
    active: boolean,
): void => {
    useEffect(() => {
        if (!active || typeof document === 'undefined') return;

        const container = containerRef.current;
        if (!container) return;

        const previouslyFocused = document.activeElement as HTMLElement | null;

        const focusable = getFocusable(container);
        (focusable[0] ?? container).focus();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;
            const items = getFocusable(container);
            if (items.length === 0) {
                e.preventDefault();
                container.focus();
                return;
            }
            const first = items[0];
            const last = items[items.length - 1];
            const activeEl = document.activeElement;

            if (e.shiftKey) {
                if (activeEl === first || !container.contains(activeEl)) {
                    e.preventDefault();
                    last.focus();
                }
            } else if (activeEl === last || !container.contains(activeEl)) {
                e.preventDefault();
                first.focus();
            }
        };

        container.addEventListener('keydown', onKeyDown);
        return () => {
            container.removeEventListener('keydown', onKeyDown);
            previouslyFocused?.focus?.();
        };
    }, [active, containerRef]);
};

export default useFocusTrap;
