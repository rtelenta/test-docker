import * as React from 'react';
import * as ReactGA from "react-ga";
import empty from '../../../../assets/images/espera_respuesta.png';
import Answer from '../../../../common/Answer/Answer';
import Back from '../../../../common/Back/Back';
import Card from '../../../../common/Card/Card';
import {Heading1} from '../../../../common/ConsoleText';
import CountAnswers from '../../../../common/CountAnswers/CountAnswers';
import FixedButton from '../../../../common/FixedButton/FixedButton';
import Icon from '../../../../common/Icon/Icon';
import LinkButton from '../../../../common/LinkButton/LinkButton';
import LinkButtonIcon from '../../../../common/LinkButtonIcon/LinkButtonIcon';
import AnswerService from '../../../../services/Answer.service';
import QuestionService from '../../../../services/Question.service';
import './DetailPresentation.scss'

interface IPropsDetailPresentation {
    question: string;
    sendBest?: any;
}

interface IStatesDetailPresentation {
    answers: any[];
    question: any;
    updated: boolean;
}

class DetailPresentation extends React.Component<IPropsDetailPresentation, IStatesDetailPresentation> {
    private answerService: AnswerService;
    private questionService: QuestionService;
    private storage: any;
    private questionStatus: any;

    constructor(props: IPropsDetailPresentation) {
        super(props);

        this.answerService = new AnswerService();
        this.questionService = new QuestionService();
        this.state = {
            answers: [],
            question: {},
            updated: false,
        }

        this.questionStatus = {
            'closed': 2,
            'open': 1
        };

        this.storage = window.localStorage;
    }

    public componentDidUpdate() {
        if (!this.state.updated) {
            this.getQuestion(this.props.question);
        }
    }

    public render() {
        const question = this.state.question;
        const closed = question.status === this.questionStatus.closed ? 'DetailPresentation-detail-closed' : '';
        return (
            <div className="DetailPresentation">
                <div className="DetailPresentation-header">
                    <Back to="/explorer" />
                    { question.user_id === this.storage.idUser && 
                        <Heading1 className="DetailPresentation-title">Detalle de mi pregunta</Heading1>
                    }
                </div>
                <div className={`DetailPresentation-detail ${closed}`}>
                    { question.user_id === this.storage.idUser ? 
                        (<Card avatar={false} coinText="DISTE" link={false} question={question}/>) :
                        (<Card avatar={true} coinText="OBTÉN" link={false} question={question}/>)
                    }
                    <CountAnswers count={question.answers_total} />
                </div>
                <div className="DetailPresentation-answers">
                    {(() => {
                        if (question.answers_total === 0 && question.user_id !== this.storage.idUser) {
                            return (
                                <div className="DetailPresentation-answers-empty">
                                    <div className="DetailPresentation-answers-empty-text">
                                        <img src={empty} height='45'/>
                                        <p>Sé el primero en responder esta pregunta</p>
                                    </div>
                                    <div style={{width: '100%'}} onClick={this.GAEvent}>
                                        <LinkButton to={`/question/${this.props.question}/reply`}>Responder</LinkButton>
                                    </div>
                                </div>
                            )
                        } else if (question.answers_total === 0 && question.user_id === this.storage.idUser) {
                            return (
                                <div className="DetailPresentation-answers-empty">
                                    <div className="DetailPresentation-answers-empty-text">
                                        <img src={empty} height='45'/>
                                        <p>Seguimos a la espera de una respuesta</p>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="DetailPresentation-answers-list">
                                    {(() => {
                                        return this.state.answers;
                                    })()}
                                </div>
                            );
                        }
                    })()}
                </div>
                <div className="DetailPresentation-footer">
                    {(() => {
                        if (question.answers_total !== 0 && question.status === this.questionStatus.open && question.user_id !== this.storage.idUser) {
                            return (
                                <div className="DetailPresentation-footer-button" onClick={this.GAEvent}>
                                    <LinkButtonIcon to={`/question/${this.props.question}/reply`} icon="check-circle" >Añadir respuesta</LinkButtonIcon>
                                </div>
                            );
                        }
                        return null;
                    })()}
                </div>
                
                { question.user_id === this.storage.idUser && question.status === this.questionStatus.open && question.answers_total !== 0 && 
                    <FixedButton to="/my-questions">Seguir esperando</FixedButton>
                }
            </div>
        );
    }

    private getQuestion = (id: string) => {
        const currentQuestion = window.localStorage.getItem("currentQuestion");
        if (currentQuestion) {
            const currentQuestionParsed = JSON.parse(currentQuestion);

            this.setState({
                question: (currentQuestionParsed.id === id) ? currentQuestionParsed : {},
                updated: true,
            });
        }
        this.questionService.getByID(id)
            .then((response) => {
                const data: any[] = response.data.answers;
                const answersComponent: any[] = [];
            
                data.map((answer: any, key: number) => {
                    answersComponent.push(<Answer best={this.selectBestAnswer} key={key} answer={answer} question={response.data} isDetail={true} />);
                    if (response.data.status === this.questionStatus.closed && key === 0 && data.length > 1) {
                        answersComponent.push(
                            <div key={-1} className="DetailPresentation-others">
                                <div className="DetailPresentation-others-before">
                                    <Icon name="double-check" />
                                </div>
                                <div className="DetailPresentation-others-text">Otras respuestas</div>
                            </div>
                        );
                    }
                });
                
                this.setState({
                    answers: answersComponent,
                    question: response.data,
                    updated: true,
                });
            });
    }

    private selectBestAnswer = (data: any) => {
        const sendBestData = {
            sending: true,
            sent: false
        };

        if (this.props.hasOwnProperty('sendBest')) {
            this.props.sendBest(sendBestData);

            this.answerService.best(data)
                .then((response) => {
                    sendBestData.sending = false;
                    sendBestData.sent = true;
                    this.props.sendBest(sendBestData);
                });
        }
        
    }

    private GAEvent = () => {
        if (this.state.question.answers_total === 0) {
            ReactGA.event({
                action: 'Click Reply From Detail - No Answers',
                category: 'Replying',
                label: 'Question'
            });
        } else {
            ReactGA.event({
                action: 'Click Reply From Detail - More Than One Answer',
                category: 'Replying',
                label: 'Question'
            });
        }
    }
}

export default DetailPresentation;