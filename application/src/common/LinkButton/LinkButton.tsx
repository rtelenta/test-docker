import * as React from 'react';
import { Link } from 'react-router-dom';
import './LinkButton.scss';

interface IPropsLinkButton {
    to: string;
}

class LinkButton extends React.Component<IPropsLinkButton, {}> {

    constructor(props: IPropsLinkButton) {
        super(props);
    }

    public render() {
        return (
            <div className="LinkButton">
                <Link className="LinkButton-link" to={this.props.to}>{this.props.children}</Link>
            </div>
        );
    }
}

export default LinkButton;