import * as React from 'react';
import { Link } from 'react-router-dom';
import Answer from '../../../../common/Answer/Answer';
import Card from '../../../../common/Card/Card';
import CountAnswers from '../../../../common/CountAnswers/CountAnswers';
import './MyQuestionCard.scss';

interface IPropsMyQuestionCard {
    question: any;
}

class MyQuestionCard extends React.Component<IPropsMyQuestionCard, {}> {
    private storage: any;
    constructor(props: IPropsMyQuestionCard) {
        super(props);
        this.storage = window.localStorage;
    }

    public render() {
        const question = this.props.question;
        const closed = question.status === 2 ? "MyQuestionCard-closed" : "";
        return(
            <div className={`MyQuestionCard ${closed}`}>
                <Card avatar={false} coinText="DISTE" link={true} to={`/question/${question.id}/detail`} question={question} />
                <Link className="MyQuestionCard-link" to={`/question/${question.id}/detail`}>
                    <CountAnswers answers_not_viewed={question.answers_not_viewed} count={question.answers_total} />
                </Link>
                {(() => {
                    if (question.status === 2) {
                        return (
                            <div className="MyQuestionCard-answer">
                                <Answer answer={question.answers[0]} />
                            </div>
                        );
                    } else if (question.status === 1 && question.answers_total > 0 && question.user_id === this.storage.idUser) {
                        return (
                            <div className="MyQuestionCard-answer">
                                <Answer answer={question.answers[0]} />
                            </div>
                        );
                    }
                    return null;
                })()}
            </div>
        );
    }
}

export default MyQuestionCard;