let newsAccordion = document.getElementById("newsAccordion");
let errorPage = document.getElementById("parent");
fetch(`https://inshorts.deta.dev/news?category=all`)
  .then((response) => response.json())
  .then((result) => {
    // console.log(result);
    let articles = result.data;
    articles = articles.sort((a, b) => {
      if (a.time > b.time) {
        return -1;
      }
    });
    let newsHtml = "";
    if (result.success == true) {
      articles.forEach(function (articles, index) {
        // console.log(articles);
        if (articles.author != "") {
          // console.log(articles, index);
          let news = `<div class="accordion-item">
  <h2 class="accordion-header" id="flush-heading${index}">
    <button class="accordion-button collapsed bg-info text-white" type="button" data-bs-toggle="collapse"
      data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
      ${articles.title}
    </button>
  </h2>
  <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}"
    data-bs-parent="#newsAccordion">
    <img src="${articles.imageUrl}" class="img-fluid mx-auto d-block" alt="${articles.author}">
    <div class="accordion-body">
      <h6 class="card-subtitle mb-2 text-muted">Article by ${articles.author} at ${articles.time}</h6>
      <div>${articles.content}</div>
      <a href="${articles.readMoreUrl}" target="_blank" class="card-link text-black">Read Entire Article</a>
    </div>
  </div>
</div>`;
          newsHtml += news;
        }
      });
      newsAccordion.innerHTML = newsHtml;
      console.clear();
      console.log(
        "Congratulations, you've officially reached ultimate nerd status. Impressive 😂👌👍"
      );
    } else {
      let news = `<section class="centered"">
      <h6 class=" d-flex justify-content-center text-white" id="time">
  </h6>
  <h1>401 unauthorized</h1>
  <h3 class="d-flex justify-content-center text-white">🙁 | The developer forgot to pay for the API | 🙁</h6>
</section>`;
      newsHtml += news;
      errorPage.innerHTML = newsHtml;
    }
  })
  .catch((error) => console.log("error", error));

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
).innerHTML = `Developed and maintained by <a href="https://github.com/anubhavlal07" target="_blank">Anubhav Lal</a> |
&copy; ${year} All Rights Reserved.`;

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
