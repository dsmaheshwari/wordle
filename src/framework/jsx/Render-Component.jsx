import React from 'react';

/**
 * HOC factory that returns an enhanced component which:
 * - wraps the component with a wrapper element (default: div)
 * - adds a className to the wrapper
 * - injects additional props into the wrapped component
 * - allows passing extra wrapper props
 */
function withEnhancements(
    WrappedComponent,
    {
        wrapper: Wrapper = 'div',
        injectProps = {},
        wrapperProps = {},
    } = {}
) {
    const Enhanced = (props) => {
        let className = WrappedComponent.name.replaceAll(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
        className = `${className.substring(1)}-container`;

        const mergedProps = {...injectProps, ...props};
        const WrapperTag = Wrapper;
        return (
            <WrapperTag className={className} {...wrapperProps}>
                <WrappedComponent {...mergedProps} />
            </WrapperTag>
        );
    };

    Enhanced.displayName = `WithEnhancements(${
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`;

    return Enhanced;
}

/**
 * Default export kept as a factory that returns an element for immediate render,
 * matching usage like: {RenderComponent(WordleScreen)}
 *
 * Example with options:
 * {RenderComponent(
 *   WordleScreen,
 *   { className: 'page', injectProps: { gameMode: 'daily' }, wrapperProps: { id: 'root' } },
 *   { title: 'Wordle' }
 * )}
 */
export default function RenderComponent(
    WrappedComponent,
    hocOptions = {},
    componentProps = {}
) {
    const Enhanced = withEnhancements(WrappedComponent, hocOptions);
    return <Enhanced {...componentProps} />;
}
