
import * as React from 'react';
import { Heading1 } from '../../common/ConsoleText';
import Icon from '../../common/Icon/Icon';
import SideMenu from '../../common/SideMenu/SideMenu';
import './FilterQuestions.scss';

interface IState {
    isActive: boolean;
    isEditing: boolean;
    listTopics: any;
    sortStatus: any;
    title: string;
    topicStates: any;
}

class FilterQuestions extends React.Component<{}, IState> {
    private sortStates: any;
    private initNumFilters: any;
    constructor(props: any) {
        super(props);

        this.sortStates = {
            1: {name: 'La más nueva', id: 1},
            2: {name: 'La más antigua', id: 2}
        }

        this.state = {
            isActive: false,
            isEditing: false,
            listTopics: [],
            sortStatus: this.sortStates[1],
            title: 'Filtros',
            topicStates: []
        }
    }

    public componentDidMount() {
        const myCourses = window.localStorage.getItem("myCourses");
        const topicStates = window.localStorage.getItem("topicStates");
        const sortStatus = window.localStorage.getItem("sortStatus");

        if (myCourses && topicStates && sortStatus) {
            this.setState({
                listTopics: JSON.parse(myCourses),
                sortStatus: this.sortStates[sortStatus],
                topicStates: JSON.parse(topicStates)
            }, () => {
                this.initNumFilters = this.getNumFilters();
            })
        }
    }

