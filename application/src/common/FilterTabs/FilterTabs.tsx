import * as React from 'react';
import './FilterTabs.scss';

interface IPropsFilterTabs {
    handleClick: any;
    initTab?: any;
}

class FilterTabs extends React.Component<IPropsFilterTabs, {}> {
    private tabStatus: any;
    constructor(props: IPropsFilterTabs) {
        super(props);
        this.clickTab = this.clickTab.bind(this);

        this.tabStatus = {
            'abiertas': 1,
            'cerradas': 2,
            'todas': 0
        }
    }

    public render() {
        return (
            <ul className="Tabs">
                <li id="tab-1" data-status={this.tabStatus.todas} className={'Tabs-item '+ this.getActiveClass(this.tabStatus.todas)} onClick={this.clickTab}>TODAS</li>
                <li id="tab-2" data-status={this.tabStatus.abiertas} className={'Tabs-item '+ this.getActiveClass(this.tabStatus.abiertas)} onClick={this.clickTab}>ABIERTAS</li>
                <li id="tab-3" data-status={this.tabStatus.cerradas} className={'Tabs-item '+ this.getActiveClass(this.tabStatus.cerradas)} onClick={this.clickTab}>CERRADAS</li>
            </ul>
        );
    }

    private isActive = (status: number) => {
        if (this.props.hasOwnProperty('initTab')) {
            return this.props.initTab === status;
        } else {
            return this.tabStatus.todas;
        }
    }

    private getActiveClass(status: number) {
        return this.isActive(status) ? 'Tabs-item-active' : ''; 
    }

    private clickTab(event: any) {
        event.target.classList.add("Tabs-item-active");
        const tabs = document.getElementsByClassName("Tabs-item");
        Array.from(tabs).forEach((tab: any, key: number) => {
            if (tab !== event.target && tab.classList.contains("Tabs-item-active")) {
                tab.classList.remove("Tabs-item-active");
            }
        });
        this.props.handleClick(event);
    }
}

export default FilterTabs;