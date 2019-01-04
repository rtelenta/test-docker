import { BoldText } from '../../../../common/ConsoleText';

import * as React from 'react';
import * as ReactGA from "react-ga";
import Icon from '../../../../common/Icon/Icon';
import InputError from "../../../../common/InputError/InputError";
import InputInfo from "../../../../common/InputInfo/InputInfo";
import Loader from '../../../../common/Loader/Loader';
import TextPhoto from "../../../../common/TextPhoto/TextPhoto";
import Settings from "../../../../settings";
import './QuestionForm.scss';

interface IPropsQuestionForm {
    handleSubmit: any;
    handleChange: any;
    handleBlur: any;
    handleFocus: any;
    values: any;
    errors: any;
    touched: any;
    buttonAttr: any;
    coinInputAttr: any;
    isValid: boolean;
    isLoading?: boolean;
    coins: number;
    setFieldValue: any;
}

interface IStatesQuestionForm {
    fileInput: any;
    fileName: string;
    focusClass: string;
    minCoins: number;
    myCourses: any;
    validClassCoin: string;
    validClassTheme:string;
    validClassTittle: string;
    valueCoin: string | number;
}

class QuestionForm extends React.Component<IPropsQuestionForm, IStatesQuestionForm> {
    private sendFieldEvent: boolean;

    constructor(props: IPropsQuestionForm) {
        super(props);
        this.onChangeCoin = this.onChangeCoin.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeTheme = this.onChangeTheme.bind(this);
        this.state = {
            fileInput: React.createRef(),
            fileName: "",
            focusClass: "",
            minCoins: 0,
            myCourses: [],
            validClassCoin: "",
            validClassTheme: "",
            validClassTittle: "",
            valueCoin: "",
        }

        this.sendFieldEvent = true;
    }

    public componentDidMount() {
        const myCourses = window.localStorage.getItem("myCourses");

        if (myCourses) {
            this.setState({
                myCourses: JSON.parse(myCourses).sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)),
            })
        }
    }

    public render() {
        const inputClassTitle = this.getClassTitle(this.props.errors.title, this.props.touched.title);
        const inputClassCoin  = this.getClassCoin(this.props.errors.coin, this.props.touched.coin);
        const buttonAttr = {...this.props.buttonAttr};
        const coinInputAttr = {...this.props.coinInputAttr};
        const disabledPhoto = {
            disabled: false,
        };
        disabledPhoto.disabled = this.state.fileName !== "";
        buttonAttr.disabled = !this.props.isValid;
        return (
            <form className="QuestionForm" onSubmit={this.props.handleSubmit}>
                <div className="QuestionForm-box-title">
                    <BoldText>PREGUNTA</BoldText>
                    <input
                        onChange={this.onChangeTitle}
                        onBlur={this.props.handleBlur}
                        onFocus={this.props.handleFocus}
                        name="title"
                        placeholder="Ingresa una pregunta"
                        className={`QuestionForm-box-title-input ${inputClassTitle} ${this.state.validClassTittle}`}
                    />
                    <InputError error={this.props.errors.title} touched={this.props.touched.title}/>
                </div>
                <div className="QuestionForm-box-type">
                    <BoldText>CURSO</BoldText>
                    <select
                        onChange={this.onChangeTheme}
                        onBlur={this.props.handleBlur}
                        name="category_id"
                        className={`QuestionForm-box-type-select ${this.state.validClassTheme}`}>
                        <option value="">Elige un curso</option>
                        {
                            this.state.myCourses.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)  
                        }
                    </select>
                    <InputError error={this.props.errors.category_id} touched={this.props.touched.category_id}/>
                </div>
                <div className="QuestionForm-box-description">
                    <TextPhoto {...this.props}
                        label="DESCRIPCIÓN" 
                        nameArea="description" 
                        namePhoto="photo"
                        placeholder="Detalla más tu pregunta. Si deseas, agrega una foto sobre la misma." />
                    <InputError error={this.props.errors.description} touched={this.props.touched.description}/>
                </div>
                { Settings.enableCoins && 
                    <div className="QuestionForm-box-coins">
                        <BoldText>¿CUÁNTOS COINS DE RECOMPENSA DARÁS POR PREGUNTAR?</BoldText>
                        <input
                            type='number'
                            pattern="[0-9]*"
                            onChange={this.onChangeCoin}
                            onBlur={this.props.handleBlur}
                            onFocus={this.props.handleFocus}
                            name="coin"
                            placeholder={coinInputAttr.disabled ? "0" : "Tus compañeros suelen dar 10 coins de recompensa"}
                            className={`QuestionForm-box-coins-input ${inputClassCoin} ${this.state.validClassCoin}`}
                            value={coinInputAttr.disabled ? this.state.minCoins : this.state.valueCoin}
                            {...coinInputAttr}
                        />
                        <InputError error={this.props.errors.coin} touched={this.props.touched.coin}/>
                        { this.showInputInfo() }
                    </div>
                }
                
                { !this.props.isLoading && 
                    <button className="QuestionForm-button"
                            type="submit"
                            {...buttonAttr}>
                            <Icon name="send"/>
                            <span>Publicar pregunta</span>
                    </button>
                }

                { this.props.isLoading && 
                    <button className="QuestionForm-button" disabled={true}
                            type="button">
                            <Loader />
                    </button>
                }
            </form>
        );
    }

    private onChangeTitle(event: any) {
        this.props.handleChange(event);
        const validclass = this.getValidClass('QuestionForm-box-title-input', event.target.value);
        this.setState({validClassTittle: validclass});
        this.GAEvent();
    }

    private onChangeCoin(event: any) {
        this.props.handleChange(event);
        this.setState({minCoins: event.target.value, valueCoin: event.target.value});
        const validClass = this.getValidClass('QuestionForm-box-coins-input', event.target.value);
        this.setState({validClassCoin: validClass});
        this.GAEvent();
    }

    private onChangeTheme(event: any) {
        this.props.handleChange(event);
        const validClass = this.getValidClass('QuestionForm-box-type-select', event.target.value);
        this.setState({validClassTheme: validClass});
        this.GAEvent();
    }

    private GAEvent() {
        if (this.sendFieldEvent) {
            this.sendFieldEvent = false;
            ReactGA.event({
                action: 'Filled a field',
                category: 'Creating',
                label: 'Question'
            });
        }
    }

    private getValidClass (fatherClass: string, value: string): string {
        if (value !== "") {
            return `${fatherClass}-valid`;
        }
        return "";
    }

    private showInputInfo() {
        if (!this.props.errors.coin && this.state.minCoins < 10) {
            const message = <React.Fragment>
                    Las preguntas con <strong style={{ fontFamily: 'Raleway Bold, sans-serif' }}>menos de 10 coins</strong> suelen demorar más de
                    3 días en tener respuesta
                </React.Fragment>;
            return (<InputInfo icon="smile" text={message} touched={this.props.touched.coin} isZero={this.props.coins===0}/>);
        } else {
            return null;
        }
    }

    private getClassTitle(error: string, touched: boolean){
        if (this.props.errors.title && this.props.touched.title){
            return 'QuestionForm-box-coins-input-error';
        }else{
            return '';
        }
    }

    private getClassCoin(error: string, touched: boolean){
        if (this.props.errors.coin && this.props.touched.coin){
            return 'QuestionForm-box-coins-input-error';
        }

        if(!this.props.errors.coin && this.props.touched.coin && this.state.minCoins < 10) {
            return 'QuestionForm-box-coins-input-info';
        }

        return '';
    }
}

export default QuestionForm;
