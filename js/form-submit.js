// handle form submit

var form = document.querySelector("#modal-form");
async function handleSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      alert("Thanks for your submission!");
      form.reset();
    })
    .catch((error) => {
      alert("Oops! There was a problem submitting your form");
    });
}
form.addEventListener("submit", handleSubmit);
