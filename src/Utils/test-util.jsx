import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../store/index';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];
const enhancers = [applyMiddleware(...middleware)];

function render(
    ui,
    {
        preloadedState,
        store = createStore(reducers, composeWithDevTools(...enhancers)),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}
export * from '@testing-library/react';
export { render }