const apiKey = "093008df13c48a42f47b697c2f27ad20";
let newsAccordion = document.getElementById("newsAccordion");

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: {
    "x-api-key": "8KFD4NFYAXrmdT97U_DM2KeXXLxQGT3DDutstGqGUsM",
  },
};
fetch(
  `https://api.newscatcherapi.com/v2/latest_headlines?countries=in&lang=en`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    let json = JSON.parse(result);
    console.log(json);
    let articles = json.articles;
    let newsHtml = "";
    articles.forEach(function (element, index) {
      console.log(element, index);
      let time = new Date(element.published_date).toLocaleTimeString();
      let news = `<div class="accordion-item">
      <h2 class="accordion-header" id="flush-heading${index}">
          <button class="accordion-button collapsed bg-info text-white" type="button" data-bs-toggle="collapse"
              data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
              ${element.title}
          </button>
      </h2>
      <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}"
          data-bs-parent="#newsAccordion">
          <img src="${element.media}" class="img-fluid rounded mx-auto d-block" alt="${element.title}">
          <div class="accordion-body">
          <div class="float-right">Source(twitter) : ${element.twitter_account} <br> Time: ${time}</div>
          <div>${element.summary}</div>
          <div> <a href="${element.link}" target="_blank"> Read Entire Article </a></div></div>
      </div>
  </div>`;

      newsHtml += news;
    });
    newsAccordion.innerHTML = newsHtml;
  })
  .catch((error) => console.log("error", error));

// To set a running time stamp in the page
setInterval(() => {
  // get a new date (locale machine date time)
  var date = new Date();
  // get the date as a string
  var n = date.toDateString();
  // get the time as a string
  var time = date.toLocaleTimeString();

  // find the html element with the id of time
  // set the innerHTML of that element to the current time stamp
  document.getElementById("time").innerHTML = n + ", " + time;
}, 1000);

// Dynamic year Footer
let year = new Date().getFullYear();
document.getElementById(
  "footer"
).innerHTML = `Created by <a href="https://github.com/anubhavlal07" target="_blank">Anubhav Lal</a> | &copy; ${year} All Rights Reserved.`;

// Diable input from user
(document.onkeydown = function (event) {
    if (event.keyCode == 123) {
      return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
      return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 67) {
      return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 86) {
      return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 117) {
      return false;
    } else if (event.ctrlKey && event.keyCode == 85) {
      return false;
    }
  }),
    false;
  if (document.addEventListener) {
    document.addEventListener(
      "contextmenu",
      function (e) {
        e.preventDefault();
      },
      false
    );
  } else {
    document.attachEvent("oncontextmenu", function () {
      window.event.returnValue = false;
    });
  };
