import SourceType from './SourceType'

class Ebay extends SourceType {

    constructor(){
        super()
        this.name = "Ebay"
        this.urlReg = /(https?:\/\/)?(www\.)?(ebay\.com\.?)[^./]{2,5}?\/.+/
        this.extractors = {
            score: {name: "Feedback score", selector:'.usrinfo .mbg-l a:nth-child(2)', extractor(el){
                    return parseInt(el.innerHTML.replace(/<span[^>]+>[^<]+<\/span>/,""))
                }},
            positive: {name: "Positive score", selector:'.scores a:nth-of-type(1) .score .num', extractor(el){
                    return parseInt(el.innerHTML)
                }},
            neutral: {name: "Neutral score", selector:'.scores a:nth-of-type(2) .score .num', extractor(el){
                    return parseInt(el.innerHTML)
                }},
            negative: {name: "Negative score", selector:'.scores a:nth-of-type(3) .score .num', extractor(el){
                    return parseInt(el.innerHTML)
                }}
        }
    }

}

export default new Ebay()