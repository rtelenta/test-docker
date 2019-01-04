import * as React from 'react';
import * as Modal from 'react-modal';
import './SideMenu.scss'

interface IProps {
    requestCloseModal: any;
    modalIsOpen: any;
    customOverlay?: any;
}

interface IState {
    afterOpenClass: string;
}

class SideMenu extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            afterOpenClass: ''
        }

        Modal.setAppElement('#root');
    }

    public componentDidUpdate(prevProps: any) {
        if (prevProps !== this.props) {
            if (!this.props.modalIsOpen) {
                this.setState({
                    afterOpenClass: ''
                })
            }
        }
    }

    public render() {
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.requestCloseModal}
                onAfterOpen={this.afterOpenModal}
                contentLabel="Menu Lateral"
                portalClassName="SideMenu"
                closeTimeoutMS={200}
                bodyOpenClassName="SideMenu__body--open"
                className={`SideMenu__Content ${this.props.modalIsOpen ? this.state.afterOpenClass : ''}`}
                overlayClassName={`SideMenu__Overlay ${(this.props.customOverlay) ? this.props.customOverlay : ''}`}
            >
                {this.props.children}
            </Modal>
        );
    }

    private afterOpenModal = () => {
        setTimeout(() => {
            this.setState({
                afterOpenClass: 'ReactModal__Content--is-open'
            })
        }, 220);  
    }
}

export default SideMenu;