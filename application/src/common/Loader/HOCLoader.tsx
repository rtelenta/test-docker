import * as React from 'react';
import Loader from './Loader';

interface IPropsHOCLoader {
    loading: boolean;
    loadingHeight: number;
    loadingTop: number;
}

const HOCLoader = <P extends object>(Component: React.ComponentType<P>) =>
    class WithLoading extends React.Component<P & IPropsHOCLoader> {
        public render() {
            const { loading, loadingHeight, loadingTop, ...props } = this.props as IPropsHOCLoader;
            return loading ? <Loader top={loadingTop} height={loadingHeight} /> : <Component {...props} />;
        }
    };

export default HOCLoader;