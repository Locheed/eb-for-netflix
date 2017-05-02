'use strict';

let dataAvailable = 0;

function addContent(feed) {
  const searchDiv = document.getElementsByClassName('searchDiv')[0];

    const ulforSearch = document.createElement('ul');
    ulforSearch.setAttribute('class', 'EBN-ul-item');
    searchDiv.appendChild(ulforSearch);
    for ( let i = 0; i < feed.allcats.length; i++) {
      let liItemsforSearch = document.createElement('li');
      liItemsforSearch.setAttribute('class', 'li-item');
      ulforSearch.appendChild(liItemsforSearch);
      let searchItem = document.createElement('a');
      searchItem.setAttribute('class', 'search-item');
      searchItem.href = feed.allcats[i].url;
      searchItem.textContent = feed.allcats[i].name;
      liItemsforSearch.appendChild(searchItem);

    };

  dataAvailable = 1;
};

function startListeningSearch() {
  const searchBar = document.getElementsByClassName('superSearch')[0];
  searchBar.addEventListener('input', function() { // Add eventlistener to searchbar.

    // Filter feed by keywords
    //console.log(searchBar.value.toUpperCase()); // console.log for debugging.
    let filter = searchBar.value.toUpperCase();

    let feedItems = document.getElementsByClassName('li-item'), i;
    for(i = 0; i < feedItems.length; i++) {
      let a = feedItems[i].getElementsByTagName('a')[0];

        if (searchBar.value.length < 2 && a.innerHTML.toUpperCase().charAt(0) === searchBar.value.toUpperCase()) {
          feedItems[i].style.display = "";
          }
        else if (searchBar.value.length === 0) {
          feedItems[i].style.display = "";
        }
        else if (searchBar.value.length >= 2) {
               if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                  feedItems[i].style.display = "";
                  }
                  else {
                    feedItems[i].style.display = "none";
                  }
          }
        else {
          feedItems[i].style.display = "none";
        }
      
    };



  });

};

function startJSONfeed() {
  console.log("Checking if list of search items already exists...");
  if (dataAvailable == 0) {
    console.log("Building searchfeed...");
    // Fetch JSON data.
      fetchJSONFile(chrome.runtime.getURL("/resources/searchfeed.json"), function(feed){
          // do something with your data
          //console.log(feed);
          addContent(feed);


      });
  } else { console.log("-> List of JSON items found! No another query needed!");};
  startListeningSearch();
};

  function fetchJSONFile(path, callback) {
      var httpRequestExt = new XMLHttpRequest();
      httpRequestExt.onreadystatechange = function() {
          if (httpRequestExt.readyState === 4) {
              if (httpRequestExt.status === 200) {
                  var feed = JSON.parse(httpRequestExt.responseText);
                  if (callback) callback(feed);
              }
          }
      };
      httpRequestExt.open('GET', path);
      httpRequestExt.send();
  };
