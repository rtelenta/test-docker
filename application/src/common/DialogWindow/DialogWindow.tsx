import * as React from 'react';
import LinkButton from '../LinkButton/LinkButton';
import Loader from "../Loader/Loader";

import './DialogWindow.scss';

interface IProps {
    linkURL?: any;
    ImgIcon?: any;
    title?: any;
    loading?: boolean;
    linkText?: any;
    customButtonAction?: any;
}

class DialogWindow extends React.Component<IProps, {}> {
    public render () {
        return (
            <div className="DialogWindow">
                <div className="DialogWindow-inner">
                    { this.props.loading && 
                        <Loader top={200} height={200}/>
                    }

                    { this.props.hasOwnProperty('ImgIcon') && !this.props.loading &&
                        <div className="DialogWindow-img">
                            <img src={this.props.ImgIcon} width="276" />
                        </div>
                    }

                    {this.props.hasOwnProperty('children') && !this.props.loading &&
                        <div className="DialogWindow-text">
                            {this.props.children}
                        </div>
                    }

                    { this.props.hasOwnProperty('linkURL') && !this.props.loading &&
                        <LinkButton to={this.props.linkURL}>
                            {this.props.hasOwnProperty('linkText') ? this.props.linkText : "Listo"}
                        </LinkButton>
                    }

                    { this.props.hasOwnProperty('customButtonAction') && !this.props.loading &&
                        <div className="LinkButton">
                            <a className="LinkButton-link" href="#" onClick={this.customHandleClick}>
                                {this.props.hasOwnProperty('linkText') ? this.props.linkText : "Listo"}
                            </a>
                        </div>
                    }
                </div>
            </div>
        );
    }

    private customHandleClick = (e: any) => {
        this.props.customButtonAction();
        e.preventDefault();
    }
}

export default DialogWindow;