import * as React from 'react';
import { BoldText, Heading1 } from '../ConsoleText';
import Point from '../Point/Point';
import './Header.scss';

interface IPropsHeader {
    coins?: number;
}

class Header extends React.Component<IPropsHeader, {}> {
    constructor(props: IPropsHeader) {
        super(props);
    }

    public render() {
        return (
            <div className="Header">
                <Heading1 className="Header-title">{this.props.children}</Heading1>
                {(() => {
                    if (this.props.coins) {
                        return (
                            <Point coins={new Intl.NumberFormat('es-PE').format(this.props.coins)}>
                                <BoldText>TIENES</BoldText>
                            </Point>
                        );
                    }
                    return null;
                })()}
            </div>
        );
    }
}

export default Header;