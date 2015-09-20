(function () {
    var takePicture = document.querySelector("#take-picture"),
        showPicture = document.querySelector("#show-picture");

    if (takePicture && showPicture) {
        // Set events
        takePicture.onchange = function (event) {
            // Get a reference to the taken picture or chosen file
            var files = event.target.files,
                file;
            if (files && files.length > 0) {
                file = files[0];
                try {
                    // Get window.URL object
                    var URL = window.URL || window.webkitURL;

                    // Create ObjectURL
                    var imgURL = URL.createObjectURL(file);

                    // Set img src to ObjectURL
                    showPicture.src = imgURL;

                    // Revoke ObjectURL
                    // URL.revokeObjectURL(imgURL);
                }
                catch (e) {
                    try {
                        // Fallback if createObjectURL is not supported
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showPicture.src = event.target.result;
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        //
                        var error = document.querySelector("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }
            }
        };
    }
})();

(function(){
    var form = document.getElementById('up-form');
    var fileSelect = document.getElementById('take-picture');
    var uploadButton = document.getElementById('up-button');

    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault();

            uploadButton.innerHTML = 'Uploading...';
            uploadButton.disabled = true;

            // The rest of the code will go here...
            var files = fileSelect.files;

            // Create a new FormData object.
            var formData = new FormData();

            // Loop through each of the selected files.
            for (var i = 0; i < files.length; i++) {
              var file = files[i];

              // Check the file type.
              if (!file.type.match('image.*')) {
                continue;
              }

              // Add the file to the request.
              formData.append('photo', file, file.name);
            }
            formData.append('text', document.getElementById('text').value);
            formData.append('codice', document.getElementById('codice').value);
            formData.append('submit', true);

            // Set up the request.
            var xhr = new XMLHttpRequest();

            // Open the connection.
            xhr.open('POST', 'upload.php', true);

            // Set up a handler for when the request finishes.
            xhr.onload = function () {
                if (xhr.status === 200) {
                    location.href = '/foto/';
                } else if (xhr.status === 403) {
                    alert('Codice sbagliato');
                } else {
                    alert('An error occurred!');
                }
                uploadButton.innerHTML = 'Carica';
                uploadButton.disabled = false;
            };

            // Send the Data.
            xhr.send(formData);
        }
    }
})();


(function(){

    var gallery = document.querySelector(".Gallery");

    if (gallery) {
        var request = new XMLHttpRequest();
        request.open('GET', '/upload.php', true);

        request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            // Success!
            var data = JSON.parse(this.response);
            for (var i = 0; i < data.length; i++) {
                var cont = document.createElement("figure");
                cont.classList.add('Gallery__item');
                if (data[i].file) {
                    var oImg = document.createElement("img");
                    oImg.setAttribute('src', '/assets/images/uploads/thumb.' + data[i].file);
                    oImg.setAttribute('alt', data[i].text);
                    oImg.classList.add('Img');
                    cont.appendChild(oImg);
                }
                if (data[i].text) {
                    var oTxt = document.createElement("figcaption");
                    oTxt.innerHTML = data[i].text;
                    cont.appendChild(oTxt);
                }
                gallery.appendChild(cont);
            }
          }
        };

        request.send();
    }
})();
