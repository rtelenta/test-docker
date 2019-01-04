import * as React from 'react';
import UserService from '../../services/User.service';
import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader'; 
import './Avatar.scss';

interface IState {
    uploading: boolean;
}

interface IPropsAvatar {
    author?: string;
    image: string;
    small: boolean;
    canEdit?: boolean;
    imageUrl?: string;
    onUpload?: any;
    course?: any;
}

class Avatar extends React.Component<IPropsAvatar, IState> {
    private userService: UserService;

    constructor(props: IPropsAvatar) {
        super(props);

        this.userService = new UserService;

        this.state = {
            uploading: false            
        }
    }

    public render() {
        return (
            <div className={`Avatar ${this.props.small ? "small" : ""}`}>
                <div className="Avatar-picture">
                    {(!this.state.uploading) ? this.getAvatar() : ''}
                    
                    { this.props.canEdit && this.state.uploading && 
                        <Loader />
                    }
                    { this.props.canEdit &&
                        <React.Fragment>
                            <button className="Avatar-upload">
                                <Icon name="photo" />
                                <input type="file" onChange={this.uploadImage} />
                            </button>

                            <button className="Avatar-upload Avatar-upload--disabled">
                                <Icon name="photo" />
                            </button>
                        </React.Fragment>
                    }
                </div>
                { this.props.hasOwnProperty("author") &&
                    <div className="Avatar-author">
                        <div className="Avatar-name">{this.props.author}</div>
                        { this.props.course && 
                            <div className="Avatar-topic">{this.props.course}</div>
                        }
                    </div>
                }
            </div>
        );
    }

    private getAvatar() {
        if (this.props.hasOwnProperty('imageUrl')) {
            if (this.props.imageUrl !== '') {
                return <img src={this.props.imageUrl} />
            } else {
                return this.props.image;
            }
        } else {
            return this.props.image;
        }
    }

    private uploadImage = (e: any) => {
        const data = new FormData();
        data.append('image', e.target.files[0]);
        this.setState({
            uploading: true
        });

        this.userService.uploadImage(data)
            .then((response: any) => {
                return this.userService.saveImage(response.data.name);
            }).then((response: any) => {
                this.setState({
                    uploading: false
                });

                this.props.onUpload(response.data.url_image);
            });
    }
}

export default Avatar;