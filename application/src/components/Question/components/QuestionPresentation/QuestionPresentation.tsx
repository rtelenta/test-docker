import * as React from 'react';

import {BoldText,Heading1} from '../../../../common/ConsoleText';
import Icon from '../../../../common/Icon/Icon';
import Points from '../../../../common/Point/Point';
import './QuestionPresentation.scss';

interface IProps {
    coins: number;
}

class QuestionPresentation extends React.Component<IProps, {}> {

    public render() {
        return (
            <div className="question">
                <div className="question-header">
                    <div onClick={this.goBack} className="question-back">
                        <div><Icon name="back" /></div>
                        <div>Regresar</div>
                    </div>
                    <div className="question-title">
                        <Heading1>Preguntar</Heading1>
                        <Points coins={new Intl.NumberFormat('es-PE').format(this.props.coins)}><BoldText>TIENES</BoldText></Points>
                    </div>
                </div>
                <div className="question-form">
                    {this.props.children}
                </div>
            </div>

        );
    }

    private goBack() {
        window.history.back();
    }
}

export default QuestionPresentation;
