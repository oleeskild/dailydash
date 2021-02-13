export let retrieveToken = (callback) => {
    let formData = new URLSearchParams();
    formData.append('grant_type', "client_credentials");
    formData.append('client_id', localStorage.getItem("client_id_sr"));
    formData.append('client_secret', localStorage.getItem("client_secret_sr"));

    fetch('https://developer-api.sparebank1.no/oauth/token', {
        body: formData,
        method: 'POST',
        mode: 'no-cors',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache'
        })
    })
    .then(res=>res.json())
    .then(res=> {
        localStorage.setItem("access_token_sr", json.access_token);
        callback(res);
    });

};

export let getSrToken = () => {
    return localStorage.getItem("access_token_sr");
}

export let getTransactions = () => {

}