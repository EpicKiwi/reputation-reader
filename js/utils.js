export function fetchJson(path) { return new Promise((resolve, reject) => {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                let data = JSON.parse(httpRequest.responseText);
                return resolve(data)
            }
            return reject(new Error("Bad status code "+httpRequest.status))
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
})}