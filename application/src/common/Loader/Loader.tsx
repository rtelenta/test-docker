import * as React from 'react';
import './Loader.scss';

interface IPropsLoader {
    top?: number;
    height?: number;
}

class Loader extends React.Component<IPropsLoader, {}> {
    public render() {
        return (
            <div className="Loader">
                <div className="Loader Loader-child" />
                <div className="Loader Loader-child" />
                <div className="Loader Loader-child" />
                <div className="Loader Loader-child" />
                <div className="Loader Loader-child" />
                <div className="Loader Loader-child" />
                <div className="Loader Loader-child" />
                <div className="Loader Loader-child" />
                <div className="Loader Loader-child" />
                <div className="Loader Loader-child" />
                <div className="Loader Loader-child" />
                <div className="Loader Loader-child" />
            </div>
        );
    }
}

export default Loader;
