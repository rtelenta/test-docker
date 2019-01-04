import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {default as Login} from './Login';

describe('Login Test',() => {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login />, div);
        ReactDOM.unmountComponentAtNode(div);
    });


});