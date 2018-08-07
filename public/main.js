const saveBtn = document.getElementById("save");
const name = document.getElementById("name");
const quote = document.getElementById("quote");
const deleteBtns = document.getElementsByClassName("delete");
const lis = document.getElementsByTagName("li");

if (saveBtn !== null) {
  saveBtn.addEventListener("click", (e) => {
    fetch("/quotes", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        quote: quote.value
      })
    }).then((data) => {
      console.log(data);
    });
  });
} else {
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", (e) => {
      const name = lis[i].innerText.split(": ")[0];
      const quote = lis[i].innerText.split(": ")[1];
      fetch("/quotes", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          quote: quote
        })
      })
        .then((res) => {
          console.log(res);
          if (res.ok) return res.json();
        })
        .then((data) => {
          console.log(data);
          window.location.reload(true);
        });
    });
  }
}
