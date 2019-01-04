import * as React from 'react';
import Layout from '../../common/Layout/Layout';
import {IMatchParam} from '../../interfaces/IMatchParam';
import MainMenu from '../MainMenu/MainMenu';
import MyQuestionsPresentation from './components/MyQuestionsPresentation/MyQuestionsPresentation';

interface Iprops {
    match: IMatchParam;
}

class MyQuestions extends React.Component<Iprops, {}> {

    public componentDidMount() {
        window.scrollTo(0, 0);
    }

    public render() {
        const { match: { params } } = this.props;

        return (
            <Layout>
                <MainMenu />
                <MyQuestionsPresentation selectedTab={params} />
            </Layout>
        );
    } 
}

export default MyQuestions;