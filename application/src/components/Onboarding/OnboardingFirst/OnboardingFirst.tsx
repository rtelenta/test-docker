import * as React from 'react';
import onboarding_1 from '../../../assets/images/onboarding_1.png';
import { BoldText } from '../../../common/ConsoleText';
import './OnboardingFirst.scss';

interface IProps {
    change: any;
}

class OnboardingFirst extends React.Component<IProps, {}> {
    public render() {
        return (
            <div className="OnboardingFirst">
                <div className="OnboardingFirst-image">
                    <img src={onboarding_1} alt="Onboarding 1"/>
                </div>
                <div className="OnboardingFirst-content">
                    <BoldText className="OnboardingFirst-content-title">¡Resuelve todas tus dudas!</BoldText>
                    <p className="OnboardingFirst-content-description">
                        ¿Te quedaste con alguna duda en clase?<br />
                        No tengas miedo y pregunta.
                    </p>
                </div>
                <div className="OnboardingFirst-slider">
                    <div onClick={this.props.change.bind(this, 0)} className="OnboardingFirst-slider-page-active" />
                    <div onClick={this.props.change.bind(this, 1)} className="OnboardingFirst-slider-page" />
                </div>
            </div>
        );
    }
}

export default OnboardingFirst;