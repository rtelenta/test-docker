import * as React from 'react';
import * as ReactGA from "react-ga";
import { Redirect } from 'react-router-dom';
import Sent from '../../../../assets/images/sent.png';
import {BoldText, Heading1} from '../../../../common/ConsoleText';
import DialogWindow from '../../../../common/DialogWindow/DialogWindow';
import Points from '../../../../common/Point/Point';
import Settings from '../../../../settings';
import './QuestionSent.scss';

interface IProps {
    coins: number;
    questionID: any;
}

interface IState {
    redirect: any;
}

class QuestionSent extends React.Component<IProps, IState> {
    private linkUrl: string;

    constructor(props: IProps) {
        super(props);

        this.linkUrl = `/explorer`;

        this.state = {
            redirect: false
        };
    }

    public render() {
        const coins = this.props.coins;
        const coinStyle = {
            borderRadius: '1.8ch',
            margin: '0 auto',
            width:'auto'
          };
        return (
            <DialogWindow customButtonAction={this.confirmQuestion} ImgIcon={Sent}>
                <Heading1>Pregunta enviada</Heading1>
                { !navigator.onLine && 
                    <p>Tu pregunta será publicada poco después de que recuperes la conexión de internet.</p>
                }

                { navigator.onLine && 
                    <p>Te notificaremos cuando empiecen a responderte.</p>
                }
                { Settings.enableCoins && 
                    <div className="QuestionSent-point">
                        <Points style={coinStyle} coins={new Intl.NumberFormat('es-PE').format(coins)}><BoldText>TE QUEDAN </BoldText></Points>
                    </div>
                }
                {this.state.redirect}
            </DialogWindow>
        );
    }

    private confirmQuestion = () => {
        ReactGA.event({
            action: 'Click Done Question',
            category: 'Creating',
            label: 'Question'
        });
        this.setState({redirect: <Redirect to={this.linkUrl} push={true} />});
    }
}

export default QuestionSent;
