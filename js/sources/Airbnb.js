import SourceType from './SourceType'

class Airbnb extends SourceType {

    constructor(){
        super()
        this.name = "Airbnb"
        this.urlReg = /(https?:\/\/)?(www\.)?(airbnb\.com\.?)[^./]{2,5}?\/.+/
        this.extractors = {

            username: {name: "Name",
                selector:'h1', extractor(el){
                    return el.innerHTML.replace(/Hey, I’m ([^!]+)!/,"$1").trim()
                }},

            register: {name: "Register date",
                selector:'.text-normal', extractor(el){
                    return el.innerHTML.replace(/Joined in/i,"").trim()
                }},

            countrycode: {name: "Country",
                selector:'.space-top-2.h5 > .link-reset', extractor(el){
                    return el.innerHTML
            }},

            reviews: {name: "Reviews",
                selector:'._186vx4j ._e296pg', extractor(el){
                    return  el ? parseInt(el.innerHTML) : null
                }},

            verified: {name: "Verified",
                selector:'ul[title="Verified info"]', extractor(el){
                    return [].slice.call(el.children)
                        .map((el) => el.querySelector(".col-12.col-middle").innerHTML.trim())
                }}
        }
    }

}

export default new Airbnb()