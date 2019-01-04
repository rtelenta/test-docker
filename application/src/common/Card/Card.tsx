import * as React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import {BoldText} from '../ConsoleText';
import CreatedAt from '../CreatedAt/CreatedAt';
import Point from '../Point/Point';
import './Card.scss';

interface IPropsCard {
    avatar: boolean;
    coinText: string;
    link: boolean;
    question: any;
    to?: string;
}

class Card extends React.Component<IPropsCard, {}> {

    constructor(props: IPropsCard) {
        super(props);
        this.less = this.less.bind(this);
        this.more = this.more.bind(this);
    }

    public render () {
        const closed = this.props.question.status === 2 ? 'Card-closed' : '';
        return (
            <div className={`Card ${closed}`}>
                {(() => {
                    if (this.props.question.status === 1) {
                        switch (this.props.question.coin) {
                            case 0:
                                return null;                               
                            default:
                                return (
                                    <div className="Card-coins">
                                        <Point coins={new Intl.NumberFormat('es-PE').format(this.props.question.coin)}><BoldText>{this.props.coinText}</BoldText></Point>
                                    </div>
                                );
                        }
                    } else {
                        return null;
                    }
                })()}
                <div className="Card-content">
                    {(() => {
                        if (this.props.avatar) {
                            return (
                                <Avatar author={this.props.question.author} image={this.props.question.image} course={this.props.question.course}  imageUrl={this.props.question.image_url} small={false} />
                            );
                        }
                        return null;
                    })()}
                    <CreatedAt type={0} createdAt={this.props.question} />
                    {(() => {
                        if (this.props.link) {
                            return (
                                <Link to={this.props.to ? this.props.to : ""} className="Card-question">
                                    {this.props.question.title}
                                </Link>
                            );
                        } else {
                            return (
                                <div className="Card-question">
                                    {this.props.question.title}
                                </div>
                            );
                        }
                    })()}
                    {(() => {
                        if (this.props.question.description === "") {
                            return null;
                        }
                        return (
                            <div className="Card-description">
                                <a onClick={this.more} id={`card-more-${this.props.question.id}`}>ver más</a>
                                <p className="Card-description-collapsed" id={`card-description-${this.props.question.id}`}>{this.props.question.description}</p>
                                <a className="hidden" onClick={this.less} id={`card-less-${this.props.question.id}`}>ver menos</a>
                            </div>
                        );
                    })()}
                    {(() => {
                        if (this.props.question.image_small === "") {
                            return null;
                        }

                        return (
                            <div className="Card-image">
                                <img src={this.props.question.image_small} alt={this.props.question.image_small}/>
                            </div>);
                    })()}
                </div>
            </div>
        );
    }

    public less() {
        const element = document.getElementById(`card-description-${this.props.question.id}`);
        if (element !== null) {
            element.classList.add("Card-description-collapsed");
        }
        const less = document.getElementById(`card-less-${this.props.question.id}`);
            const more = document.getElementById(`card-more-${this.props.question.id}`);
            if (less !== null) {
                less.classList.add("hidden");
            }
            if (more !== null) {
                more.classList.remove("hidden");
            }
    }

    public more() {
        const element = document.getElementById(`card-description-${this.props.question.id}`);
        if (element !== null) {
            element.classList.remove("Card-description-collapsed");
            const less = document.getElementById(`card-less-${this.props.question.id}`);
            const more = document.getElementById(`card-more-${this.props.question.id}`);
            if (less !== null) {
                less.classList.remove("hidden");
            }
            if (more !== null) {
                more.classList.add("hidden");
            }
        }
    }
}

export default Card;