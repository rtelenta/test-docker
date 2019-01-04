import * as React from 'react';
import Back from '../../../../common/Back/Back';
import Card from '../../../../common/Card/Card';
import {Heading1} from '../../../../common/ConsoleText';

import './ReplyPresentation.scss';

interface IPropsReplyPresentation {
    question: any;
}

class ReplyPresentation extends React.Component<IPropsReplyPresentation, {}> {

    constructor(props: IPropsReplyPresentation) {
        super(props);
    }

    public render() {
        return (
            <div className="reply">
                <div className="reply-header">
                    <Back to="/explorer" />
                    <div className="reply-header-title">
                        <Heading1>Responder</Heading1>
                    </div>
                </div>
                <div className="reply-card">
                    <Card avatar={true} coinText="OBTÉN" link={false} question={this.props.question} />
                </div>
                <div className="reply-form">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ReplyPresentation;