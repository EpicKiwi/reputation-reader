class SourceType {

    constructor(){
        this.name = "Unknown"
        this.urlReg = /.+/
        this.extractors = {}
        this.disableJavascript = false
    }

}

export default SourceType