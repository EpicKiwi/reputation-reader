import * as React from 'react'

import css from '../../css/reputationSource.css'

class ReputationSource extends React.Component {

    constructor() {
        super()

        this.state = {
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return <div className="reputation-source">
            <div className="icon">
                <i className="mdi mdi-web"></i>
            </div>
            <div className="content">
                <h3 className="source-name">Airbnb profile</h3>
                <div className="source-url">https://www.airbnb.com.au/users/show/99824610</div>
            </div>
        </div>
    }

}

export default ReputationSource