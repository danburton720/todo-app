import React from 'react';
import Loader from 'react-loader-spinner';

export default class SpinnerLoader extends React.Component {
    render() {
        return (
            <div>
                <Loader
                    type='Oval'
                    color='#0066ff'
                    height={50}
                    width={50}
                    timeout={100000}
                />
            </div>
        )
    }
}