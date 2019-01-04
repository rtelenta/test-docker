import * as React from 'react';
import Icon from '../Icon/Icon';
import './CountAnswers.scss';

interface IPropsCountAnswer {
    count: number;
    answers_not_viewed?: any;
}

class CountAnswers extends React.Component<IPropsCountAnswer, {}> {
    constructor(props: IPropsCountAnswer) {
        super(props);
    }
    public render() {
        return (
            <div className="CountAnswers">
                <Icon name="message" />
                <p>{this.props.count} respuesta (s)</p>

                { this.canSeeNotViewed() && 
                    <div className="CountAnswers__not-viewed">
                        <Icon name="error" />
                        <div className="CountAnswers__num">
                            {this.props.answers_not_viewed}
                        </div>
                    </div>
                }
            </div>
        );
    }

    private canSeeNotViewed() {
        if (this.props.hasOwnProperty('answers_not_viewed')) {
            if (this.props.answers_not_viewed > 0) {
                return true;
            }
        }

        return false;
    }
}

export default CountAnswers;