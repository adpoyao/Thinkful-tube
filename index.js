'use strict';
/* global $ */

//Create a Search Bar with a submit button
//Listen to user submit
//store input value
//query the api for the search term and parameters
//generate html element with the data from the search
//display the result (thumbnail image) on the dom

const youtubeKey = 'AIzaSyCLTW5L2hLYTbWfueyDRzzwt9vQead4PP0';
const youtubeEndpoint = 'https://www.googleapis.com/youtube/v3/search';

const initialState = {
  videos: []
};

let STATE = Object.assign({}, initialState);

function getDataFromApi(searchValue, callback) {
  //pass searchValue to the query
  const params = {
    part: 'snippet',
    key: youtubeKey,
    q: searchValue
  };
  //use getJSON method on the youtubeEndpoint
  //pass in query and the callback function to getJSON //method
  $.getJSON(youtubeEndpoint, params, pushVariablesToState);
}

function pushVariablesToState(result){
  //Traverse through results and obtain thumbnail URLs
  //Push each thumbnail URL to STATE
  let arrayOfThumbnailsURL = result.items.map(function(eachLine){
    STATE.videos.push({thumbnailURL: eachLine.snippet.thumbnails.medium.url});
  });
  (console.log(STATE.videos));
  renderSearchResult(STATE.videos)
}

function renderSearchResult(result) {
  //call back function for displayThumbnailData
  //returning individual item to html element
  let arrayOfElements = [];
  for(let key of STATE.videos){
    console.log(key.thumbnailURL)
  arrayOfElements.push(`
  <div>
    <input type="image" class="js-thumbnail" src="${key.thumbnailURL}" target="_blank"$!VAR!><a class="js-thumbnail-url" href="${STATE.videos}" target="_blank">
  </div>
  `);
}
let joinArray = arrayOfElements.join('');
displayThumbnailData(joinArray);
}

function displayThumbnailData(joinArray){
  $('.js-search-results').html(joinArray)
}

function handleSubmitButton() {
  //listen to user submit on form
  $('.js-search-form').submit(event => {
    //prevent the default action
    event.preventDefault();
    STATE = Object.assign({}, initialState);
    //store the value of input
    const searchTarget = $(event.currentTarget).find('.js-query');
    const youtubeSearchTerm = searchTarget.val();
    //clear the value of the search bar after search
    searchTarget.val('');
    //pass the search value to the json function(getDataFromApi)
    getDataFromApi(youtubeSearchTerm, displayThumbnailData);
  });
}

$(handleSubmitButton);
