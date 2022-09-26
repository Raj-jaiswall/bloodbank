
setTimeout(() => {
      document.getElementById('blackbox').style.left = "100vw";
}, 200);

function tosignup() {
      document.getElementById('blackbox').style.left = "0";
      setTimeout(() => {
            location.replace('/signup');
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
            // console.log(data);
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
      location.replace('/');
}