import * as React from 'react';
import Icon from '../../../../common/Icon/Icon';
import './LoginPresentation.scss';

class LoginPresentation extends React.Component<{}, {}> {
    public render () {
        return (
            <div className="login">
                <div className="login-header">
                    <Icon name="logo" />
                </div>
                <div className="login-form">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LoginPresentation;