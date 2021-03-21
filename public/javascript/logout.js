const { response } = require("express");
const { json } = require("sequelize/types");


function logoutFormHandler () {
    fetch ('api/users/logout', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(() => {

       // if (response.ok) {
       //     document.location.replace('/');
        //    window.prompt('logged out.')
     //   } else {
        //    alert(response.statusText);
       // }
        document.location.replace('/');
        window.prompt('logged out.')
    })
}






document.querySelector('.logout-button').addEventListener('click', logoutFormHandler);