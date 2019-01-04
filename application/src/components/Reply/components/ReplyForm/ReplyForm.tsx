import * as React from 'react';
import * as ReactGA from "react-ga";
import {BoldText} from '../../../../common/ConsoleText';
import Icon from '../../../../common/Icon/Icon';
import InputError from "../../../../common/InputError/InputError";
import Loader from '../../../../common/Loader/Loader';
import TextPhoto from '../../../../common/TextPhoto/TextPhoto';
import './ReplyForm.scss';

interface IPropsReplyForm {
    handleSubmit: any;
    handleChange: any;
    handleBlur: any;
    handleFocus: any;
    values: any;
    errors: any;
    touched: any;
    isValid: boolean;
    isLoading?: boolean;
    setFieldValue: any;
    validate: any;
}

class ReplyForm extends React.Component<IPropsReplyForm, {}> {
    private flagGA: boolean;

    constructor(props: IPropsReplyForm) {
        super(props);

        this.flagGA = true;
    }

    public render() {
        const disabledButton = {
            disabled: false,
        };
        disabledButton.disabled = this.isDisabled() || !this.props.isValid;
        return (
            <form className="ReplyForm" onSubmit={this.props.handleSubmit}>
                <TextPhoto {...this.props}
                    label="TU RESPUESTA" 
                    nameArea="reply" 
                    namePhoto="photo"
                    placeholder="Escribe una respuesta" />
                <InputError error={this.props.errors.reply} touched={this.props.touched.reply}/>
                { !this.props.isLoading && 
                    <button type="submit" className="send-button" {...disabledButton}>
                        <Icon name="send" />
                        <BoldText>Publicar respuesta</BoldText>
                    </button>
                }

                { this.props.isLoading && 
                    <button className="send-button" disabled={true} type="button" style={{"padding": 6}}>
                        <Loader />
                    </button>
                }
            </form>
        );
    }

    private isDisabled() {
        if (this.props.values.reply !== '' || this.props.values.photo !== null) {
            if (this.flagGA) { 
                this.flagGA = false;
                ReactGA.event({
                    action: 'Fill Reply',
                    category: 'Replying',
                    label: 'Question'
                });
            }
        }
        
        return this.props.values.reply === "" && this.props.values.photo === null;
    }
}

export default ReplyForm;