import * as React from 'react';
import Icon from '../../../../common/Icon/Icon';
import Loader from '../../../../common/Loader/Loader';
import './LoginForm.scss';

interface IPropsLoginForm {
    errorMessage: string;
    handleSubmit: any;
    handleChange: any;
    handleBlur: any;
    handleFocus: any;
    values: any;
    errors: any;
    touched: any;
    isValid: boolean;
    isLogged: any;
    isLoading: boolean;
}

interface IStatesLoginForm {
    isLogged: boolean;
}

class LoginForm extends React.Component<IPropsLoginForm, IStatesLoginForm> {

    constructor(props: IPropsLoginForm) {
        super(props);
        this.customHandleChange = this.customHandleChange.bind(this);
        this.state = {
            isLogged: this.props.isLogged,
        }
    }

    public componentDidUpdate(preProps: any) {        
        if (this.props.isLogged !== preProps.isLogged) {
            this.setState({isLogged: this.props.isLogged});
        }
    }

    public render() {
        const isLogged = this.props.isLogged;
        const error = isLogged ? "" : "LoginForm-group-error"
        return (
            <form className="LoginForm" onSubmit={this.props.handleSubmit}>
                <div className={`LoginForm-group ${error}`}>
                    <label htmlFor="user">USUARIO</label>
                    <input type="text" name="user" id="user" placeholder="Ingresa tu usuario"
                        onChange={this.customHandleChange}
                        onBlur={this.props.handleBlur}
                        onFocus={this.props.handleFocus}/>
                </div>
                <div className={`LoginForm-group ${error}`}>
                    <label htmlFor="password">CONTRASEÑA</label>
                    <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña"
                        onChange={this.customHandleChange}
                        onBlur={this.props.handleBlur}
                        onFocus={this.props.handleFocus}/>
                </div>
                {(() => {
                    if (!isLogged) {
                        return (
                            <div className="LoginForm-error">
                                <Icon name="alert" />
                                <span>{this.props.errorMessage}</span>
                            </div>
                        );
                    }
                    return null;
                })()}
                <div className="LoginForm-forget">
                    <a target="_blank" href="https://contrasena.utp.edu.pe/Recuperacion/OlvideMiClave.aspx">¿Olvidaste tu contraseña?</a>
                </div>
                <div className="LoginForm-login">
                    { !this.props.isLoading && 
                        <button type="submit" className="active">Iniciar sesión</button>
                    }

                    { this.props.isLoading && 
                        <button className="active" disabled={true}><Loader /></button>
                    }
                </div>
                <div className="LoginForm-terms">
                    <p>Al iniciar sesión, aceptas nuestros <a href="https://storage.googleapis.com/flash-storage-prod-api/pepe/documentos/terminos_y_condiciones.pdf" target="_blank">Términos y Condiciones</a> y <a href="https://storage.googleapis.com/flash-storage-prod-api/pepe/documentos/terminos_y_condiciones.pdf" target="_blank">Políticas de Privacidad</a></p>
                    <p className="LoginForm__pilot-text">Pepe se encuentra en una fase piloto y cualquier sugerencia de mejora será bienvenida; no dudes en escribirnos a <a href="mailto:soportepepe@lacafetalab.pe" target="_blank">soportepepe@lacafetalab.pe</a></p>
                </div>
            </form>
        );
    }

    private customHandleChange(event: any) {
        this.props.handleChange(event);
        if (!this.props.isLogged) {
            this.setState({isLogged: !this.props.isLogged});     
        }
    }
}

export default LoginForm;