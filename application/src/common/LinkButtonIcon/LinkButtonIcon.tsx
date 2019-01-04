import * as React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import './LinkButtonIcon.scss';

interface IPropsLinkButtonIcon {
    icon: string;
    to: string;
}

class LinkButtonIcon extends React.Component<IPropsLinkButtonIcon, {}> {
    constructor(props: IPropsLinkButtonIcon) {
        super(props);
    }

    public render() {
        return (
            <div className="LinkButtonIcon">
                <Link className="LinkButtonIcon-link" to={this.props.to}>
                    <Icon name={this.props.icon} />
                    <div>{this.props.children}</div>
                </Link>
            </div>
        );
    }
}

export default LinkButtonIcon;