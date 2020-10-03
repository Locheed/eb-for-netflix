"use strict";

const versio = "1.1.1";
let language = "english";
const isMainPage = setInterval(function() {
  if (!document.getElementsByClassName("profiles-gate-container")[0]) {
    chrome.runtime.sendMessage({ type: "showPageAction" });
    clearInterval(isMainPage);
    checkLanguage();
  }
}, 1000);

    // Check localization
    function checkLanguage() {
      const checkLang = document
        .getElementById("appMountPoint")
        .querySelector("[lang]").lang;
      //.closest("[lang]");
      console.log('Language check shows: ' + checkLang);

      // new language selection
      fetchJSONFile(chrome.runtime.getURL('/resources/_languages.json'), function (data) {
        if (data[checkLang] == undefined) {
          language = data.default;
          console.log('default language');
        } else {
          language = data[checkLang];
          console.log('Language found');
        }

        // Fetch JSON data.
        fetchJSONFile(chrome.runtime.getURL('/resources/' + language + '.json'), function (data) {
          // do something with your data
          console.log('Language selected: ' + language);
          //console.log(data); //Fetched data for debug purpose.

          createHiddenGem(data);
          populateHiddenGem(data);
        });
      });
    }


function createHiddenGem(data) {
  //Find placement for Extended Browse
  const browse = document.getElementsByClassName("browse")[0];

  //Create Extended Browse button
  const extBrowse = document.createElement("li");
  const extBrowseLink = document.createElement("a");
  extBrowse.setAttribute("class", "navigation-tab");
  extBrowseLink.textContent = data.menu[0].browse; //Get translated button text from JSON file.
  extBrowse.appendChild(extBrowseLink);

  const extBrowsePlacement = document.querySelector(
    ".tabbed-primary-navigation"
  );
  extBrowsePlacement.appendChild(extBrowse);

  //Create small red caret for button.
  // const caret = document.createElement("span");
  // caret.setAttribute("class", "redCaret");
  // extBrowse.appendChild(caret);

  //Create container for all divs
  const container = document.createElement("div");
  container.setAttribute("class", "wrapper");
  extBrowsePlacement.appendChild(container);

  //Create hiddenGem.
  const hiddenGem = document.createElement("div");
  hiddenGem.setAttribute("class", "hidden-menu");
  container.appendChild(hiddenGem);

  //Create topbar.
  const topBar = document.createElement("div");
  topBar.setAttribute("class", "topBar");
  hiddenGem.appendChild(topBar);

  createSuperSearch(topBar);

  //Create content to topbar
  const logo = document.createElement("p");
  logo.setAttribute("class", "logo");
  logo.textContent = "Extended Browse for Netflix " + versio;
  topBar.appendChild(logo);

  // Open dialog onclick.
  const searchDiv = document.getElementsByClassName("searchDiv")[0];
  extBrowse.onclick = function() {
    // Scroll back to top when opens dialog.
    hiddenGem.classList.toggle("visible");
    container.classList.toggle("active");
    hiddenGem.scrollTop = 0;
  };

  container.onmouseleave = function() {
    //console.log("Window closed");
    hiddenGem.classList.remove("visible");
    container.classList.remove("active");
  };
}

// Populate hiddenGem with data.
function populateHiddenGem(data) {
  const dataPlacement = document.getElementsByClassName("hidden-menu")[0];

  for (let i = 0; i < data.mains.length; i++) {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    ul.setAttribute("class", "extBrowse-ul");
    li.setAttribute("class", "mainTitle");
    dataPlacement.appendChild(ul);
    ul.appendChild(li);

    let titles;

    // console.log(data.mains[i].name, data.mains[i].nourl);

    if (data.mains[i].nourl == true) {
      titles = document.createElement('div');
      titles.textContent = data.mains[i].name;
    } else {
      titles = document.createElement('a');
      titles.href = data.mains[i].url;
      titles.textContent = data.mains[i].name;
    }

    li.appendChild(titles);

    for (let j = 0; j < data.mains[i].subs.length; j++) {
      const liSubs = document.createElement("li");
      liSubs.setAttribute("class", "subTitle");
      ul.appendChild(liSubs);
      let subs = document.createElement("a");

      subs.href = data.mains[i].subs[j].url;
      subs.textContent = data.mains[i].subs[j].name;
      liSubs.appendChild(subs);
    }
  }
}

function fetchJSONFile(path, callback) {
  var httpRequestExt = new XMLHttpRequest();
  httpRequestExt.onreadystatechange = function() {
    if (httpRequestExt.readyState === 4) {
      if (httpRequestExt.status === 200) {
        var data = JSON.parse(httpRequestExt.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequestExt.open("GET", path);
  httpRequestExt.send();
}

// this requests the file and executes a callback with the parsed result once
//   it is available
