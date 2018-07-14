import * as React from 'react'
import ReputationSourceStore from "../stores/ReputationSourceStore";
import * as utils from '../utils'

import css from '../../css/finalStep.css'

class FinalStep extends React.Component {

    constructor() {
        super()

        this.state = {
            completedSources: [],
            sendState: "WAITING"
        }

        this.sendResults = this.sendResults.bind(this)
    }

    componentDidMount() {
        ReputationSourceStore.getActionObservable("updateSource")
            .subscribe((ev) => this.refreshSources())
    }

    refreshSources(){
        let completedSources = ReputationSourceStore.state.sources.filter((el) => el.state == "CLEAR")
        this.setState({
            completedSources
        })
    }

    componentWillUnmount() {
    }

    get completed(){
        return this.state.completedSources.length
    }

    async sendResults(){
        this.setState({
            sendState: "SENDING"
        })
        let data = {
            sources: this.state.completedSources.map((el) => {
                return {
                    id: el.id,
                    url: el.url,
                    type: el.type,
                    infos: el.infos
                }
            })
        }
        try {
            await utils.delay(500)
            console.log("Sending informations")
            console.log(data)
            await utils.postJson("https://reputationaire.com/imaginary", data)
        } catch(err) {
            this.setState({
                sendState: "CLEAR",
                error:err
            })
            return
        }
        this.setState({
            sendState: "CLEAR"
        })
    }

    render() {
        if(this.state.sendState == "WAITING") {
            if (this.completed > 0) {
                return <div className="final-step">
                    <p className="description">It's all good ! You have {this.completed} completed
                        profile{this.completed > 1 ? 's' : ''}. If you are ready...</p>
                    <button className="validate-button" onClick={this.sendResults}>Send your reputation</button>
                </div>
            } else {
                return <div className="final-step hidden"></div>
            }
        } else if(this.state.sendState == "SENDING"){
            return <div className="final-step">
                <p className="description">Sending your reputation...</p>
            </div>
        } else if(this.state.sendState == "CLEAR") {
            return <div className="final-step extended">
                <h3 className="great-title">Congratulations !</h3>
                <p className="description">Your reputation was sended to our servers</p>
            </div>
        } else if(this.state.sendState == "ERROR") {
            return <div className="final-step">
                <p className="description">Sorry, an error occured...</p>
                <button className="validate-button" onClick={this.sendResults}>Retry</button>
            </div>
        }
    }

}

export default FinalStep