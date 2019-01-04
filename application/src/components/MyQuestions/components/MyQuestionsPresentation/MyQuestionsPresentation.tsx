import * as React from 'react';
import * as ReactGA from "react-ga";
import * as InfiniteScroll from 'react-infinite-scroll-component';
import FilterTabs from '../../../../common/FilterTabs/FilterTabs';
import Header from '../../../../common/Header/Header';
import Loader from "../../../../common/Loader/Loader";
import ModalGenericError from '../../../../common/ModalGenericError/ModalGenericError';
import Navigation from '../../../../common/Navigation/Navigation';
import CoinService from '../../../../services/Coin.service';
import UserService from '../../../../services/User.service';
import MyQuestionCard from '../MyQuestionCard/MyQuestionCard';
import './MyQuestionsPresentation.scss';

interface IStatesMyQuestionsPresentation {
    coin: number;
    errorService: boolean;
    hasMore: boolean;
    isOnline: boolean;
    loading: boolean;
    nextPage: string;
    questions: any[];
    status: number;
}

interface Iprops {
    selectedTab: any;
}

class MyQuestionsPresentation extends React.Component<Iprops, IStatesMyQuestionsPresentation> {

    private userService: UserService;
    private coinService: CoinService;
    private tabStatus: any;

    constructor(props: any) {
        super(props);
        this.userService = new UserService();
        this.coinService = new CoinService();
        this.getMoreQuestions = this.getMoreQuestions.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            coin: 0,
            errorService: false,
            hasMore: false,
            isOnline: true,
            loading: true,
            nextPage: "",
            questions: [],
            status: 0,
        }

        this.tabStatus = {
            'abiertas': 1,
            'cerradas': 2,
            'todas': 0
        }
    }

    public componentDidMount() {
        this.getCoins();
        this.setInitStatus(() => {
            this.getQuestions("", this.state.status);
            this.setUrl(this.state.status, this.tabStatus);
        });
    }

    public render() {
        return (
            <div className="MyQuestionsPresentation">
                <Header coins={this.state.coin}>Mis Preguntas</Header>
                <div className="MyQuestionsPresentation-content">
                    <span className="MyQuestionsPresentation-content-description">
                        Revisa aquí todas las preguntas que hiciste y las que guardaste.
                    </span>
                    <div className="MyQuestionsPresentation-content-infinite">
                        <FilterTabs initTab={this.state.status} handleClick={this.handleClick} />
                        <InfiniteScroll
                            endMessage={""}
                            dataLength={this.state.questions.length}
                            onScroll={this.checkOnline}
                            next={this.getMoreQuestions}
                            hasMore={this.state.isOnline && this.state.hasMore}
                            loader={<Loader top={200} height={200}/>}
                            >
                            {(() => {
                                if (this.state.loading) {
                                    return (
                                        <Loader top={200} height={200}/>
                                    );
                                } else if (this.state.questions.length === 0) {
                                    return (
                                        <p className="MyQuestionsPresentation-content-empty"> No hay preguntas en esta sección :'(</p>
                                    );
                                } else {
                                    return this.state.questions.map((question) => {
                                        return (<MyQuestionCard question={question} key={question.id} />)
                                    })
                                }
                            })()}
                        </InfiniteScroll>
                    </div>
                    <Navigation />
                </div>

                { this.state.errorService && 
                    <ModalGenericError onClose={this.closeModalError} />
                }
            </div>
        );
    }

    private checkOnline = () => {
        this.setState({
            isOnline: navigator.onLine
        });
    }

    private closeModalError = () => {
        this.setState({errorService: false});
    }

    private setUrl(currentStatus: any, allStatus: any) {
        const stateObj = { tabID: currentStatus };
        const url = "/my-questions/"+this.getKeyByValue(allStatus, currentStatus);
        history.pushState(stateObj, "Pepe", url);
        ReactGA.pageview(url);
    }

    private getKeyByValue(object: any, value: any) {
        return Object.keys(object).find(key => object[key] === parseInt(value, 10));
    }

    private setInitStatus = (callback: any) => {
        const statusParam = this.props.selectedTab.hasOwnProperty('tab') ? this.props.selectedTab.tab : '';
        const statusNumber = this.tabStatus.hasOwnProperty(statusParam) ? this.tabStatus[statusParam] :  this.tabStatus.todas;
        
        this.setState({
            status: statusNumber
        }, callback);
    }

    private handleClick(event: any) {
        const dataStatus = event.target.getAttribute("data-status");
        const states = {
            hasMore: false,
            loading: true,
            nextPage: "",
            questions: [],
            status: dataStatus
        };
        this.setState(
            states,
            () => {
                this.setUrl(this.state.status, this.tabStatus);
                this.getQuestions("", dataStatus);
            }
        );
    }

    private getQuestions(nextPage: string, status: any) {
        const myQuestionsData = window.localStorage.getItem(`myQuestions_${status}`);

        if (myQuestionsData && nextPage === "") {
            this.setState({
                hasMore: false,
                loading: false,
                questions: JSON.parse(myQuestionsData)
            });
        }

        this.userService.questions(nextPage, status)
            .then((response) => {
                const data = nextPage === "" ? response.data.data : this.state.questions.concat(response.data.data);
                const active = document.getElementsByClassName("Tabs-item-active")[0].getAttribute("data-status");
                let states = {};

                if (response.data.current_page === 1) {
                    window.localStorage.setItem(`myQuestions_${status}`, JSON.stringify(data));
                }

                if (response.data.next_page_url === "" || response.data.data.length === 0) {
                    states = {
                        hasMore: false,
                        loading: false,
                        questions: data,
                    };
                } else {
                    states = {
                        hasMore: true,
                        loading: false,
                        nextPage: response.data.next_page_url,
                        questions: data,
                    };
                }
                if (active) {
                    if (parseInt(active, 10) === parseInt(status, 10)) {
                        this.setState(states);                    
                    }
                }
            }).catch(() => {
                this.setState({
                    errorService: true,
                    loading: false
                });
            });
    }

    private getMoreQuestions() {
        this.getQuestions(this.state.nextPage, this.state.status);
    }

    private getCoins() {
        this.coinService.get()
            .then((response: any) => {
                this.setState({coin: response.data.total});
            });
    }
}

export default MyQuestionsPresentation;