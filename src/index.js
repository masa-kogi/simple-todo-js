import "./styles.css";

const onClickAdd = () => {
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

const createButton = (text) => {
  const button = document.createElement("button");
  button.innerText = text;
  return button;
};

const getTextContent = (button) => {
  return button.parentNode.firstElementChild.innerText;
};

const createPElement = (text) => {
  const p = document.createElement("p");
  p.className = "content";
  p.innerText = text;
  return p;
};

const getTarget = (button) => {
  return button.closest("li");
};

const createIncompleteList = (text) => {
  const li = document.createElement("li");

  const div = document.createElement("div");
  div.className = "list-row";

  li.appendChild(div);

  const p = createPElement(text);

  const completeButton = createButton("完了");
  completeButton.addEventListener("click", () => {
    const target = getTarget(completeButton);
    deleteFromIncompleteList(target);
    const completedText = getTextContent(completeButton);

    target.firstChild.textContent = null;

    const completedP = createPElement(completedText);

    const backButton = createButton("戻す");
    backButton.addEventListener("click", () => {
      const target = getTarget(backButton);
      document.getElementById("complete-list").removeChild(target);

      const backText = getTextContent(backButton);
      createIncompleteList(backText);
    });

    target.firstChild.appendChild(completedP);
    target.firstChild.appendChild(backButton);

    document.getElementById("complete-list").appendChild(target);
  });

  const deleteButton = createButton("削除");
  deleteButton.addEventListener("click", () => {
    deleteFromIncompleteList(getTarget(deleteButton));
  });

  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
