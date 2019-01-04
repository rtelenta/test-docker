import * as React from 'react';
import { Redirect } from 'react-router';
import Avatar from '../../common/Avatar/Avatar';
import Icon from '../../common/Icon/Icon';
import SideMenu from '../../common/SideMenu/SideMenu';
import LoginService from '../../services/Login.service';
import UserService from '../../services/User.service';
import './MainMenu.scss';

interface IState {
    isActive: boolean;
    redirect: boolean;
    user: any;
}

class MainMenu extends React.Component<{}, IState> {
    private userService: UserService;
    private loginService: LoginService;

    constructor(props: any) {
        super(props);

        this.state = {
            isActive: false,
            redirect: false,
            user: {}
        }

        this.userService = new UserService;
        this.loginService = new LoginService;
    }

    public componentDidMount() {
        this.getUserInfo();
    }

    public render() {
        return (
            <div className="MainMenu">
                <button className={`hamburger hamburger--spin ${this.getActiveClass()}`} type="button" onClick={this.toggleActive}>
                    <span className="hamburger-box">
                        <span className="hamburger-inner" />
                    </span>
                </button>

                <SideMenu requestCloseModal={this.closeModal} modalIsOpen={this.state.isActive} customOverlay="MainMenu__overlay">
                    <div className="MainMenu__inner">
                        <Avatar image={this.state.user.image} onUpload={this.updateImage} imageUrl={this.state.user.url_image} canEdit={true} small={false} author={this.state.user.name + " " + this.state.user.last_name} />

                        <div className="MainMenu__bottom">
                            <button className="MainMenu__logout" onClick={this.logout}>
                                <Icon name="exit" /> Cerrar sesión
                            </button>
                        </div>
                    </div>
                </SideMenu>
                
                { this.state.redirect &&  
                    <Redirect to="/" />
                }
            </div>
        );
    }

    private updateImage = (img: string) => {
        const user = {...this.state.user}
        user.url_image = img;
        this.setState({
            user
        })
    }

    private toggleActive = () => {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }));
    }

    private closeModal = () => {
        this.setState({
            isActive: false
        });
    }

    private getActiveClass() {
        return (this.state.isActive ? 'is-active' : '');
    }

    private clearSessions() {
        window.localStorage.clear();
        window.sessionStorage.clear();
        window.localStorage.setItem("onboarding", "1");
    }

    private logout = () => {
        if ((window as any).isOnline) {
            this.loginService.logout()
                .then((response: any) => {
                    this.clearSessions();

                    this.setState({
                        redirect: true
                    });
                });
        } else {
            this.clearSessions();

            this.setState({
                redirect: true
            });
        }
    }

    private getUserInfo() {
        this.userService.getInfo()
            .then((response: any) => {
                this.setState({
                    user: response.data
                });
            });
    }
}

export default MainMenu;
