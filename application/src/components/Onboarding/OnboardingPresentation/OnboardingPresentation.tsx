import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import OnboardingFirst from '../OnboardingFirst/OnboardingFirst';
import OnboardingSecond from '../OnboardingSecond/OnboardingSecond';
import './OnboardingPresentation.scss'

interface IState {
    index: number;
}

class OnboardingPresentation extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            index: 0
        };
    }

    public render() {
        const { index } = this.state;

        return (
            <SwipeableViews enableMouseEvents={true} index={index} className="OnboardingPresentation">
                <OnboardingFirst change={this.changeIndex} />
                <OnboardingSecond change={this.changeIndex} />
            </SwipeableViews>
        );
    }

    private changeIndex = (n: number) => {
        this.setState({
            index: n
        });
    }
}

export default OnboardingPresentation;