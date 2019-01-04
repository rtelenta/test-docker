import * as moment from 'moment';
import "moment/locale/es";
import * as React from 'react';
import Icon from '../Icon/Icon';
import './CreatedAt.scss';

interface IPropsCreatedAt {
    createdAt: any;
    type: number;
}

interface IState {
    createdText: any;
}

class CreatedAt extends React.Component<IPropsCreatedAt, IState> {
    private dateType: any;
    private createdAt: any;
    private storage: any;

    constructor(props: IPropsCreatedAt) {
        super(props);

        this.dateType = {
            answer: 1,
            question: 0
        }

        this.state = {
            createdText: ''
        };

        this.storage = window.localStorage;
    }

    public componentDidMount() {
        this.updateDate();
    }

    public componentDidUpdate() {
        this.updateDate();
    }

    public render() {
        return (
            <div className="CreatedAt">
                {(() => {
                    switch (this.props.type) {
                        case this.dateType.question: return (<Icon name="question-timer" />);                  
                        case this.dateType.answer: return (<Icon name="answer-timer" />);                  
                        default: return null;
                    }
                })()}
                
                <p>{this.state.createdText}</p>
            </div>
        );
    }

    private updateDate = () => {
        if (this.state.createdText === '') {
            if (this.props.createdAt.hasOwnProperty('question_date') || this.props.createdAt.hasOwnProperty('date_now')) {
                this.createdAt = this.createFormat({
                    date: this.props.createdAt.date,
                    diff: this.props.createdAt.hasOwnProperty('date_now') ? this.props.createdAt.date_now : this.props.createdAt.question_date,
                    type: this.props.type,
                    userID: this.props.createdAt.user_id
                });

                this.setState({createdText: this.createdAt});
            }
        }
    }

    private createFormat(data: any) {
        moment.locale('es');
        const idUser = this.storage.getItem("idUser");
        const dateMoment = moment(data.date, "YYYY-MM-DD hh:mm:ss");
        const dateDiffMoment = moment(data.diff, "YYYY-MM-DD hh:mm:ss");
        let response;
        let textBefore;
        let textAfter;
        
        if (data.type === this.dateType.question) {
            textBefore = idUser === data.userID ? 'Preguntaste ' : 'Preguntó ';
            response = textBefore + dateMoment.from(dateDiffMoment);
        } else if (data.type === this.dateType.answer) {
            textBefore = idUser === data.userID ? 'Respondiste ' : 'Respondió ';
            textAfter = ' después';
            response = textBefore + dateMoment.to(dateDiffMoment, true) + textAfter;
        }

        return response;
    }
}

export default CreatedAt;