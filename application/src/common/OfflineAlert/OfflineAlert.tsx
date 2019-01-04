
import * as React from 'react';
import Icon from '../Icon/Icon';
import isIos from '../isIos';
import './OfflineAlert.scss';

interface IState {
    typeDescription: any;
    isOnline: boolean;
    isOnlineClosed: boolean;
}

class OfflineAlert extends React.Component<{}, IState> {
    private description: any;
    private CheckisMounted: boolean;

    constructor(props: any) {
        super(props);

        this.state =  {
            isOnline: true,
            isOnlineClosed: false,
            typeDescription: 'all'
        }

        this.description = {
            all: 'Puedes seguir navegando en modo offline.',
            question: 'Tus preguntas y respuestas se enviarán una vez que recuperes la conexión.'
        }
    }

    public componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.isOnline && !this.state.isOnline) {
            this.setState({
                isOnlineClosed: false
            }) 
        }
    }

    public componentDidMount() {
        this.CheckisMounted = true;
        (window as any).isOnline = true;

        if (isIos()) {
            document.body.classList.add('ios');
        }

        setInterval( () => {
            if (this.CheckisMounted) {
                this.setState({
                    isOnline: navigator.onLine,
                });

                if (window.location.pathname.includes('question') && !window.location.pathname.includes('my-questions')) {
                    this.setState({
                        typeDescription: this.description.question
                    }) 
                } else {
                    this.setState({
                        typeDescription: this.description.all
                    }) 
                }

                if (!navigator.onLine) {
                    document.body.classList.add('Offline');

                    (window as any).isOnline = false;
                } else {
                    document.body.classList.remove('Offline');
                    (window as any).isOnline = true;
                }
                
            }
        }, 250);
    }

    public componentWillUnmount() {
        this.CheckisMounted = false;
    }

    public render() {
        return (
            <React.Fragment>
                <div className={`OfflineAlert ${!this.state.isOnline && !this.state.isOnlineClosed ? 'OfflineAlert--active': ''}`}>
                    <div className="OfflineAlert__icon">
                        <Icon name="alert"/>
                    </div>
                    <div className="OfflineAlert__message">
                        <div className="OfflineAlert__title">No tienes conexión a internet.</div>
                        <div className="OfflineAlert__description">{this.state.typeDescription}</div>
                    </div>
                    <div className="OfflineAlert__close" onClick={this.showMini}>
                        <Icon name="close"/>
                    </div>
                </div>

                <div className={`OfflineAlert__mini ${this.state.isOnlineClosed && !this.state.isOnline ? 'OfflineAlert__mini--active': ''}`}>
                    No tienes conexión a internet.
                </div>
            </React.Fragment>
        )
    }

    private showMini = () => {
        this.setState({
            isOnlineClosed: true
        }) 
    }
}

export default OfflineAlert;
