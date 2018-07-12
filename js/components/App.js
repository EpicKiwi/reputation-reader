import * as React from 'react'

import AddForm from './AddForm'
import ReputationSource from './ReputationSource'

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
            <section className="sources">
                <ReputationSource/>
                <ReputationSource/>
                <ReputationSource/>
            </section>
        </div>
    }

}

export default App