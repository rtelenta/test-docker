import * as React from 'react';
import Loader from "../../common/Loader/Loader";

class Logout extends React.Component <{}, {}> {
    constructor(props: any) {
        super(props);
        window.location.assign('/');
    }

    public render() {
        return (
            <Loader top={200} height={200}/>
        );
    }
}

export default Logout;
