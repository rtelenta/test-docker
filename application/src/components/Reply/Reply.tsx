import {Formik} from 'formik';
import * as React from 'react';
import * as ReactGA from "react-ga";
import Layout from '../../common/Layout/Layout';
import ModalGenericError from '../../common/ModalGenericError/ModalGenericError';
import {IMatchParam} from '../../interfaces/IMatchParam';
import AnswerService from '../../services/Answer.service';
import QuestionService from '../../services/Question.service';
import {schema} from './components/Reply.validation';
import ReplyForm from './components/ReplyForm/ReplyForm';
import ReplyPresentation from './components/ReplyPresentation/ReplyPresentation';
import ReplySent from './components/ReplySent/ReplySent';

interface IStatesReply {
    available: boolean;
    errorService: boolean;
    isLoading: boolean;
    question: any;
    sent: boolean;
}

interface IPropsReply {
    match: IMatchParam;
}

class Reply extends React.Component<IPropsReply, IStatesReply> {

    private answerService: AnswerService;
    private questionService: QuestionService;

    constructor(props: IPropsReply) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.answerService = new AnswerService();
        this.questionService = new QuestionService();
        this.state = {
            available: true,
            errorService: false,
            isLoading: false,
            question: {},
            sent: false,
        }
    }

    public componentDidMount() {
        const { match: { params } } = this.props;
        this.getQuestion(params.id);
        window.scrollTo(0, 0);
    }

    public render() {
        return (
            <Layout>
                {(() => {
                    if (this.state.sent) {
                        return (<ReplySent questionID={this.state.question.id} />);
                    }
                    return (
                        <ReplyPresentation question={this.state.question} >
                            <Formik initialValues={{reply: '', photo: null}}
                                onSubmit={this.onSubmit}
                                render={this.renderForm}
                                validationSchema={schema} />
                        </ReplyPresentation>);
                })()}

                { this.state.errorService && 
                    <ModalGenericError onClose={this.closeModalError} />
                }
            </Layout>
        );
    }

    public onSubmit(values: any) {
        if (this.state.available) {
            const data = {
                description: values.reply,
                media_url: "",
                question_id: this.state.question.id,
            }

            this.setState({
                isLoading: true
            });

            if (values.photo === null || !navigator.onLine) {
                this.answerService.save(data)
                    .then((response) => {
                        this.setState({isLoading: false, sent: true});
                        this.GAEvent();
                    }).catch(() => {
                        if (navigator.onLine) {
                            this.setState({
                                errorService: true,
                                isLoading: false
                            });
                        }
                    });
                
                if (!navigator.onLine) {
                    this.setState({isLoading: false, sent: true});
                }
            } else {
                const dataImage = new FormData();
                dataImage.append("image", values.photo);
                this.answerService.image(dataImage)
                    .then((response) => {
                        data.media_url = response.data.name;
                        return this.answerService.save(data);
                    }).then((response) => {
                        this.setState({isLoading: false, sent: true});
                        this.GAEvent();
                    }).catch(() => {
                        this.setState({
                            errorService: true,
                            isLoading: false
                        });
                    });
            }
            this.setState({available: false});
        }
    }

    public renderForm = (props: any) => {
        return (<ReplyForm {...props} isLoading={this.state.isLoading} />);
    }

    private closeModalError = () => {
        this.setState({errorService: false});
    }


    private GAEvent() {
        ReactGA.event({
            action: 'Send Reply',
            category: 'Replying',
            label: 'Question'
        });
    }   

    private getQuestion(id: string) {
        const currentQuestion = window.localStorage.getItem("currentQuestion");
        if (currentQuestion) {
            const currentQuestionParsed = JSON.parse(currentQuestion);

            this.setState({
                question: (currentQuestionParsed.id === id) ? currentQuestionParsed : {},
            });
        }

        this.questionService.getByID(id)
            .then((response) => {
                this.setState({question: response.data});
            });
    }
}

export default Reply;