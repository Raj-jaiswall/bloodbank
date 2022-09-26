window.onload = () => {
      setTimeout(() => {
            document.getElementById('blackbox').style.left = "-100vw";
      }, 200);
}



const myform = document.getElementById('myform');
myform.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('blackbox').style.left = "0";
      const ele1 = document.getElementById('email');
      const ele2 = document.getElementById('password');
      var data = {};
      data["email"] = ele1.value;
      var request = {
            "url": `/login_data`,
            "method": "POST",
            "data": data
      }
      $.ajax(request).done(function (response) {
            console.log("signup");
            if (response) {
                  if (response.password == ele2.value) {
                        localStorage.setItem("user", JSON.stringify(response));
                        location.replace('/');
                  }
                  else {
                        document.getElementById('blackbox').style.left = "-100vw";
                        setTimeout(() => {
                              alert("wrong Password");
                              ele2.value = "";
                        }, 1000);
                  }
            }
            else {
                  document.getElementById('blackbox').style.left = "-100vw";
                  setTimeout(() => {
                        alert("Account not exits Please SignUp");
                        ele1.value = "";
                        ele2.value = "";
                  }, 1000);
            }
      })
})

function tologin() {
      document.getElementById('blackbox').style.left = "0";
      setTimeout(() => {
            location.replace('/login');
      }, 2000);
}