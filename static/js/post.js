let arrays;
function alluser() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/allids', true);
      xhr.getResponseHeader('Content-type', 'application/json');
      xhr.onload = function () {
            arrays = JSON.parse(this.responseText);
            runarray();
      }
      xhr.send();
}

function runarray() {
      console.log(arrays.length);
      const alluserimg = document.getElementById('alluserimg');
      arrays.forEach(element => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `/user/${element}`, true);
            xhr.getResponseHeader('Content-type', 'application/json');
            xhr.onload = function () {
                  var userdata = JSON.parse(this.responseText);
                  alluserimg.innerHTML += `<div class="post">
                                    <div class="postWrapper">
                                          <div class="postTop">
                                                <div class="postTopLeft"><img class="postProfileImg"
                                                            src=${userdata.userprofile} alt=""><span
                                                            class="postUsername">${userdata.username}</span></div>
                                          </div>
                                          <div class="postCenter"><span class="postText">Celebrating parvati's
                                                      birthday..</span><img class="postImg" src=${userdata.userprofile} alt="">
                                          </div>
                                    </div>
                              </div>`
                  // alluserimg.innerHTML += `<img src=${userdata.userprofile} alt="" id="myimg" height="300px" width="300px">`
                  console.log(userdata);
            }
            xhr.send();
      });
      document.getElementById('btnAllUser').innerText = "Refresh"
}
setTimeout(alluser, 2000);