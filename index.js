const apiKey = "ec33565ea65549e8a9776e5cfcf85da7";
let newsAccordion = document.getElementById("newsAccordion");

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`,
  true
);

// What to do when response is ready
xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    let newsHtml = "";
    articles.forEach(function (element, index) {
      console.log(element, index);
      let time = new Date(element.publishedAt).toLocaleTimeString();
      let news = `<div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading${index}">
                <button class="accordion-button collapsed bg-info text-white" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
                    ${element.title}
                </button>
            </h2>
            <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}"
                data-bs-parent="#newsAccordion">
                <img src="${element.urlToImage}" class="img-fluid rounded mx-auto d-block" alt="${element.title}">
                <div class="accordion-body">
                <div>${element.description} — ${element.source.name} at ${time}</div>
                <a href="${element.url}" target="_blank"> Read Entire Article </a></div>
            </div>
        </div>`;
      newsHtml += news;
    });
    newsAccordion.innerHTML = newsHtml;
  } else {
    console.log("Sorry Some Error Occured !");
  }
};

xhr.send();

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
  