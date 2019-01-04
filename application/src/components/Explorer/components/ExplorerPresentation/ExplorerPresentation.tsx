import * as React from 'react';
import * as ReactGA from "react-ga";
import * as InfiniteScroll from 'react-infinite-scroll-component';
import FilterQuestions from '../../../../common/FilterQuestions/FilterQuestions';
import FilterTabs from '../../../../common/FilterTabs/FilterTabs';
import Header from '../../../../common/Header/Header';
import Loader from "../../../../common/Loader/Loader";
import ModalGenericError from '../../../../common/ModalGenericError/ModalGenericError';
import Navigation from '../../../../common/Navigation/Navigation';
import CoinService from '../../../../services/Coin.service';
import QuestionService from '../../../../services/Question.service';
import ExplorerQuestion from '../ExplorerQuestion/ExplorerQuestion';
import './ExplorerPresentation.scss';

interface IStateExplorerPresentation {
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

class ExplorerPresentation extends React.Component<Iprops, IStateExplorerPresentation> {

    private coinService: CoinService;
    private questionService: QuestionService;
    private tabStatus: any;

    constructor(props: any) {
        super(props);
        this.coinService = new CoinService();
        this.questionService = new QuestionService();
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
            status: 0
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

    public render () {
        return (
            <div className="ExplorerPresentation">
                <Header coins={this.state.coin}>Explorar</Header>
                <div className="ExplorerPresentation-content">
                    <div className="ExplorerPresentation-content-description">
                        <p>Mira que están preguntando tus compañeros</p>

                        <FilterQuestions />
                    </div>
                    <div className="ExplorerPresentation-content-infinite">
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
                                }else {
                                    return this.state.questions.map((question) => {
                                        return (<ExplorerQuestion question={question} key={question.id} />)
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
            </div>);
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
        const url = "/explorer/"+this.getKeyByValue(allStatus, currentStatus);
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
        const topicStates = window.localStorage.getItem('topicStates');
        const sortStatus = window.localStorage.getItem('sortStatus');
        const explorerData = window.localStorage.getItem(`explorer_${status}`);

        let service: any;

        if (explorerData && nextPage === "") {
            this.setState({
                hasMore: false,
                loading: false,
                questions: JSON.parse(explorerData)
            });
        }

        if (topicStates && sortStatus) {
            service = this.questionService.get(nextPage, status, sortStatus, JSON.parse(topicStates));
        } else {
            service = this.questionService.get(nextPage, status);
        }
        
        service
            .then((response: any) => {
                const data = nextPage === "" ? response.data.data : this.state.questions.concat(response.data.data);
                const tabHtml = document.getElementsByClassName("Tabs-item-active");
                const active = (tabHtml.length) ? tabHtml[0].getAttribute("data-status") : false;
                let states = {};

                if (response.data.current_page === 1) {
                    window.localStorage.setItem(`explorer_${status}`, JSON.stringify(data));
                }

                if (response.data.next_page_url === "" || response.data.data.length === 0) {
                    states = {
                        hasMore: false,
                        loading: false,
                        questions: data
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

export default ExplorerPresentation;