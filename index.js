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

const params = {
  part: 'snippet',
  key: youtubeKey,
  q: 'cats'
}
$.getJSON(youtubeEndpoint, params, function(response) {
  console.log(response);
});

// function getDataFromApi(searchValue, callback) {
//   //pass searchValue to the query
//   //use getJSON method on the youtubeEndpoint
//   //pass in query and the callback function to getJSON //method
// }

// function renderSearchResult(result) {
//   //call back function for displayThumbnailData
//   //returning individual item to html element
//   return `
//   <div>
//     <input type="image" class="js-thumbnail" src = ${result.something} target="_blank"$!VAR!><a class="js-thumbnail-url" href="${result.something}" target="_blank">
//   </div>
//   `;
// }

// function displayThumbnailData(returnedDataFromJSON){
//   //creates a new array of all the items from JSON
//   //and renders them to the dom
// }

// function handleSubmitButton() {
//   //listen to user submit on form
//   //prevent the default action
//   //store the value of input
//   //clear the value of the search bar after search
//   //pass the search value to the json function(getDataFromApi)
// }
