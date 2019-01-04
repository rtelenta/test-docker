import * as React from 'react';
import * as ReactGA from "react-ga";
import { Redirect } from 'react-router-dom';
import Sent from '../../../../assets/images/sent-answer.png';
import {Heading1} from '../../../../common/ConsoleText';
import DialogWindow from '../../../../common/DialogWindow/DialogWindow';

import './ReplySent.scss';

interface IPropsReplySent {
    questionID: any;
}

interface IState {
    redirect: any;
}

class ReplySent extends React.Component<IPropsReplySent, IState> {
    private linkUrl: string;

    constructor(props: IPropsReplySent) {
        super(props);

        this.state = {
            redirect: false
        };
        this.linkUrl = `/question/${this.props.questionID}/detail`;
    }

    public render () {
        return (
            <DialogWindow customButtonAction={this.confirmReply} ImgIcon={Sent}>
                <Heading1>Respuesta enviada</Heading1>
                { !navigator.onLine && 
                    <p>¡Muchas gracias por responder!<br />
                    Tu respuesta será enviada poco después de que recuperes la conexión de internet.</p>
                }

                { navigator.onLine && 
                    <p>¡Muchas gracias por responder!<br />Te avisaremos si tu respuesta es elegida como la mejor.</p>
                }

                {this.state.redirect}
            </DialogWindow>
        );
    }

    private confirmReply = () => {
        ReactGA.event({
            action: 'Click Done Reply',
            category: 'Replying',
            label: 'Question'
        });
        this.setState({redirect: <Redirect to={this.linkUrl} push={true} />});
    }

   
}

export default ReplySent;