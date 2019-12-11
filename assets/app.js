let form = document.getElementById("contact")
try {
    form.addEventListener('submit', e => {
        e.preventDefault();

        let Name = document.getElementById("Name");
        let Address = document.getElementById("Address");
        let Email = document.getElementById("Email");
        let Phone = document.getElementById("Phone");
        let Comment = document.getElementById("Comment");

        if (Name.value == "" || Address.value == "" || Email.value == "" || Phone.value == ""|| Comment.value == ""){
            document.getElementById("danger-alert").classList.remove("d-none");
        //
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
}