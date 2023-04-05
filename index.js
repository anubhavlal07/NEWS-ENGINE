const apiKey = "vt6oPzpOUKTFRptRg5o3S7RcF1GqlFvedg-9OroXq_4";
let newsAccordion = document.getElementById("newsAccordion");
let errorPage = document.getElementById("parent");
var headlineCount = 40;
var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: {
    "x-api-key": `${apiKey}`,
  },
};
fetch(
  `https://api.newscatcherapi.com/v2/latest_headlines?countries=in&ranked_only=true&lang=en&when=1h`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    let json = JSON.parse(result);
    console.log(json);
    let articles = json.articles;
    let newsHtml = "";
    if (json.status != "error") {
      articles.forEach(function (element, index) {
        if (
          element.author != "" &&
          element.twitter_account != null &&
          element.media != null &&
          element.summary != ""
        ) {
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
          <img src="${element.media}" class="img-fluid mx-auto d-block" alt="${element.author}">
          <div class="accordion-body">
          <h6 class="card-subtitle mb-2 text-muted">Article by ${element.author} from ${element.twitter_account} at ${time}</h6>
          <div>${element.summary}</div>
          <a href="${element.link}" target="_blank" class="card-link text-black">Read Entire Article</a></div>
      </div>
       </div>`;
          newsHtml += news;
        }
      });
      newsAccordion.innerHTML = newsHtml;
    } else {
      let news = `<section class="centered"">
      <h6 class="d-flex justify-content-center text-white" id="time"></h6>
      <h1>401 unauthorized</h1>
      <h3 class="d-flex justify-content-center text-white">🙁 | The developer forgot to pay for the API | 🙁</h6>
    </section>`;
      newsHtml += news;
      errorPage.innerHTML = newsHtml;
    }
    // newsAccordion.innerHTML = newsHtml;
    console.clear();
  })
  .catch((error) => console.log("error", error));

// To set a running time stamp in the page
setInterval(() => {
  var date = new Date();
  var currentDate = date.toDateString();
  var time = date.toLocaleTimeString();
  document.getElementById("time").innerHTML = currentDate + ", " + time;
}, 1000);

// Dynamic year Footer
let year = new Date().getFullYear();
document.getElementById(
  "footer"
).innerHTML = `Developed and Maintained by <a href="https://github.com/anubhavlal07" target="_blank">Anubhav Lal</a> | &copy; ${year} All Rights Reserved.`;

// Diable input from users
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