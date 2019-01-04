
import * as React from 'react';
import coin from '../../assets/images/coin.png';
import Settings from '../../settings';
import './Point.scss';


class Point extends React.Component<{style?: React.CSSProperties, coins: number | string}, {}> {
    public render() {
        if (Settings.enableCoins) {
            return (
                <div className={`Point`} style={this.props.style}>
                    <div className="Point-inner">
                        {this.props.children}
                        <div className="Point-number"> {this.props.coins}</div>
                        <img className="Point-icon" src={coin} height='18'/>
                    </div>
                </div>
            );
        } else {
            return false
        }
    }
}

export default Point;
