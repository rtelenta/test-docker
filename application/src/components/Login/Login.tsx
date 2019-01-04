import {Formik} from 'formik';
import * as React from 'react';
import * as ReactGA from "react-ga";
import { Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../common/Auth';
import ModalGenericError from '../../common/ModalGenericError/ModalGenericError';
import LoginService from '../../services/Login.service';
import UserService from '../../services/User.service';
import Onboarding from '../Onboarding/Onboarding';
import {schema} from './components/Login.validation';
import LoginForm from './components/LoginForm/LoginForm';
import LoginPresentation from './components/LoginPresentation/LoginPresentation';

interface IStateLogin {
    errorMessage: string;
    errorService: boolean;
    isLoading: boolean;
    isLogged: boolean;
}

class Login extends React.Component <{}, IStateLogin> {
    private userService: UserService;
    private loginService: LoginService;
    private storage: any;
    private flagOnBoarding: boolean;
 
    constructor(props: any) {
        super(props);
        this.loginService = new LoginService();
        this.userService = new UserService
        this.storage = window.localStorage;
        this.renderForm = this.renderForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            errorMessage: "",
            errorService: false,
            isLoading: false,
            isLogged: true,
        }
        this.flagOnBoarding = true;
    }

    public render() {
        if (isLoggedIn()) {
            return (<Redirect to="/explorer" />);
        } else if (this.storage.getItem("onboarding")) {
            return (
                <React.Fragment>
                    <LoginPresentation>
                        <Formik 
                                initialValues={{}}
                                render={this.renderForm}
                                onSubmit={this.onSubmit}
                                validationSchema={schema}
                        />
                    </LoginPresentation>
                    { this.state.errorService && 
                        <ModalGenericError onClose={this.closeModalError} />
                    }
                </React.Fragment>
            );
        } else {
            if (this.flagOnBoarding) {
                this.flagOnBoarding = false;
                this.GAEvent(true);
            }
            return (<Onboarding />)
        }
        
    }

    private renderForm(props: any) {
        return (<LoginForm {...props} isLoading={this.state.isLoading} isLogged={this.state.isLogged} errorMessage={this.state.errorMessage} />);
    }

    private onSubmit(values: any) {
        const data = {
            password: values.password,
            type: 'student',
            user: values.user,
        };

        if (data.password === '' || data.user === '' || typeof data.user === 'undefined' || typeof data.password === 'undefined') {
            this.setState({
                errorMessage: 'Ingresar usuario y/o contraseña',
                isLoading: false,
                isLogged: false,
            });

            return;
        }


        let loginResponse: any;
        let jwtToken: any;

        this.setState({
            isLoading: true
        });

        this.loginService.login(data)
            .then((response: any) => {
                if (response.error) {
                    this.setState({
                        errorMessage: response.message,
                        isLoading: false,
                        isLogged: false,
                    });

                    return false;
                } else {
                    loginResponse = response;
                    jwtToken = this.decodeToken(response.data.token);

                    this.storage.setItem('idUser', jwtToken.data.id);
                    this.storage.setItem('token', loginResponse.data.token);
                    this.storage.setItem('refresh', loginResponse.data.refresh);
                    return this.userService.getMyCourses(jwtToken.data.id, loginResponse.data.token);
                }
            }).then((response: any) => {
                if (response) {
                    const topicStates: any = [];
                    this.GAEvent(false);

                    if (window.sessionStorage.getItem("disableTokenRegistration")) {
                        window.sessionStorage.removeItem('disableTokenRegistration');
                    }

                    this.storage.setItem('myCourses', JSON.stringify(response.data));

                    Object.keys(response.data).forEach((key: any) => {
                        topicStates.push(response.data[key].id);
                    });
                    this.storage.setItem("topicStates", JSON.stringify(topicStates));
                    this.storage.setItem("sortStatus", 1);

                    window.location.href = '/explorer';
                }
            }).catch(() => {
                this.setState({
                    errorService: true,
                    isLoading: false
                });
            });
    }

    private closeModalError = () => {
        this.setState({errorService: false});
    };

    private GAEvent(isOnBoarding: boolean){
        if (isOnBoarding) {
            ReactGA.event({
                action: 'OnBoarding',
                category: 'User Login',
                label: 'Login'
            });
        } else {
            ReactGA.event({
                action: 'Logged',
                category: 'User Login',
                label: 'Login'
            }); 
        }
    }

    private decodeToken(token: string){
        return JSON.parse(atob(token.split('.')[1]));
    }
}

export default Login;
