import * as React from 'react';
import GenericImage from '../../assets/images/generic_error.png';
import { database, messaging } from "../../firebase/firebase";
import NotificationsService from '../../services/Notifications.service';
import isIos from '../isIos';
import Modal from '../Modal/Modal';
import OfflineAlert from '../OfflineAlert/OfflineAlert';
import './Layout.scss';

interface IState {
    currentModal: any;
}

interface IProps {
    disableNotifications?: boolean;
}

class Layout extends React.Component<IProps, IState> {
    private notificationsService: NotificationsService;
    private answers: any;

    constructor(props: any) {
        super(props);

        this.notificationsService = new NotificationsService();

        if (!this.props.hasOwnProperty('disableNotifications')) {
            if (messaging !== null) {
                this.enableNotifications(messaging);
            }
        }

        this.state = {
            currentModal: ''
        }

        this.answers = [];
    }

    public componentDidMount() {
        if (!this.props.hasOwnProperty('disableNotifications')) {
            if (isIos()) {
                this.realTime();
            }

            if (isIos('iphone')) {
                const userToken = window.localStorage.getItem('idUser');
                this.registerToken(`iphone_${userToken}`);
            }
        }
    }

    public render() {
        return (
            <div className="Layout">
                <div>{this.props.children}</div>
                {this.state.currentModal}
                <OfflineAlert />
                <img src={GenericImage} alt="" style={{display: 'none'}}/>
            </div>
        );
    }

    private enableNotifications(msg: any) {
        if (!window.sessionStorage.getItem("disableTokenRegistration")) {
            msg.requestPermission().then(() => {
                return msg.getToken();
            }).then((token: any) => {
                this.registerToken(token);
                window.sessionStorage.setItem('disableTokenRegistration', 'true');
            }).catch((err: any) => {
                window.console.log('Permission denied', err);
            });
        }

        msg.onMessage((payload: any) => {
            window.console.log('onMessage: ',payload);
            this.createModal(payload);
        });
    }

    private registerToken(token: any) {
        this.notificationsService.registry(token)
            .then((response) => {
                window.console.log(response);
                window.localStorage.setItem("browserToken", token);
            }); 
    }

    private objectModal(snapshot: any) {
        const data = Object.assign({}, snapshot);
        const result = {
            "data": {
                "gcm.notification.entity_id": data.entity_id,
                "gcm.notification.type": data.type
            },
            "notification": {
                "body": data.body,
                "click_action": data.click_action,
                "title": data.title
            }
        }

        return result;
    }

    private realTime() { 
        if (database) {
            database.on('value', (snapshot: any) => {
                if (snapshot) {
                    if (snapshot.val()) {
                        this.createModal(this.objectModal(snapshot.val()));
                        if (database) {
                            database.remove();
                        }
                    }
                }
                
            });
        }
    }

    private createModal(payload: any) {
        window.console.log(payload);
        if (payload.data['gcm.notification.type'] === "best_answer") {
            this.bestAnswerModal(payload);
        } else {
            this.newAnswerModal(payload);
        }
    }

    private newAnswerModal(payload: any) {
        const modalWithData = <Modal 
                                collection={this.answers}
                                type={payload.data['gcm.notification.type']}
                                onClose={this.clearModalData}
                            />;

        let updated = false;
        this.answers.forEach((answer: any) => {
            if (answer.id === payload.data['gcm.notification.entity_id']) {
                answer.counter++; 
                updated = true;
            }
        });

        if (!updated) {
            const newAnswer = {
                counter: 1,
                id: payload.data['gcm.notification.entity_id'],
                link: payload.notification.click_action,
                title: payload.notification.body
            };
    
            this.answers.push(newAnswer);
        }
        
        this.setState({currentModal: modalWithData });
    }

    private clearModalData = () => {
        this.answers = [];
        this.setState({currentModal: ''});
    };

    private bestAnswerModal(payload: any) {
        const modalWithData = <Modal 
                                title={payload.notification.body}
                                link={payload.notification.click_action} 
                                type={payload.data['gcm.notification.type']}
                                onClose={this.clearModalData}
                            />;
        this.setState({currentModal: modalWithData });
    }
}

export default Layout;
