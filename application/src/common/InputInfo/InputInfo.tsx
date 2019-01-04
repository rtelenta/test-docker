import * as React from 'react';
import { Text } from '../ConsoleText';
import Icon from '../Icon/Icon';

import './InputInfo.scss';

interface IPropsForm {
    touched: boolean;
    text: string | JSX.Element;
    icon: string;
    isZero: boolean;
}


class InputError extends React.Component<IPropsForm, {}> {
    constructor(props: IPropsForm) {
        super(props);
    }

    public render() {
        if (this.props.touched || this.props.isZero){
            return (
                <div className="InputInfo">
                    <Icon name={this.props.icon} />
                    <Text className="InputInfo-text">{this.props.text}</Text>
                </div>)
        }else{
            return null;
        }
    }
}

export default InputError;
