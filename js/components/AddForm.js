import * as React from 'react'

import css from '../../css/addForm.css'

class AddForm extends React.Component {

    constructor() {
        super()

        this.state = {
            fieldValue: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onFieldChange = this.onFieldChange.bind(this)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onSubmit(e){
        e.preventDefault()
        console.log(this.state.fieldValue)
    }

    onFieldChange(e){
        this.setState({
            fieldValue: e.target.value
        })
    }

    render() {
        return <form className="add-form" onSubmit={this.onSubmit}>
            <input
                value={this.state.value}
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