import * as React from 'react';
import * as Modal from 'react-modal';
import ModalIconBest from '../../assets/images/modal_best.png';
import ModalIconNew from '../../assets/images/modal_new.png';
import {Heading1, Heading2} from '../ConsoleText';
import DialogWindow from '../DialogWindow/DialogWindow';
import Icon from '../Icon/Icon';
import Slider from '../Slider/Slider';
import './Modal.scss'

interface IState {
    modalIsOpen: boolean;
}

interface IProps {
    link?: any;
    title?: string;
    type?: any;
    collection?: any;
    onClose?: any;
}

class ModalNotification extends React.Component<IProps, IState> {
    private modalButtons: any;

    constructor(props: IProps) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.modalButtons = {
            best_answer: 'Ver tu respuesta',
            new_answer: 'Ver respuesta'
        }

        Modal.setAppElement('#root');
    }

    public componentDidMount() {
        this.openModal();
    }

    public render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Notificaciones"
                portalClassName="Notifications"
                closeTimeoutMS={200}
                bodyOpenClassName="Notifications__body--open"
                className="ReactModal__Content"
                overlayClassName="ReactModal__Overlay"
            >

                <button className="ReactModal__close" onClick={this.closeModal}>
                    <Icon name="close" />
                </button>
                

                {this.props.type === "best_answer" ? this.dialogWindowBest() : this.dialogWindowNew()}
            </Modal>
        );
    }

    private getLinkUrl() {
        return this.props.link
    }

    private getLinkText() {
        if (this.modalButtons.hasOwnProperty(this.props.type)) {
            return this.modalButtons[this.props.type]
        }

        return 'Listo'
    }

    private getTitle() {
        if (this.props.type === "best_answer") {
            return 'Eligieron tu respuesta como la mejor'
        } else if (this.props.collection.length === 1) {
            return `Tienes ${this.props.collection[0].counter} respuesta(s) a tu pregunta:`;
        }

        return `Respondieron a ${this.props.collection.length} de tus preguntas:`;
    }
    
    private openModal = () => {
        this.setState({modalIsOpen: true});
    }
    
    private closeModal = () => {
        this.setState({modalIsOpen: false});
        this.props.onClose();
    }

    private dialogWindowNew() {
        return (<DialogWindow ImgIcon={ModalIconNew}>
            <Heading1>{this.getTitle()}</Heading1>
            <div className="ReactModal__Box">
                <Slider list={this.props.collection} />
            </div>
        </DialogWindow>)
    }

    private linkButtonActionBest = () => {
        window.location.href = this.getLinkUrl();
    }

    private dialogWindowBest() {
        return (<DialogWindow customButtonAction={this.linkButtonActionBest} linkText={this.getLinkText()} ImgIcon={ModalIconBest}>
            <Heading1>{this.getTitle()}</Heading1>
            <div className="ReactModal__Box">
                <Heading2 className="ReactModal__subtitle">Respondiste a:</Heading2>
                <Heading1 className="ReactModal__description">
                    {this.props.title}
                </Heading1>
            </div>
        </DialogWindow>)
    }
}

export default ModalNotification;