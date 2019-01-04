import * as React from 'react';
import * as ReactGA from "react-ga";
import { Link } from 'react-router-dom';
import Answer from '../../../../common/Answer/Answer';
import Card from '../../../../common/Card/Card';
import CountAnswers from '../../../../common/CountAnswers/CountAnswers';
import LinkButtonIcon from '../../../../common/LinkButtonIcon/LinkButtonIcon';
import './ExplorerQuestion.scss';

interface IPropsExplorerQuestion {
    question: any;
}

class ExplorerQuestion extends React.Component<IPropsExplorerQuestion, {}> {

    private storage: any;

    constructor (props: IPropsExplorerQuestion) {
        super(props);
        this.storage = window.localStorage;
    }

    public render () {
        const question = this.props.question;
        const closed = question.status === 2 ? 'ExplorerQuestion-closed' : '';
        return (
            <div className={`ExplorerQuestion ${closed}`} onClick={this.saveQuestion}>
                <div className="ExplorerQuestion-content">
                    <Card avatar={true} coinText="OBTÉN" link={true} question={question} to={`/question/${question.id}/detail`} />
                    <Link className="ExplorerQuestion-content-link" to={`/question/${question.id}/detail`}>
                        <CountAnswers count={question.answers_total} />
                    </Link>
                </div>

                {(() => {
                    switch (question.status) {
                        case 1:
                            if (question.answers_total > 0) {
                                if (question.user_id === this.storage.idUser) {
                                    return null
                                } else {
                                    return (
                                        <React.Fragment>
                                            <div className="ExplorerQuestion-answers">
                                                <Answer answer={question.answers[0]} />
                                            </div>
                                            <div className="ExplorerQuestion--hide-ios" onClick={this.GAEvent}><LinkButtonIcon to={`/question/${question.id}/reply`} icon="check-circle">Añadir respuesta</LinkButtonIcon></div>
                                        </React.Fragment>
                                    );
                                }
                            } else {
                                if (question.user_id === this.storage.idUser) {
                                    return null
                                } else {
                                    return (
                                        <div className="ExplorerQuestion--hide-ios" onClick={this.GAEvent}><LinkButtonIcon to={`/question/${question.id}/reply`} icon="check-circle">Responder</LinkButtonIcon></div>
                                    );
                                }
                            }
                            
                        case 2:
                            return (
                                <div className="ExplorerQuestion-answers">
                                    <Answer answer={question.answers[0]} />
                                </div>
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
        );
    }

    private saveQuestion = () => {
        window.localStorage.setItem("currentQuestion", JSON.stringify(this.props.question));
    }

    private GAEvent = () => {
        if (this.props.question.answers_total > 0) {
            ReactGA.event({
                action: 'Click Reply Button From Explorer - More Than One Answer',
                category: 'Replying',
                label: 'Question'
            });
        } else {
            ReactGA.event({
                action: 'Click Reply Button From Explorer - No Answers',
                category: 'Replying',
                label: 'Question'
            });
        }
    }
}

export default ExplorerQuestion;