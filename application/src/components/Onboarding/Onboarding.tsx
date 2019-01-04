import * as React from 'react';
import Layout from '../../common/Layout/Layout';
import OnboardingPresentation from './OnboardingPresentation/OnboardingPresentation';

class Onboarding extends React.Component<{}, {}> {

    private storage: any;

    constructor(props: any) {
        super(props);
        this.storage = window.localStorage;
    }

    public render() {
        this.storage.setItem("onboarding", 1);
        return (
            <Layout disableNotifications={true}>
                <OnboardingPresentation />
            </Layout>
        );
    }
}

export default Onboarding;