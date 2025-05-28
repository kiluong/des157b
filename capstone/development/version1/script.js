const avatar = document.getElementById("avatar");
const items = document.querySelectorAll(".item");

items.forEach(item => {
  item.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", item.id);
  });
});

avatar.addEventListener("dragover", e => {
  e.preventDefault();
});

avatar.addEventListener("drop", e => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text");
  const item = document.getElementById(id);
  alert(`You dropped ${item.title} on the avatar.\nShow origin here.`);
});
