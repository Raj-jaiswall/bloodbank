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
      const alluserimg = document.getElementById('subbox');
      arrays.forEach(element => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `/user/${element}`, true);
            xhr.getResponseHeader('Content-type', 'application/json');
            xhr.onload = function () {
                  var userdata = JSON.parse(this.responseText);
                  alluserimg.innerHTML += `<div class="profile">
                        <img  src=${userdata.userprofile}
                                alt="">
                        <div class="username">${userdata.username}</div>
                        <p style="display: none;">${userdata.totalDonation}</p>
                        <p style="display: none;">${userdata.email}</p>
                        <p style="display: none;">${userdata.phone}</p>
                        
                       <div class="btn" ><button  class="myclass" id=${userdata._id}>See Profile</button></div>
                  </div>`
                  // alluserimg.innerHTML += `<img src=${userdata.userprofile} alt="" id="myimg" height="300px" width="300px">`
                  // console.log(userdata);
                  let ele = Array.from(document.getElementsByClassName("myclass"));
                  ele.forEach(element => {
                        element.addEventListener('click', (e) => {
                              let xx =  document.getElementById(e.target.id).parentNode.parentNode;
                              let card = document.getElementById('card');
                              console.log("hello");
                              xx = Array.from(xx.children);
                              yy = Array.from(card.children);
                              yy[1].setAttribute('src', xx[0].getAttribute('src'));
                              yy[2].innerText = xx[1].innerText;
                              yy[3].innerText = `Total Donations: ${xx[2].innerText}`
                              yy[4].innerText = `Email: ${xx[3].innerText}`
                              yy[5].innerText = `Contact: ${xx[4].innerText}`
                              card.style.display = "block";
                        })
                  });
            }
            xhr.send();
      });
}
setTimeout(alluser, 2000);

function removeCard() {
      let card = document.getElementById('card');
      card.style.display = "none";
}

 
 
