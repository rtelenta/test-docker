import * as React from 'react';
import './Icon.scss'
import './icons.svg'

interface IPropsIcon {
    name: string;
    style?: React.CSSProperties;
}

const Icon: React.StatelessComponent<IPropsIcon> = (props) => {
    return (
        <svg className={`icon icon-${props.name}`} style={{...props.style}}>
            <use xlinkHref={`#icons_${props.name}`}/>
        </svg>
    );
};

export default Icon