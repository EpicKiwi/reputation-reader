import Store from './Store'
import SourceManager from '../sources/SourceManager'

class ReputationSourceStore extends Store {

    constructor(){
        super()
        this.state = {
            sources: []
        }
    }

    getSource(id){
        return this.state.sources.find((el) => el.id == id)
    }

    addSourceAction({url},payload){
        let source = {
            id: this.generateId(),
            url,
            state: "PENDING",
            infos: {},
            html: '',
            type: SourceManager.getSourceType(url)
        }
        this.state.sources.push(source)
        payload.source = source
    }

    updateSourceAction({id,state,html,error,infos},payload){
        let source = this.getSource(id)
        if(!source)
            return

        if(state)
            source.state = state
        if(error)
            source.error = error
        if(infos)
            source.infos = infos
        if(html)
            source.html = html

        payload.source = source
    }

}

export default (new ReputationSourceStore())