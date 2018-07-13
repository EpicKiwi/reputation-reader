import * as React from 'react'

import AddForm from './AddForm'
import ReputationSource from './ReputationSource'
import ReputationSourceStore from '../stores/ReputationSourceStore'
import SourceManager from '../sources/SourceManager'

class App extends React.Component {

    constructor() {
        super()

        this.state = {
            sources: []
        }
    }

    componentDidMount() {
        SourceManager.init()
        ReputationSourceStore.getActionObservable("addSource").subscribe((ev) => {
            this.setState({
                sources: ReputationSourceStore.state.sources
            })
        })
    }

    componentWillUnmount() {
    }

    render() {

        let sourceElements = this.state.sources
            .map((source) => {
            return <ReputationSource id={source.id} key={source.id} />
        })

        return <div className="app">
            <header className="header">
                <div className="heading">
                    <h1>Reputation Reader</h1>
                    <div className="description">An experiment by EpicKiwi</div>
                </div>
                <nav className="toolbar">
                    <AddForm/>
                </nav>
            </header>
            <section className="sources">
                {sourceElements}
            </section>
        </div>
    }

}

export default App