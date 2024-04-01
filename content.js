// vars
const mutedElementClass =
  "css-175oi2r r-1awozwy r-x572qd r-jxzhtn r-1867qdf r-1phboty r-rs99b7 r-18u37iz r-1wtj0ep r-s1qlax r-1f1sjgu";
const wrapperPostElement = "article";

/**
 * Add the class to the muted element
 */
function addClassToElement() {
  // remove multiple spaces and join classes with a dot
  const mutedClasses =
    "." +
    mutedElementClass
      .split(" ")
      .filter((c) => c.trim() !== "")
      .join(".");

  const elements = document.querySelectorAll(mutedClasses);
  elements.forEach((element) => {
    // find the parent element wrapperPostElement
    const parentElement = element.closest(wrapperPostElement);
    parentElement.classList.add("usermuted");
  });

  addOptionsToHeader();
}

/**
 * Add styles to the DOM
 */
function addStyles() {
  const style = document.createElement("style");
  style.innerHTML = `
    .usermuted {
      background-color: red;
    }
    body.mutedHidden .usermuted {
      display: none;
    }
    #mutedUsedOptions {
      position: fixed;
      bottom: 30px;
      left: 20px;
      width: 20px;
      height: 20px;
      padding: 2px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      justify-items: center;
      line-height: 15px;
      font-size: 16px;
      color: #ccc;
      background-color: #f2f2f2;
      cursor: pointer;
    }
    #mutedUsedOptions:hover {
      background-color: #505050;
      color: white;
    }
    #mutedUsedOptions::before {
      content: "+";
    }
    body.mutedHidden #mutedUsedOptions::before {
      content: "-";
    }
  `;
  document.head.appendChild(style);
}

// Show/Hide muted posts
function addOptionsToHeader() {
  // if the div already exists, don't create it again
  if (document.getElementById("mutedUsedOptions")) {
    return;
  }

  // Create a new div element and attach to the header
  const div = document.createElement("div");
  div.id = "mutedUsedOptions";
  const header = document.querySelector("header");

  if (header) {
    header.appendChild(div);
    const mutedUsedOptions = document.querySelector("#mutedUsedOptions");
    if (mutedUsedOptions) {
      mutedUsedOptions.addEventListener("click", function () {
        document.body.classList.toggle("mutedHidden");
      });
    }

    // mutedHidden to body by default
    const body = document.querySelector("body");
    body.classList.add("mutedHidden");
  } else {
    console.log("Header element not found");
  }
}

// Create a new observer to watch for changes in the DOM
const observer = new MutationObserver(addClassToElement);

// on page load, start the observer
window.onload = () => {
  console.log("UserMuted started");

  // Add styles
  addStyles();

  // Start observing the document
  observer.observe(document, { childList: true, subtree: true });
};
