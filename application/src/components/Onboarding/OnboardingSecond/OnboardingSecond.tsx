import * as React from 'react';
import onboarding_2 from '../../../assets/images/onboarding_2.png';
import { BoldText } from '../../../common/ConsoleText';
import LinkButton from '../../../common/LinkButton/LinkButton';
import './OnboardingSecond.scss';

interface IProps {
    change: any;
}

class OnboardingSecond extends React.Component<IProps, {}> {
    public render() {
        return (
            <div className="OnboardingSecond">
                <div className="OnboardingSecond-image">
                    <img src={onboarding_2} alt="Onboarding 2"/>
                </div>
                <div className="OnboardingSecond-content">
                    <BoldText className="OnboardingSecond-content-title">¡Ayuda a tus compañeros!</BoldText>
                    <p className="OnboardingSecond-content-description">
                        Si conoces la respuesta de alguna pregunta, ¡anímate y ayuda!
                    </p>
                </div>
                <div className="OnboardingSecond-slider">
                    <div onClick={this.props.change.bind(this, 0)} className="OnboardingSecond-slider-page" />
                    <div onClick={this.props.change.bind(this, 1)} className="OnboardingSecond-slider-page-active" />
                </div>
                <div className="OnboardingSecond-button">
                    <LinkButton to="/">Continuar</LinkButton>
                </div>
            </div>
        );
    }
}

export default OnboardingSecond;