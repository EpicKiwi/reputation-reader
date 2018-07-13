import ReputationSourceStore from '../stores/ReputationSourceStore'
import Airbnb from './Airbnb'
import Ebay from './Ebay'
import StackOverflow from './StackOverflow'
import {fetchJson} from '../utils'

class SourceManager {

    constructor(){
        this.types = {
            Airbnb,
            Ebay,
            StackOverflow
        }

    }

    init(){
        ReputationSourceStore.getActionObservable("addSource")
            .subscribe((el) => this.queryHtml(el.source.id))
        ReputationSourceStore.getActionObservable("updateSource")
            .subscribe((e) => {
                switch(e.source.state){
                    case "VALIDATED":
                        this.extractInfos(e.source.id)
                        break;
                }
            })
    }

    async queryHtml(sourceId){
        let source = ReputationSourceStore.getSource(sourceId)
        if(!source)
            return
        let sourceType = this.types[source.type]
        let data = await fetchJson(`https://allorigins.me/get?url=${source.url}`)
        if(sourceType.disableJavascript){
            data.contents = data.contents.replace(/<script[^>]+>[^<]*<\/script>/ig,"")
        }
        ReputationSourceStore.commit("updateSource",{id:source.id,state:'WAITING_VALIDATION',html:data.contents})
    }

    extractInfos(sourceId){
        let source = ReputationSourceStore.getSource(sourceId)
        if(!source)
            return
        ReputationSourceStore.commit("updateSource",{id:source.id,state:"EXTRACTING"})

        let parser = new DOMParser()
        let parsedHtml = parser.parseFromString(source.html,"text/html")
        let sourceType = this.types[source.type]
        let infos = {}

        Object.keys(sourceType.extractors).forEach((key) => {
            let extractor = sourceType.extractors[key]
            let element = parsedHtml.querySelector(extractor.selector)
            let info = extractor.extractor(element)
            if(info !== null || info !== undefined) {
                infos[key] = {
                    name: extractor.name,
                    value: info
                }
            }
        })

        ReputationSourceStore.commit("updateSource",{id:source.id,state:"CLEAR",infos})
    }

    getSourceType(url){
        let type = Object.keys(this.types).find((key) => !!url.match(this.types[key].urlReg))
        return type || 'Unknown'
    }
}

export default new SourceManager()