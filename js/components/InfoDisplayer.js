import * as React from 'react'

import css from '../../css/infoDisplayer.css'

class InfoDisplayer extends React.Component {

    constructor() {
        super()

        this.state = {

        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    get value(){
        if(this.props.value instanceof Array){
            let content = this.props.value.map((el) => <li key={el} >{el}</li>)
            return <ul className="multi-info" >{content}</ul>
        } else {
            return this.props.value
        }
    }

    render() {
        return <div className="info-displayer">
            <span className="info-name">{this.props.name}</span>
            <span className="info-value">{this.value}</span>
        </div>
    }

}

export default InfoDisplayer