import SourceType from './SourceType'

class StackOverflow extends SourceType {

    constructor(){
        super()
        this.name = "StackOverflow"
        this.urlReg = /(https?:\/\/)?(www\.)?(stackoverflow\.com\.?)\/.+/
        this.extractors = {
            username: {
                name: "User name", selector: '.user-card-name', extractor(el) {
                    console.log(el.childNodes[0])
                    return el.childNodes[0].textContent.trim()
                }
            },
            position: {
                name: "User position", selector: '.current-position', extractor(el) {
                    return el.innerHTML.trim()
                }
            },
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