const apiKey = "ci8h9lIBHSj_-I9xkry8c5x9ttTjWZbsosOEy_9Bhsc";
let newsAccordion = document.getElementById("newsAccordion");
var headlineCount = 40;
var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: {
    "x-api-key": `${apiKey}`,
  },
};
fetch(
  `https://api.newscatcherapi.com/v2/latest_headlines?countries=in&lang=en&page_size=${headlineCount}`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    let json = JSON.parse(result);
    console.log(json);
    let articles = json.articles;
    let newsHtml = "";
    articles.forEach(function (element, index) {
      if (element.twitter_account != null && element.media != null && element.summary != "") {
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
          <img src="${element.media}" class="img-fluid mx-auto d-block" alt="${element.title}">
          <div class="accordion-body">
          <h6 class="card-subtitle mb-2 text-muted">${element.twitter_account} at ${time}</h6>
          <div>${element.summary}</div>
          <a href="${element.link}" target="_blank" class="card-link text-black">Read Entire Article</a></div>
      </div>
  </div>`;

        newsHtml += news;
      }
    });
    newsAccordion.innerHTML = newsHtml;
  })
  .catch((error) => console.log("error", error));

// To set a running time stamp in the page
setInterval(() => {
  // get a new date (locale machine date time)
  var date = new Date();
  // get the date as a string
  var currentDate = date.toDateString();
  // get the time as a string
  var time = date.toLocaleTimeString();

  // find the html element with the id of time
  // set the innerHTML of that element to the current time stamp
  document.getElementById("time").innerHTML = currentDate + ", " + time;
}, 1000);

// Dynamic year Footer
let year = new Date().getFullYear();
document.getElementById("footer").innerHTML = `Developed by <a href="https://github.com/anubhavlal07" target="_blank">Anubhav Lal</a> | &copy; ${year} All Rights Reserved.`;

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
}
