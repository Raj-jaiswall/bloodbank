
setTimeout(() => {
      document.getElementById('blackbox').style.left = "100vw";
}, 200);

function tologin() {
      document.getElementById('blackbox').style.left = "0";
      setTimeout(() => {
            location.replace('/login');
      }, 1500);
}

if (localStorage.getItem("user") || sessionStorage.getItem("user")) {
      run();
}
console.log("in login page");
const myform = document.getElementById("myform");
const name1 = document.getElementById('name');
const email1 = document.getElementById('email');
const password1 = document.getElementById('password');
myform.addEventListener('submit', (event) => {
      console.log('submitted');
      event.preventDefault();
      const selected = document.querySelector('input[name="gender"]:checked').value;
      document.getElementById('signupbtn').innerHTML = `<i class="fa-solid fa-spinner"></i>`
      document.getElementById('signupbtn').classList.add('rotateit');
      const imgele = document.getElementById('img');
      if (imgele.value) {
            console.log("with img")
            const imagefiles = document.getElementById('img').files;
            const image = imagefiles[0];
            var filereader = new FileReader();
            filereader.readAsDataURL(image);
            filereader.onload = function (event) {
                  let x = event.target.result;
                  var data = {}
                  data["name"] = name1.value;
                  data["email"] = email1.value;
                  data["password"] = password1.value;
                  data["myimg"] = x;
                  data["gender"] = selected;
                  console.log(data);
                  var request = {
                        "url": `/saveUser`,
                        "method": "POST",
                        "data": data
                  }
                  $.ajax(request).done(function (response) {
                        if (document.getElementById('checkbox').checked) {
                              console.log("local")
                              localStorage.setItem("user", JSON.stringify(response));
                        }
                        else {
                              console.log("session")
                              sessionStorage.setItem("user", JSON.stringify(response))
                        }
                        run();
                  })
            }
      }
      else {
            console.log("without img");
            var data = {}
            data["name"] = name1.value;
            data["email"] = email1.value;
            data["password"] = password1.value;
            data["gender"] = selected;
            console.log(data);
            var request = {
                  "url": `/saveUser`,
                  "method": "POST",
                  "data": data
            }
            $.ajax(request).done(function (response) {
                  if (document.getElementById('checkbox').checked) {
                        console.log("local")
                        localStorage.setItem("user", JSON.stringify(response));
                  }
                  else {
                        console.log("session")
                        sessionStorage.setItem("user", JSON.stringify(response))
                  }
                  run();
            })
      }
})

function run() {
      document.getElementById('blackbox').style.left = "0";
      setTimeout(() => {
            location.replace('/');
      }, 1500);
}


const userProfile = document.getElementById('img')
userProfile.onchange = function () {
      var photos = userProfile.files;
      photos = photos[0];
      var fr = new FileReader();
      fr.readAsDataURL(photos);
      fr.onload = function (e) {
            console.log(e.target.result);
            document.getElementById('label').style.display = "none";
            document.getElementById('cancel').style.display = "block"
            document.getElementsByClassName('demoimg')[0].style.height = "140px";
            document.getElementById('demoimg').setAttribute('src', e.target.result);
      }
}
function cancelimg() {
      document.getElementById('label').style.display = "block";
      document.getElementById('cancel').style.display = "none"
      userProfile.value = "";
      document.getElementsByClassName('demoimg')[0].style.height = "0px";
      document.getElementById('demoimg').setAttribute('src', '');
}