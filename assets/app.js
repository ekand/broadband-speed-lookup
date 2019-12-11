// debugger;

let debug_output_string;

//==============form submission code==================//

// sources:
// 1. https://jsfiddle.net/seamusleahy/rxeuaatw/
// 2. https://www.geeksforgeeks.org/form-validation-using-html-javascript/
let form = document.getElementById("contact")
try {
    // debugger;
    form.addEventListener('submit', e => {
        e.preventDefault();

        let Name = document.getElementById("Name");
        let Address = document.getElementById("Address");
        let Email = document.getElementById("Email");
        let Phone = document.getElementById("Phone");
        let Comment = document.getElementById("Comment");

        if (Name.value == "" || Address.value == "" || Email.value == "" || Phone.value == ""|| Comment.value == ""){
            document.getElementById("danger-alert").classList.remove("d-none");

        } else {
            const form = document.getElementById("contact");
            const method = form.getAttribute("method");
            const action = form.getAttribute("action");
            let formEl = document.getElementById('contact');
            let headers = new Headers();

            headers.set('Accept', 'application/json');

            var formData = new FormData();
            for (var i = 0; i < formEl.length; ++i) {
                formData.append(formEl[i].name, formEl[i].value);
            }
            formData.append('json', JSON.stringify({example: 'return value'}));
            let url = 'https://formspree.io/mkngezdj';
            let fetchOptions = {
                method: 'POST',
                headers,
                body: formData
            };

            let responsePromise = fetch(url, fetchOptions);
            responsePromise
                .then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        document.getElementById("success-alert").classList.remove("d-none");
                        document.getElementById("danger-alert").classList.add("d-none");
                    } else {
                        document.getElementById("warning-alert").classList.remove("d-none");
                        document.getElementById("success-alert").classList.add("d-none");
                    }
                });
        }
    });

} catch (e) {
    // debugger;
}




//============== code for displaying and retrieving internet speed data ===========//

let searchButton = document.getElementById("searchButton");
try {
    searchButton.addEventListener("click", ev => {
        let zipcode = document.getElementById("zipCodeEntry").value;
        if (zipcode === ""){
            document.getElementById("danger").classList.remove("d-none");
            document.getElementById("success").classList.add("d-none");}
        else {
            get_coordinates(zipcode);
        }
    });
} catch (e) {
}


function get_coordinates(zipcode) {
    debug_output_string = "\n you entered: " + zipcode;
    debugger;
    let public_key = "pk.eyJ1IjoiZXJpa2thbmRlcnNvbiIsImEiOiJjazMxdnNqcmMwZGgzM2JzNXF5ZnM3MHhlIn0.RhbHx-zoZopJ_Xwx9iDbog";
    let request_string = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + zipcode + ".json?access_token=" + public_key;
    debugger;
    fetch(request_string)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            debugger;
            let lat = data['features'][0]['center'][0];
            let long = data['features'][0]['center'][1];
            let coordinates = [lat, long];
            debugger;
            get_blockcode(coordinates);
        });

}



function get_blockcode(coordinates) {
    debug_output_string = debug_output_string + "\n coordinates: " + coordinates;
    debugger;
    let lat = coordinates[0];
    let long = coordinates[1];
    request_string = "https://geo.fcc.gov/api/census/block/find?longitude=" + lat + "&latitude=" + long + "&format=json&showall=false";
    fetch(request_string)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            let blockcode = data['Block']['FIPS'];
            debugger;
            get_fastest(blockcode)
        });
}


function get_fastest(blockcode) {
    debug_output_string = debug_output_string + "\n census blockcode: " + blockcode;
    debugger;
    request_string = "https://opendata.fcc.gov/resource/ehbi-rr4z.json?blockcode=" + blockcode + "&consumer=1";
    fetch(request_string)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            let fastest = 0;
            for (let i = 0; i < data.length; i++) {
                let x = (parseFloat(data[i]['maxaddown']));
                if  (x > fastest) {
                    fastest = x
                }
            }
            debugger;
            displayResult(fastest);

        });
}



function displayResult(fastest) {
    document.getElementById("success").classList.remove("d-none");
    document.getElementById("danger").classList.add("d-none");
    document.getElementById("displayResult").innerText = "The fastest available broadband speed in your area is " + fastest + " Mbps";
    // click here for more details
    // print debug output string
}


// function displayResult(fastest) {
//     debug_output_string = debug_output_string + "\n fastest speed: " + fastest;
//     debugger;
//     document.getElementById("displayResult").innerText = debug_output_string;
//     debugger;
// }