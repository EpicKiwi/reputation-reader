import * as React from 'react'
import ReputationSourceStore from '../stores/ReputationSourceStore'
import Frame from 'react-frame-component'
import InfoDisplayer from './InfoDisplayer'

import css from '../../css/reputationSource.css'

class ReputationSource extends React.Component {

    constructor() {
        super()

        this.state = {
            source: null
        }

        this.onValidateSource = this.onValidateSource.bind(this)
    }

    componentDidMount() {
        if(!this.props.id)
            return

        this.getSource()

        ReputationSourceStore.getActionObservable("updateSource")
            .subscribe((e) => {
                if(e.source.id == this.state.source.id) {
                    this.getSource()
                }
            })
    }

    getSource(){
        let source = ReputationSourceStore.getSource(this.props.id)

        this.setState({
            source
        })
    }

    componentWillUnmount() {
    }

    onValidateSource(e){
        ReputationSourceStore.commit("updateSource",{
            id: this.state.source.id,
            state: "VALIDATED"
        })
    }

    get sourceState(){
        return this.state.source ? this.state.source.state : ''
    }

    get sourceType(){
        return this.state.source ? this.state.source.type : ''
    }

    get sourceUrl(){
        return this.state.source ? this.state.source.url : ''
    }

    get sourceHtml(){
        return this.state.source ? this.state.source.html : ''
    }

    render() {

        let icon = <i className="mdi mdi-web"></i>
        let content = ''

        if(this.state.source != null) {
            switch (this.sourceState) {
                case "PENDING":
                    icon = <i className="mdi mdi-progress-download"></i>
                    break;
                case "VALIDATED":
                case "EXTRACTING":
                    icon = <i className="mdi mdi-magnify"></i>
                    break;
                case "CLEAR":
                    icon = <i className="mdi mdi-check"></i>
                    break;
                case "SENDED":
                    icon = <i className="mdi mdi-check-all"></i>
                    break;
            }

            switch (this.state.source.state) {
                case "PENDING":
                    content = ''
                    break;
                case "WAITING_VALIDATION":
                    content = <div className="content-validation">
                                <Frame
                                    initialContent={this.sourceHtml}
                                    className="source-html"></Frame>
                                <button
                                    className="validate-source validate-button"
                                    onClick={this.onValidateSource}>
                                    Yes, it's my profile
                                </button>
                            </div>
                    break;
                case "CLEAR":
                case "SENDED":
                    let infos = Object.keys(this.state.source.infos).map((key) => {
                        let info = this.state.source.infos[key]
                        return <InfoDisplayer name={info.name} value={info.value} key={key}/>
                    })
                    content= <div className="infos">{infos}</div>
                    break;
            }
        }

        return <div className={'reputation-source'+(this.sourceState == "SENDED" ? ' sended' : '')}>
            <div className="icon">
                {icon}
            </div>
            <div className="content">
                <h3 className="source-name">{this.sourceType} profile</h3>
                <div className="source-url">{this.sourceUrl}</div>
                <div className="source-content">
                    {content}
                </div>
            </div>
        </div>
    }

}

export default ReputationSource