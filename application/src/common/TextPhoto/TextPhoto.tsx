import * as React from 'react';
import { BoldText } from '../ConsoleText';
import Icon from '../Icon/Icon';

import './TextPhoto.scss';

interface IPropsTextPhoto {
    label: string;
    nameArea: string;
    namePhoto: string;
    placeholder: string;
    // validate: any;
    handleSubmit: any;
    handleChange: any;
    handleBlur: any;
    handleFocus: any;
    values: any;
    errors: any;
    touched: any;
    isValid: boolean;
    setFieldValue: any;
}

interface IStatesTextPhoto {
    activeTextarea: string;
    fileName: string;
}

class TextPhoto extends React.Component<IPropsTextPhoto, IStatesTextPhoto> {

    private file: any;
    private text: any;

    constructor(props: IPropsTextPhoto) {
        super(props);
        this.file = React.createRef();
        this.text = React.createRef();
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.onFocusText = this.onFocusText.bind(this);
        this.onBlurText = this.onBlurText.bind(this);
        this.onClickDel = this.onClickDel.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.state = {
            activeTextarea: "",
            fileName: "",
        }
    }
    
    public render () {
        const disabledPhoto = {
            disabled: false,
        };
        disabledPhoto.disabled = this.state.fileName !== "";
        
        return (
            <React.Fragment>
                <div className="TextPhoto">
                    <BoldText className="">{this.props.label}</BoldText>
                    <div className={`TextPhoto-textarea ${this.state.activeTextarea}`}>
                        <textarea
                            id={this.props.nameArea}
                            onBlur={this.onBlurText}
                            onChange={this.onChangeText}
                            name={this.props.nameArea}
                            placeholder={this.props.placeholder}
                            onFocus={this.onFocusText}
                            ref={this.text}
                        />
                        <div className="TextPhoto-textarea-attach">
                            <input 
                                ref={this.file}
                                type="file"
                                name={this.props.namePhoto}
                                id={this.props.namePhoto}
                                accept="image/*"
                                capture="camera"
                                onChange={this.onChangePhoto}
                                {...disabledPhoto} />
                            {this.showFileName()}
                            <label
                                className="TextPhoto-textarea-attach-icon" 
                                htmlFor="photo" 
                                {...disabledPhoto}>
                                <Icon name="photo"/>
                            </label>
                        </div>

                        <div className="TextPhoto-textarea-attach TextPhoto-textarea-attach--disabled">
                            <span />
                            <label className="TextPhoto-textarea-attach-icon">
                                <Icon name="photo"/>
                            </label>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private onChangePhoto(event: any) {
        this.props.handleChange(event);
        const nameFile = this.file.current.files[0].name;
        const splitName = nameFile.split('.');
        const typeFile = splitName[splitName.length - 1];
        let name = nameFile;
        if (nameFile.length > 10) {
            name = nameFile.substring(0, 7) + "[...]." + typeFile;
        }
        this.props.setFieldValue(this.props.namePhoto, this.file.current.files[0]);
        this.setState({
            activeTextarea: 'TextPhoto-textarea-active',
            fileName: name,
        });
    }

    private showFileName() {
        if (this.state.fileName !== "") {
            return <React.Fragment>
                <div className="TextPhoto-photo">
                    <span className="">{this.state.fileName}</span>
                    <a className="TextPhoto-photo-del"
                        onClick={this.onClickDel}
                    >x</a>
                </div>
            </React.Fragment>
        }
        return <span />;
    }

    private onClickDel() {
        this.setState({
            activeTextarea: "",
            fileName: "",
        });
        this.props.setFieldValue(this.props.namePhoto, null);
        this.file.current.value = "";
    }

    private onFocusText(event: any) {
        this.setState({activeTextarea: 'TextPhoto-textarea-active'});
    }

    private onBlurText(event: any) {
        this.props.handleBlur(event);
        if (this.text.current.value === "") {
            this.setState({activeTextarea: ''});
        }
    }

    private onChangeText(event: any) {
        this.props.handleChange(event);
    }
}

export default TextPhoto;