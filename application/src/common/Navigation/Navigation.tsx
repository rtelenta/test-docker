import * as React from 'react';
import * as ReactGA from "react-ga";
import { Link } from 'react-router-dom';
import UserService from '../../services/User.service';
import Icon from '../Icon/Icon';
import './Navigation.scss';

interface IState {
    numNotifications: any;
}

class Navigation extends React.Component<{}, IState> {
    private userService: UserService;

    constructor(props: any) {
        super(props);

        this.state = {
            numNotifications: 0
        };

        this.userService = new UserService;
    }

    public componentDidMount() {
        this.getNotifications();
    }

    public render () {
        
        return (
            <div className="Navigation">
                <Link onClick={this.handleClickExplorer} className={`Navigation-link ${window.location.pathname.includes('/explorer') ? "Navigation-link-active" : ""}`} to="/explorer">
                    <Icon name="dialog" />
                    <span>EXPLORAR</span>
                </Link>
                <Link className="Navigation-add" to="/question" onClick={this.handleClickAddQuestion}>
                    <Icon name="add-question" />
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </Link>
                <a className="Navigation-add Navigation-add--disabled">
                    <Icon name="add-question-disabled" />
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </a>
                <Link onClick={this.handleClickMyQuestions} className={`Navigation-link ${window.location.pathname.includes('/my-questions') ? "Navigation-link-active" : ""}`} to="/my-questions">
                    <Icon name="my-questions" />
                    <span>MIS PREGUNTAS</span>
                    { this.state.numNotifications > 0 && 
                        <div className="Navigation__notifications">{this.state.numNotifications}</div>
                    }
                </Link>
            </div>
        );
    }

    private handleClickAddQuestion = () => {
        ReactGA.event({
            action: 'Click Add Question',
            category: 'Creating',
            label: 'Question'
        });
    }

    private handleClickExplorer = () => {
        ReactGA.event({
            action: 'Click Explorer',
            category: 'Explorer',
            label: 'Questions'
        });
    }

    private handleClickMyQuestions = () => {
        ReactGA.event({
            action: 'Click My Questions',
            category: 'My Questions',
            label: 'Questions'
        });
    }

    private getNotifications() {
        this.userService.getNotifications()
            .then((response) => {
                this.setState({
                    numNotifications: response.data.total
                })
            });
    }
}

export default Navigation;