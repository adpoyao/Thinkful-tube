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

let initialState = {
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
  $.getJSON(youtubeEndpoint, params, callback);
}

function pushVariablesToState(result){
  //Traverse through results and obtain thumbnail URLs
  //Push each thumbnail URL to STATE
  console.log(result);
   result.items.map((video) => {
    const { snippet } = video;
    const { url }  = snippet.thumbnails.medium
    STATE.videos.push({thumbnailURL: url, 
      videoID: video.id.videoId,
      channelID: snippet.channelId
    });
    console.log(STATE.videos);
  });
  renderSearchResult(STATE.videos);
}

function renderSearchResult(result) {
  //call back function for displayThumbnailData
  //returning individual item to html element
  let arrayOfElements = [];
  for(let key of STATE.videos){
    console.log(key.thumbnailURL);
    arrayOfElements.push(`
  <div>
    <a href="https://www.youtube.com/watch?v=${key.videoID}" target="_blank"><input type="image" class="js-thumbnail" src="${key.thumbnailURL}"></a>
  </div>
  <div>    
    <a href="https://www.youtube.com/channel/${key.channelID}" target="_blank">More videos from this channel</a>
  </div>
  `);
  }
  let joinArray = arrayOfElements.join('');
  displayThumbnailData(joinArray);
}

//channel

function displayThumbnailData(joinArray){
  $('.js-search-results').html(joinArray);
}

function handleSubmitButton() {
  //listen to user submit on form
  $('.js-search-form').submit(event => {
    //prevent the default action
    event.preventDefault();
    initialState = {
      videos: []
    };
    console.log(initialState);
    STATE = Object.assign({}, initialState);
    //store the value of input
    const searchTarget = $(event.currentTarget).find('.js-query');
    const youtubeSearchTerm = searchTarget.val();
    //clear the value of the search bar after search
    searchTarget.val('');
    //pass the search value to the json function(getDataFromApi)
    getDataFromApi(youtubeSearchTerm, pushVariablesToState);
  });
}

$(handleSubmitButton);
