import * as React from 'react';
import * as ReactGA from "react-ga";
import BestAnswer from '../../assets/images/best-answer.png';
import {Heading1} from '../../common/ConsoleText';
import DialogWindow from '../../common/DialogWindow/DialogWindow';
import Layout from '../../common/Layout/Layout';
import { IMatchParam } from '../../interfaces/IMatchParam';
import DetailPresentation from './components/DetailPresentation/DetailPresentation';

interface IPropsDetail {
    match: IMatchParam;
}

interface IStateDetail {
    id: string;
    sending: boolean;
    sent: boolean;
}

class Detail extends React.Component<IPropsDetail, IStateDetail> {

    constructor(props: IPropsDetail) {
        super(props);
        this.state = {
            id: "",
            sending: false,
            sent: false
        }
    }

    public componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({id: params.id});
        window.scrollTo(0, 0);
    }

    public render() {
        return (
            <Layout>
                {(() => {
                    if (!this.state.sending && !this.state.sent) {
                        return <DetailPresentation sendBest={this.sendBestAnswer} question={this.state.id} />
                    } else {
                        return (
                            <DialogWindow loading={this.state.sending} linkURL="/my-questions/abiertas" ImgIcon={BestAnswer}>
                                <Heading1>¡Genial! <br /> Elegiste una respuesta</Heading1>
                                <p>Sigue revisando tus preguntas en busca de la mejor respuesta e interactúa premiando a tu comunidad!</p>
                            </DialogWindow>
                        )
                    }
                })()}
            </Layout>
        );
    }

    private sendBestAnswer = (data: any) => {
        this.GAEvent(!(!this.state.sending && !this.state.sent));
        this.setState({
            sending: data.sending,
            sent: data.sent
        });
    }

    private GAEvent(isDialogWindow: boolean){
        if (isDialogWindow) {
            ReactGA.event({
                action: 'Click Done Best Answer',
                category: 'Rating',
                label: 'Question'
            });
        } else {
            ReactGA.event({
                action: 'Send Best Answer',
                category: 'Rating',
                label: 'Question'
            });
        }
    }
}

export default Detail;