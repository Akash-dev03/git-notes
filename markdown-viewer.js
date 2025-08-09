const params = new URLSearchParams(window.location.search);
const file = params.get("file");

if (file) {
  fetch(file)
    .then((res) => res.text())
    .then((text) => {
      document.getElementById("content").innerHTML = marked.parse(text);
    })
    .catch((err) => {
      document.getElementById(
        "content"
      ).innerHTML = `<p style="color:red;">Error loading file: ${file}</p>`;
    });
} else {
  document.getElementById("content").innerHTML = "<p>No file selected.</p>";
}
