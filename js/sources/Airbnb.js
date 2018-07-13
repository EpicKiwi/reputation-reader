import SourceType from './SourceType'

class Airbnb extends SourceType {

    constructor(){
        super()
        this.name = "Airbnb"
        this.urlReg = /(https?:\/\/)?(www\.)?(airbnb\.com\.?)[^./]{2,5}?\/.+/
        this.extractors = {
            reviews: {name: "Reviews", selector:'._186vx4j ._e296pg', extractor(el){
                    return parseInt(el.innerHTML)
                }},
            verified: {name: "Verified", selector:'ul[title="Verified info"]', extractor(el){
                    return [].slice.call(el.children)
                        .map((el) => el.querySelector(".col-12.col-middle").innerHTML.trim())
                }}
        }
    }

}

export default new Airbnb()