    public componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.isActive === true && this.state.isActive === false) {
            this.reset(true);
        }
    } 

    public render() {
        return (
            <React.Fragment>
                <button className="FilterQuestions__button" onClick={this.toggleActive}>
                    <Icon name="filter" />
                    <span className="FilterQuestions__text">FILTRAR </span>
                    { this.getNumFilters() >  0 &&
                        <span className="FilterQuestions__number">{this.getNumFilters()}</span>
                    }
                </button>

                <button className="FilterQuestions__button FilterQuestions__button--disabled">
                    <Icon name="filter" />
                    <span className="FilterQuestions__text">FILTRAR </span>
                    { this.getNumFilters() >  0 &&
                        <span className="FilterQuestions__number">{this.getNumFilters()}</span>
                    }
                </button>

                <SideMenu requestCloseModal={this.closeModal} modalIsOpen={this.state.isActive}>
                    <div className="FilterQuestions__inner" onMouseOver={this.onHover}>
                        <div className="FilterQuestions__top">
                            <div className="FilterQuestions__header">
                                { this.state.isEditing && 
                                    <button className="FilterQuestions__back" onClick={this.back}>
                                        <Icon name="back" />
                                        <span>Filtros</span>
                                    </button>
                                }

                                <Heading1>{this.state.title}</Heading1>

                                <button className="FilterQuestions__done" onClick={this.done}>
                                    <Icon name="single-check" /> Listo
                                </button>
                            </div>

                            <div className="FilterQuestions__body">
                                { !this.state.isEditing && 
                                    <div className="FilterQuestions__filter" onClick={this.editSort}>
                                        <div className="FilterQuestions__filter__icon">
                                            <Icon name="order" />
                                        </div>
                                        <div className="FilterQuestions__filter__text">
                                            <span className="FilterQuestions__filter__title">ORDEN</span>
                                            <span className="FilterQuestions__filter__active">{this.state.sortStatus.name}</span>
                                        </div>
                                    </div>
                                }
                                { this.state.isEditing && this.state.title === "ORDEN" && 
                                    <ul className="FilterQuestions__list">
                                        {
                                            Object.keys(this.sortStates).map((key: any) => {
                                                return (
                                                    <li className="FilterQuestions__item" key={this.sortStates[key].id}>
                                                        <label>
                                                            <input checked={(this.sortStates[key].id === this.state.sortStatus.id) ? true : false } name="sort" value={this.sortStates[key].id} onChange={this.changeSort} type="radio"/> 
                                                            {this.sortStates[key].name}
                                                        </label>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                }

                                { !this.state.isEditing && 
                                    <div className="FilterQuestions__filter" onClick={this.editTopic}>
                                        <div className="FilterQuestions__filter__icon">
                                            <Icon name="edit" />
                                        </div>
                                        <div className="FilterQuestions__filter__text">
                                            <span className="FilterQuestions__filter__title">CURSO</span>
                                            { this.state.topicStates.length !== this.state.listTopics.length && 
                                                <span className="FilterQuestions__filter__active">
                                                    {
                                                        this.state.topicStates.map((item: any, key: any) => key === 0 ? this.getTopicName(item) : <React.Fragment><br />{this.getTopicName(item)}</React.Fragment>)   
                                                    }
                                                </span>
                                            }

                                            { this.state.topicStates.length === this.state.listTopics.length && 
                                                <span className="FilterQuestions__filter__active">
                                                    Todos
                                                </span>
                                            }
                                        </div>
                                    </div>
                                }

                                { this.state.isEditing && this.state.title === "CURSO" && 
                                    <React.Fragment>
                                        <div className="FilterQuestions__all">
                                            <button className={`FilterQuestions__filter__button ${this.state.topicStates.length === this.state.listTopics.length ? 'FilterQuestions__filter__button--active' : ''}`} onClick={this.resetTopics}>Todos</button>
                                        </div>
                                        <ul className="FilterQuestions__list">
                                            {
                                                this.state.listTopics.map((item: any) => {
                                                    return (
                                                        <li className="FilterQuestions__item" key={item.id}>
                                                            <button className={`FilterQuestions__filter__button ${this.isChecked(item.id) && this.state.topicStates.length !== this.state.listTopics.length ? 'FilterQuestions__filter__button--active' : ''}`} onClick={this.toogleTopic.bind(this, item.id)}>{item.name}</button>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                        
                        { !this.state.isEditing && this.state.title === "Filtros" && 
                            <div className="FilterQuestions__bottom">
                                { this.initNumFilters >  0 && 
                                    <button className="FilterQuestions__clean" onClick={this.clearAllFilters}>
                                        <Icon name="trash" /> Limpiar filtros
                                    </button>
                                }

                                { this.initNumFilters === 0 && 
                                    <button className="FilterQuestions__clean FilterQuestions__clean--disabled">
                                        <Icon name="trash" /> Limpiar filtros
                                    </button>
                                }
                            </div>
                        }
                    </div>
                </SideMenu>
            </React.Fragment>
        )
    }

    private clearAllFilters = () => {
        const topicStates: any = [];
        Object.keys(this.state.listTopics).forEach((key: any) => {
            topicStates.push(this.state.listTopics[key].id);
        });

        this.setState({
            sortStatus: this.sortStates[1],
            topicStates
        }, () => {
            this.done()
        })
    }

    private getNumFilters() {
        let counter: number = 0;

        counter+= this.state.topicStates.length !== this.state.listTopics.length ? 1 : 0;
        counter+= this.state.sortStatus.id !== 1 ? 1 : 0;
        return counter
    }

    private resetTopics = () => {
        const topicStates: any = [];
        Object.keys(this.state.listTopics).forEach((key: any) => {
            topicStates.push(this.state.listTopics[key].id);
        });

        this.setState({
            topicStates
        })
    }

    private toogleTopic = (id: any) => {
        const doToggle = () => {
            if (this.isChecked(id)) {
                this.setState((prevState: any) => {
                    const filteredArray = prevState.topicStates.filter((item: any) => {
                        return id !== item
                    });
    
                    return { topicStates: filteredArray }
                }, () => {
                    if (this.state.topicStates.length === 0) {
                        this.resetTopics();
                    }
                })
            } else {
                this.setState((prevState: any) => ({
                    topicStates: [...prevState.topicStates, id]
                }), () => {
                    if (this.state.listTopics.length === this.state.topicStates.length) {
                        this.resetTopics();
                    }
                })
            }
        };

        if (this.state.listTopics.length === this.state.topicStates.length) {
            this.setState({
                topicStates: []
            }, () => {doToggle()})
        } else {
            doToggle();
        }

         
    }

    private getTopicName(id: any) {
        const isInArray =  this.state.listTopics.filter((item: any) => {
            return id === item.id
        });
        return isInArray[0].name;
    }

    private isChecked(id: any) {
        const isInArray =  this.state.topicStates.filter((item: any) => {
            return id === item
        });

        return isInArray.length;
    }

    private done = () => {
        window.localStorage.setItem("sortStatus", this.state.sortStatus.id);
        window.localStorage.setItem("topicStates", JSON.stringify(this.state.topicStates));
        window.localStorage.removeItem("explorer_0");
        window.localStorage.removeItem("explorer_1");
        window.localStorage.removeItem("explorer_2");
        window.location.reload();
    }

    private changeSort = (e: any) => {
        this.setState({
            sortStatus: this.sortStates[e.target.value]
        })
    }

    private reset(includeFilters: boolean) {
        const topicStates = window.localStorage.getItem("topicStates");
        const sortStatus = window.localStorage.getItem("sortStatus");
        
        if (includeFilters) {
            this.setState({
                isEditing: false,
                sortStatus: (sortStatus) ?  this.sortStates[sortStatus] : this.sortStates[1],
                title: 'Filtros',
                topicStates: (topicStates) ? JSON.parse(topicStates) :  []
            })
        } else {
            this.setState({
                isEditing: false,
                title: 'Filtros'
            })
        }
    }

    private back = () => {
        this.reset(false)
    }

    private editTopic = () => {
        this.setState({
            isEditing: true,
            title: 'CURSO'
        });
    }

    private editSort = () => {
        this.setState({
            isEditing: true,
            title: 'ORDEN'
        });
    }

    private toggleActive = () => {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }));
    }

    private closeModal = () => {
        this.setState({
            isActive: false
        });
    }

    private onHover = () => {
        if (!(window as any).isOnline) {
            this.closeModal();
        }
    }
}

export default FilterQuestions;
