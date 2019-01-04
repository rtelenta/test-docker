import * as React from 'react';
import Layout from '../../common/Layout/Layout';
import { IMatchParam } from '../../interfaces/IMatchParam';
import MainMenu from '../MainMenu/MainMenu';
import ExplorerPresentation from './components/ExplorerPresentation/ExplorerPresentation';

interface Iprops {
    match: IMatchParam;
}

class Explorer extends React.Component<Iprops, {}> {

    public componentDidMount() {
        window.scrollTo(0, 0);
    }

    public render () {
        const { match: { params } } = this.props;

        return (
            <Layout>
                <MainMenu />
                <ExplorerPresentation selectedTab={params} />
            </Layout>);
    }
}

export default Explorer;