export let retrieveTokenFromUrl = () => {
    let url = window.location.href;
    //getting the access token from url
    var access_token = url
        .split("#")[1]
        .split("=")[1]
        .split("&")[0];
    // get the userid
    var userId = url
        .split("#")[1]
        .split("=")[2]
        .split("&")[0];
    console.log(access_token);
    console.log(userId);

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("userId", userId);
};

export let getToken = () => {
    return localStorage.getItem("access_token");
}

export let getSleepData = async () => {
    const myHeaders = new Headers({
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`
    });
    let today = new Date();
    let dateString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

    try{
        let response = await fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${dateString}.json`, {
            headers: myHeaders,
            method: "GET"
        });
        let json = await response.json();
        return json;
    }catch{
        localStorage.removeItem("access_token");
        localStorage.removeItem("userId"); 
    }
}
