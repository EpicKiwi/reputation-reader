import * as React from 'react'
import * as ReactDom from 'react-dom'

import resetCss from '../css/reset.css'
import globalCss from '../css/global.css'

import App from './components/App'

ReactDom.render(
    <App></App>,
    document.getElementById("root")
)
