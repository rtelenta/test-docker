import * as React from 'react';
import { Link } from 'react-router-dom';
import './FixedButton.scss';

interface IPropsLinkButton {
    to: string;
}

class LinkButton extends React.Component<IPropsLinkButton, {}> {

    constructor(props: IPropsLinkButton) {
        super(props);
    }

    public render() {
        return (
            <div className="FixedButton">
                <Link className="FixedButton-link" to={this.props.to}>{this.props.children}</Link>
            </div>
        );
    }
}

export default LinkButton;