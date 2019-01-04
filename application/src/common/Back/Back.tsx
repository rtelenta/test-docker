import * as React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import './Back.scss';

interface IProps {
    to?: any;
}

class Back extends React.Component<IProps, {}> {
    public render () {
        if (this.props.hasOwnProperty('to')) {
            return (
                <Link className="Back" to={this.props.to}>
                    <Icon name="back" />
                    <div>Regresar</div>
                </Link>
            ); 
        } else {
            return (
                <div onClick={this.goBack} className="Back">
                    <Icon name="back" />
                    <div>Regresar</div>
                </div>
            ); 
        }
    }

    private goBack() {
        window.history.back();
    }
}

export default Back;