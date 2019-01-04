import * as React from 'react';
import Avatar from '../Avatar/Avatar';
import {BoldText} from '../ConsoleText';
import CreatedAt from '../CreatedAt/CreatedAt';
import Icon from '../Icon/Icon';
import '../LinkButtonIcon/LinkButtonIcon.scss';
import Point from '../Point/Point';
import './Answer.scss';

interface IPropsAnswer {
    answer: any;
    question?: any;
    isDetail?: boolean;
    best?: any;
}

class Answer extends React.Component<IPropsAnswer, {}> {
    private answerStatus: any;
    private storage: any;
    private questionStatus: any;

    constructor(props: IPropsAnswer) {
        super(props);

        this.answerStatus = {
            'best': 2,
            'normal': 1
        };

        this.questionStatus = {
            'closed': 2,
            'open': 1
        };

        this.storage = window.localStorage;
    }

    public render () {
        const answer = this.props.answer;
        const closed = answer.status === this.answerStatus.best ? "Answer-closed" : "";
        return (
            <div className="Answer-wrapper">
                <div className={`Answer ${closed}`}>
                    <div className="Answer-before">
                        {(() => {
                            if (answer.status === this.answerStatus.best) {
                                return (<Icon name="heart" />);   
                            } else {
                                return (<div className="Answer-before-circle" />);
                            }
                        })()}
                    </div>
                    {(() => {
                        if (answer.status === this.answerStatus.best) {
                            return (
                                <div className="Answer-best">
                                    <span>Mejor respuesta</span>
                                    {(() => {
                                        switch (answer.coin) {
                                            case 0:
                                                return null;
                                            default:
                                                return (<Point coins={new Intl.NumberFormat('es-PE').format(answer.coin)}><BoldText>GANÓ</BoldText></Point>);
                                        }
                                    })()}
                                </div>
                            );
                        }
                        return null;
                    })()}
                    <div className="Answer-content">
                        <Avatar author={answer.author} image={answer.image} small={true} imageUrl={answer.image_url} />        
                        <CreatedAt type={1} createdAt={answer} />
                        <div className="Answer-content-text">
                            <p>{answer.description}</p>
                        </div>
                        {(() => {
                            if (answer.image_large === "") {
                                return null;
                            }
                            return (
                                <div className="Answer-content-image">
                                    <img src={answer.image_large} alt={answer.image_large}/>
                                </div>
                            );
                        })()}
                    </div>
                </div>
                { this.props.hasOwnProperty('question') && 
                    (this.props.question.user_id === this.storage.idUser && this.props.question.status === this.questionStatus.open && 
                        <React.Fragment>
                            <div onClick={ this.selectBest } className="LinkButtonIcon LinkButtonIcon--best">
                                <div className="LinkButtonIcon-link">
                                    <Icon name="heart-bordered" />
                                    <div>Elegir como mejor respuesta</div>
                                </div>
                            </div>

                            <div className="LinkButtonIcon LinkButtonIcon--best LinkButtonIcon--disabled">
                                    <div className="LinkButtonIcon-link">
                                    <Icon name="heart-bordered" />
                                    <div>Elegir como mejor respuesta</div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
        );
    }

    private selectBest = () => {
        const data = {
            answer_id: this.props.answer.id,
            question_id: this.props.question.id
        }

        if (this.props.hasOwnProperty('best')) {
            this.props.best(data);
        }
    }
}

export default Answer;