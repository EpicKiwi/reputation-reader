import * as React from 'react'

import AddForm from './AddForm'

class App extends React.Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return <div className="app">
            <header className="header">
                <div className="heading">
                    <h1>Reputation Reader</h1>
                    <div className="description">An experiment by Baptiste Saclier</div>
                </div>
                <nav className="toolbar">
                    <AddForm/>
                </nav>
            </header>
        </div>
    }

}

export default App