import SourceType from './SourceType'

class StackOverflow extends SourceType {

    constructor(){
        super()
        this.name = "StackOverflow"
        this.urlReg = /(https?:\/\/)?(www\.)?(stackoverflow\.com\.?)\/.+/
        this.extractors = {
            reputation: {
                name: "Reputation", selector: '.reputation', extractor(el) {
                    return parseInt(el.innerHTML.replace(/<span[^>]+>[^<]*<\/span>/ig,"").trim())
                }
            },
            silver: {
                name: "Silver badges", selector: '.badge2-alternate .-total', extractor(el) {
                    return parseInt(el.innerHTML)
                }
            },
            bronze: {
                name: "Bronze badges", selector: '.badge3-alternate .-total', extractor(el) {
                    return parseInt(el.innerHTML)
                }
            }
        }
        this.disableJavascript = true
    }

}

export default new StackOverflow()