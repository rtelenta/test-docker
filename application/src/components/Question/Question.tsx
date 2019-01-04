import { Formik } from 'formik';
import { getSchema } from './components/Question.validation';

import * as React from 'react';
import * as ReactGA from "react-ga";
import Layout from '../../common/Layout/Layout';
import ModalGenericError from '../../common/ModalGenericError/ModalGenericError';
import CoinService from '../../services/Coin.service';
import ImageService from '../../services/Image.service';
import QuestionService from '../../services/Question.service';
import QuestionForm from './components/QuestionForm/QuestionForm';
import QuestionPresentation from './components/QuestionPresentation/QuestionPresentation';
import QuestionSent from './components/QuestionSent/QuestionSent';

interface IStateLoginForm {
    available: boolean;
    buttonAttr: any;
    coinInputAttr: any;
    coins: number;
    errorService: boolean;
    isLoading: boolean;
    isLogin: boolean;
    questionID: any;
    sentQuestion: boolean;
    total: number;
}

class Question extends React.Component <{}, IStateLoginForm> {

    private questionService: QuestionService;
    private coinService: CoinService;
    private imageService: ImageService;

    constructor(props: any) {
        super(props);
        this.questionService = new QuestionService();
        this.coinService = new CoinService();
        this.imageService = new ImageService();
        this._renderForm = this._renderForm.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this.state = {
            available: true,
            buttonAttr: {disabled: false},
            coinInputAttr: {},
            coins: 0,
            errorService: false,
            isLoading: false,
            isLogin: false,
            questionID: 0,
            sentQuestion: false,
            total: 0
        };
    }

    public componentDidMount() {
        this.getCoins();
        window.scrollTo(0, 0);
    }
    
    public render() {
        return (
            <Layout>
                {!this.state.sentQuestion ?
                    <QuestionPresentation coins={this.state.total}>
                        <Formik
                                initialValues={{ title: '', description: '', category_id: ''}}
                                validationSchema={getSchema(this.state.total)}
                                onSubmit={this._onSubmit}
                                render={this._renderForm}
                            />
                    </QuestionPresentation>
                    : <QuestionSent questionID={this.state.questionID} coins={this.state.coins}/>
                }

                { this.state.errorService && 
                    <ModalGenericError onClose={this.closeModalError} />
                }
            </Layout>
        );
    }

    private closeModalError = () => {
        this.setState({errorService: false});
    }

    private GAEvent() {
        ReactGA.event({
            action: 'Send Question',
            category: 'Creating',
            label: 'Question'
        });
    }

    private _onSubmit(values: any) {
        if (this.state.available) {
            this.setState({buttonAttr: {disabled: true}});
            if (!values.coin) {
                values.coin = 0;
            }

            this.setState({
                isLoading: true
            });

            // use services
            if (typeof values.photo === 'undefined' || !navigator.onLine) {
                this.questionService.save(values)
                    .then((response: any) => {
                        this.setState({sentQuestion: true, coins: response.data.total, isLoading: false, questionID: response.data.id});
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
                    this.setState({isLoading: false, sentQuestion: true});
                }
            } else {
                const data = new FormData();
                data.append('image', values.photo);
                this.imageService.save(data)
                    .then((response: any) => {
                        values.media_url = response.data.name;
                        return this.questionService.save(values);
                    }).then((response: any) => {
                        this.setState({sentQuestion: true, coins: response.data.total, isLoading: false, questionID: response.data.id});
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

    private _renderForm (props: any) {
        return (<QuestionForm {...props} isLoading={this.state.isLoading} buttonAttr={this.state.buttonAttr}
                coinInputAttr={this.state.coinInputAttr}
                coins={this.state.total}/>);
    }

    private getCoins() {
        this.coinService.get()
            .then((response: any) => {
                this.setState({
                    coinInputAttr: {disabled: response.data.total === 0},
                    total: response.data.total,
                });
            });
    }

}

export default Question;
