import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Icon from '../../common/Icon/Icon';
import {Heading1} from '../ConsoleText';
import '../LinkButton/LinkButton.scss';
import './Slider.scss'

interface IState {
    index: number;
}

interface IProps {
    list: any;
}

class Slider extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            index: 0
        };
    }

    public render() {
        const { index } = this.state;

        return (
            <div className="Slider">
                <SwipeableViews animateTransitions={true} index={index} onChangeIndex={this.handleChangeIndex} enableMouseEvents={true}>
                    {
                        this.props.list.map((item: any, i: any) => {
                            return (
                                <div key={i}>
                                    <Heading1 className="ReactModal__description ReactModal__description--slider"> {item.title} </Heading1>
                                </div>
                            );
                        })
                    }
                </SwipeableViews>
                <div className="LinkButton">
                    <a className="LinkButton-link" href={this.props.list[this.state.index].link}>Ver Respuesta</a>
                </div>
                { this.state.index > 0 &&
                    <button onClick={this.prev} className="Slider__button Slider__prev"><Icon name="arrow-left" /></button>
                }

                { this.state.index < this.props.list.length-1 && 
                    <button onClick={this.next} className="Slider__button Slider__next"><Icon name="arrow-right" /></button>
                }
            </div>
        );
    }

    private handleChangeIndex = (index: number) => {
        this.setState({
          index,
        });
    };

    private next = () => {
        this.setState(prevState => ({
            index: prevState.index + 1
        }))
    }

    private prev = () => {
        this.setState(prevState => ({
            index: prevState.index - 1
        }))
    }
}

export default Slider;