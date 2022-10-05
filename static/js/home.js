setTimeout(() => {
      document.getElementById('blackbox').style.left = "-100vw";
}, 1000);


const MONTH_NAMES = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
];


function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
      const day = date.getDate();
      const month = MONTH_NAMES[date.getMonth()];
      const year = date.getFullYear();
      const hours = date.getHours();
      let minutes = date.getMinutes();

      if (minutes < 10) {
            // Adding leading zero to minutes
            minutes = `0${minutes}`;
      }

      if (prefomattedDate) {
            // Today at 10:20
            // Yesterday at 10:20
            return `${prefomattedDate}`;
      }

      if (hideYear) {
            // 10. January at 10:20
            return `${day} ${month}`;
      }

      // 10. January 2017. at 10:20
      return `${day} ${month} ${year}`;
}


// --- Main function
function timeAgo(dateParam) {
      if (!dateParam) {
            return null;
      }

      const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
      const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
      const today = new Date();
      const yesterday = new Date(today - DAY_IN_MS);
      const seconds = Math.round((today - date) / 1000);
      const minutes = Math.round(seconds / 60);
      const isToday = today.toDateString() === date.toDateString();
      const isYesterday = yesterday.toDateString() === date.toDateString();
      const isThisYear = today.getFullYear() === date.getFullYear();


      if (seconds < 5) {
            return 'now';
      } else if (seconds < 60) {
            return `${seconds} seconds ago`;
      } else if (seconds < 90) {
            return 'about a minute ago';
      } else if (minutes < 60) {
            return `${minutes} minutes ago`;
      } else if (isToday) {
            return getFormattedDate(date, 'Today'); // Today at 10:20
      } else if (isYesterday) {
            return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
      } else if (isThisYear) {
            return getFormattedDate(date, false, true); // 10. January at 10:20
      }
      return getFormattedDate(date); // 10. January 2017. at 10:20
}

if (localStorage.getItem("user") || sessionStorage.getItem("user")) {
      console.log("index1");
      const ele1 = document.getElementById('username')
      const ele11 = document.getElementById('username2')
      // const ele2 = document.getElementById('password')
      const ele3 = document.getElementById('userimg');
      const ele33 = document.getElementById('userimg2');
      var x;
      if (localStorage.getItem("user")) {
            x = JSON.parse(localStorage.getItem("user"));
      }
      else {
            x = JSON.parse(sessionStorage.getItem("user"));
      }
      ele1.innerText = x.username;
      ele11.innerText = x.username;
      ele3.setAttribute('src', x.userprofile?x.userprofile:(x.gender=='Female'?'img/person/blank_female.png':'img/person/blank_male.png'));
      ele33.setAttribute('src', ele3.getAttribute('src'));

      function showdata() {
            const meter = document.getElementById("meter");
            if (x.totalDonation == 0) {
                  // meter.innerHTML = ``;
            }
            else {
                  var str;
                  if ((new Date() - x.lastDonation) >= 7889400000) {
                        str = "You can donate Now"
                  }
                  else {
                        str = "Wait You Can't Donate"
                  }
                  meter.innerHTML = `<div class="lastdonation">
            <p style = "margin-bottom: 14px; margin-top: 10px;" > Last Time You Donated: ${timeAgo(parseInt(x.lastDonation))}</p >
 
                  <a style="font-size: 15px;" href="/donate">${str}</a>
            </div >
            <div class="other">
                  <div class="box">
                        <h1 style="color: #f35c86;">${x.bloodGroup}</h1>
                        <p>Blood Group</p>
                  </div>
                  <div class="box">
                  <p>Donated</p>
                        <h1>${x.totalDonation}</h1>
                        <p>Times</p>
                  </div>
            </div>`;
            }
      }

      showdata();
      setInterval(() => {
            showdata();
      }, 5000);
}
else {
      document.getElementById('blackbox').style.left = "0";
      setTimeout(() => {
            location.replace('/login');
      }, 1500);
}
function logout() {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      document.getElementById('blackbox').style.left = "0";
      setTimeout(() => {
            location.replace('/login');
      }, 1500);
}