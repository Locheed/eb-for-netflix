'use strict';





function createSuperSearch(topBar) {
  const searchBar = document.createElement('input');
  searchBar.setAttribute('type', 'search');
  searchBar.setAttribute('class', 'superSearch');
  searchBar.setAttribute('placeholder', 'Search everything');
  topBar.appendChild(searchBar);

  const searchDiv = document.createElement('div');
  searchDiv.setAttribute('class', 'searchDiv');
  //const extBrowsePlacement = document.getElementById('hdPinTarget').getElementsByTagName('ul')[0];
  //const kids = document.getElementById('hdPinTarget').getElementsByTagName('ul')[0].getElementsByClassName('kids')[0];
  //extBrowsePlacement.insertBefore(searchDiv, kids);
  const container = document.getElementsByClassName('wrapper')[0];
  container.appendChild(searchDiv);

  searchBar.onclick = function() {
    searchDiv.classList.add('focus');

    startJSONfeed();
        //container.classList.add('wrapper-big');
    const hiddenGem = document.getElementsByClassName('hidden-menu')[0];
    //hiddenGem.classList.add('blur');
  };

  searchBar.onblur = function() {
    searchDiv.classList.remove('focus');
    //container.classList.remove('wrapper-big');
    //hiddenGem.classList.remove('blur');
  };

  searchDiv.onmouseleave = function() {
    searchDiv.classList.remove('focus');

  };
  //const superButton = document.createElement('input');
  //superButton.setAttribute('type', 'button');
  //superButton.setAttribute('class', 'superBtn');
  //superButton.setAttribute('value', 'Super Search >>');
  //hiddenGem.appendChild(superButton);
};
