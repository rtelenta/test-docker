import * as React from 'react';
import * as Modal from 'react-modal';
import ModalIconGeneric from '../../assets/images/generic_error.png';
import {Heading1} from '../ConsoleText';
import DialogWindow from '../DialogWindow/DialogWindow';
import Icon from '../Icon/Icon';
import './ModalGenericError.scss'

interface IState {
    modalIsOpen: boolean;
}

interface IProps {
    onClose?: any;
}

class ModalError extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

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
                contentLabel="Error"
                portalClassName="ModalError"
                closeTimeoutMS={200}
                bodyOpenClassName="ModalError__body--open"
                className="ReactModal__Content"
                overlayClassName="ReactModal__Overlay"
            >

                <button className="ReactModal__close" onClick={this.closeModal}>
                    <Icon name="close" />
                </button>
                

                {this.dialogWindowGeneric()}
            </Modal>
        );
    }
    
    private openModal = () => {
        this.setState({modalIsOpen: true});
    }
    
    private closeModal = () => {
        this.setState({modalIsOpen: false});
        this.props.onClose();
    }

    private dialogWindowGeneric() {
        return (<DialogWindow customButtonAction={this.closeModal} linkText={'Vuelve a intentarlo'} ImgIcon={ModalIconGeneric}>
            <Heading1>¡Ooops!<br />Ocurrió un problema</Heading1>
            <p>
                Danos otra oportunidad y vuelve a intentarlo.
            </p>
        </DialogWindow>)
    }
}

export default ModalError;