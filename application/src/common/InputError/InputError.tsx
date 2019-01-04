import * as React from 'react';
import { Text } from '../ConsoleText';
import Icon from '../Icon/Icon';

import './InputError.scss';

interface IPropsForm {
    error: string;
    touched: boolean;
}


class InputError extends React.Component<IPropsForm, {}> {
    constructor(props: IPropsForm) {
        super(props);
    }

    public render() {
        const isError = !!this.props.error && this.props.touched;
        /*
        TODO: Avoid dangerouslySetInnerHTML and change it for another solution
        const initB = this.props.error.indexOf("<b>");
        const endB = this.props.error.indexOf("</b>");
        const bold = this.props.error.slice(initB + 3, endB);
        const rest_text = this.props.error.replace(`<b>${bold}</b>`, "")
        */
        if (isError){
            return (
                <div className="InputError">
                    <Icon name="error" />
                    <Text className="InputError-text" dangerouslySetInnerHTML={{__html: this.props.error}} />
                </div>)
        }else{
            return null;
        }
    }
}

export default InputError;
