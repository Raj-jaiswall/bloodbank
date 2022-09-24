// console.log("helllo");
// const myform = document.getElementById('myform');
// const lastDonation = document.getElementById('lastDonation');
// myform.addEventListener('submit', (e) => {
//       // console.log(lastDonation.value);
//       // var s = JSON.stringify(lastDonation.value);
//       console.log(Date.parse(lastDonation.value));
//       // var s1 = toString(s);
//       // console.log(s);
//       // console.log(s1);
//       // console.log(...prepareDate(s1));
//       // let d = new Date(...prepareDate(JSON.stringify(lastDonation.value)));
//       // let d = new Date(...prepareDate(s1))
//       // console.log(d);
//       e.preventDefault();
// })




var x;
if (localStorage.getItem("user")) {
      x = JSON.parse(localStorage.getItem("user"));
}
else {
      x = JSON.parse(sessionStorage.getItem("user"));
}
console.log("hello");


const password = document.getElementById('password');
const myform = document.getElementById('myform');
// action =  method = "post"
myform.addEventListener('submit', (e) => {
      if (password.value == x.password) {
            if (confirm("Confirm to Donate...")) {
                  e.preventDefault();
                  
                  const ele1 = document.getElementById('number');
                  const ele2 = document.getElementById('bloodGroup');
                  const ele3 = document.getElementById('totalDonation');
                  const ele4 = document.getElementById('dob');
                  const ele5 = document.getElementById('lastDonation');
 
                  var data = {}
                  data["phone"] = ele1.value;
                  x.phone = ele1.value;
                  data["bloodGroup"] = ele2.value;
                  x.bloodGroup = ele2.value;
                  data["totalDonation"] = ele3.value;
                  x.totalDonation = ele3.value;
                  data["dob"] = Date.parse(ele4.value);
                  x.dob = Date.parse(ele4.value);
                  data["lastDonation"] = Date.parse(ele5.value);
                  x.lastDonation = Date.parse(ele5.value);
                  
                  console.log(Date.parse(ele4.value));
                  console.log(data);
                  var request = {
                        "url": `/donatedata/${x._id}`,
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