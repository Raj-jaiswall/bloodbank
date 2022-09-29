var x;
if (localStorage.getItem("user")) {
      x = JSON.parse(localStorage.getItem("user"));
}
else {
      x = JSON.parse(sessionStorage.getItem("user"));
}
console.log("hello");
const ele1 = document.getElementById('name');
const ele2 = document.getElementById('email');
const ele3 = document.getElementById('userimg');
ele1.value = x.username;
ele2.value = x.email;
ele3.setAttribute('src', x.userprofile ? x.userprofile : (x.gender == 'Female' ? 'img/person/blank_female.png' : 'img/person/blank_male.png'));
let genderele = document.getElementById("gender");
if (x.gender == "Male") {
      genderele.innerHTML = `<input type="radio" name="gender" value="Male" checked >Male
      <input type="radio" name="gender" value="Female">Female
      <input type="radio" name="gender" value="other">Other`
}
else if (x.gender == "Female") {
      genderele.innerHTML = `<input type="radio" name="gender" value="Male"  >Male
      <input type="radio" name="gender" value="Female" checked>Female
      <input type="radio" name="gender" value="other">Other`
}
else {
      genderele.innerHTML = `<input type="radio" name="gender" value="Male" >Male
      <input type="radio" name="gender" value="Female">Female
      <input type="radio" name="gender" value="other" checked >Other`
}


const password = document.getElementById('password');
const myform = document.getElementById('myform');
// action =  method = "post"
myform.addEventListener('submit', (e) => {
      if (password.value == x.password) {
            if (confirm("Confirm to Update...")) {
                  e.preventDefault();
                  const selected = document.querySelector('input[name="gender"]:checked').value;

                  var data = {}
                  data["name"] = ele1.value;
                  x.username = ele1.value;
                  data["email"] = ele2.value;
                  x.email = ele2.value;

                  data["gender"] = selected;
                  x.gender = selected;
                  // console.log(data);
                  const ele4 = document.getElementById('newuserimg');
                  if (ele4.value) {
                        console.log("with updatd img");
                        const imagefiles = ele4.files;
                        const image = imagefiles[0];
                        var filereader = new FileReader();
                        filereader.readAsDataURL(image);
                        filereader.onload = function (event) {
                              let xx = event.target.result;
                              x.userprofile = xx;
                              data["myimg"] = xx;
                              var request = {
                                    "url": `/updatedata/${x._id}`,
                                    "method": "POST",
                                    "data": data
                              }
                              $.ajax(request).done(function (response) {
                                    console.log(response);
                                    if (localStorage.getItem("user")) {
                                          localStorage.removeItem("user");
                                          localStorage.setItem("user", JSON.stringify(x));
                                    }
                                    else {
                                          sessionStorage.removeItem("user");
                                          sessionStorage.setItem("user", JSON.stringify(x));
                                    }
                                    location.replace("/");
                              })
                        }
                  }
                  else {
                        console.log("without update img");
                        var request = {
                              "url": `/updatedata/${x._id}`,
                              "method": "POST",
                              "data": data
                        }
                        $.ajax(request).done(function (response) {
                              console.log(response);
                              if (localStorage.getItem("user")) {
                                    localStorage.removeItem("user");
                                    localStorage.setItem("user", JSON.stringify(x));
                              }
                              else {
                                    sessionStorage.removeItem("user");
                                    sessionStorage.setItem("user", JSON.stringify(x));
                              }
                              location.replace("/");

                        })
                  }
            }
            else {
                  e.preventDefault();
            }
      }
      else {
            alert("Wrong Password");
            password.value = "";
            e.preventDefault();
      }
})



const ele4 = document.getElementById('newuserimg');
ele4.onchange = function () {
      console.log("with updatd img");
      const imagefiles = ele4.files;
      const image = imagefiles[0];
      var filereader = new FileReader();
      filereader.readAsDataURL(image);
      filereader.onload = function (event) {
            let xx = event.target.result;
            ele3.setAttribute('src', xx);
      }
}