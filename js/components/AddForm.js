import * as React from 'react'
import ReputationSourceStore from '../stores/ReputationSourceStore'
import SourceManager from '../sources/SourceManager'

import css from '../../css/addForm.css'

class AddForm extends React.Component {

    constructor() {
        super()

        this.state = {
            fieldValue: ''
        }

        this.urlReg = /(https?:\/\/)?([^./]+\.)+[^./]{2,5}\/.+/

        this.onSubmit = this.onSubmit.bind(this)
        this.onFieldChange = this.onFieldChange.bind(this)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onSubmit(e){
        e.preventDefault()
        if(!this.state.fieldValue.match(this.urlReg))
            return
        if(ReputationSourceStore.state.sources.find((el) => el.url == this.state.fieldValue))
            return
        if(SourceManager.getSourceType(this.state.fieldValue) == "Unknown")
            return
        ReputationSourceStore.commit("addSource",{url:this.state.fieldValue})
        this.setState({
            fieldValue: ''
        })
    }

    onFieldChange(e){
        this.setState({
            fieldValue: e.target.value
        })
    }

    render() {
        return <form className="add-form" onSubmit={this.onSubmit}>
            <input
                value={this.state.fieldValue}
                onChange={this.onFieldChange}
                type="text"
                placeholder="Paste a profile URL..."
                className="profile-url" />
            <button className="profile-submit">
                <i className="mdi mdi-arrow-right"></i>
            </button>
        </form>
    }

}

export default AddForm