const axios = require('axios');

let url = "http://localhost:3000/stu";
function getData() {
    axios.get(url)
        .then(res => {
            console.log(res.data);
        });
}
function postData() {
    axios.post(url, {
        "id": 1,
        "name": "Akhi",
        "branch": "CSIT"
    })
        .then(res => {
            console.log(res.data);
        });
}
function deleteData() {
    axios.delete(url+"/2")
        .then(res => {
            console.log(res.data);
        });
}
function updateData() {
    axios.patch(url+"/3", {
        "id": 3,
        "name": "Akhi",
        "branch": "CSIT"
    })
        .then(res => {
            console.log(res.data);
        });
}