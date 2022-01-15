// ==UserScript==
// @name         Gelbooru Extensions
// @version      1.0.0
// @description  Utilities for gelbooru which i'll add as i need
// @author       Danny K
// @match        https://gelbooru.com/*
// ==/UserScript==


////////////////////////////////////////////////////////////////////////
///   Alow users to expand to the original image by clicking on it   ///
////////////////////////////////////////////////////////////////////////

// Javascript doesn't have enums so these are the next best things
const DISPLAYING_SAMPLE_IMAGE = 0;
const DISPLAYING_ORIGINAL_IMAGE = 1;

// The current state the image display is sample by default
var currentImageDisplay = DISPLAYING_SAMPLE_IMAGE;

// Get the image element and list of tags from their Ids
var imageDisplay = document.getElementById("image");
var tagList = document.getElementById("tag-list");

// Get the sample and original images' links and size from their respective elemnts
var sampleImageLink = imageDisplay.src;
var sampleImageSize = [imageDisplay.width, imageDisplay.height];
var originalImageLink = null;
var originalImageSize = null;

// Get the original image link and size
for (var i = 0; i < tagList.childNodes.length - 1; i++) {
    var currentItem = tagList.childNodes[i];

    if (currentItem.textContent == "Original image") {
        originalImageLink = currentItem.childNodes[0].href;
    }
    if (currentItem.textContent.startsWith("Size: ")) {
        originalImageSize = currentItem.textContent.replace("Size: ", "").split("x");
    }
    if (originalImageLink && originalImageSize) {
        break;
    }
}

// If the original image isn't found log it to the console and halt the script
if (!(originalImageLink && originalImageSize)) {
    console.log("Gelbooru Extensions - Failed to get original image");
    return
}

// Modify the image display for a cursor to indicate functionality and remove the resize image link if it's present
imageDisplay.style.cursor = "pointer";
var resizeLink = document.getElementById("resize-link")
if (resizeLink) {
    resizeLink.remove();
}

// Add onClick event to the image display so we can swap between the links and sizes
imageDisplay.onclick = function() {
    switch (currentImageDisplay) {
        case DISPLAYING_SAMPLE_IMAGE:
            imageDisplay.src = originalImageLink;
            imageDisplay.width = originalImageSize[0];
            imageDisplay.height = originalImageSize[1];
            imageDisplay.classList.remove("fit-width");
            currentImageDisplay = DISPLAYING_ORIGINAL_IMAGE;
            break;
        case DISPLAYING_ORIGINAL_IMAGE:
            imageDisplay.src = sampleImageLink;
            imageDisplay.width = sampleImageSize[0];
            imageDisplay.height = sampleImageSize[1];
            imageDisplay.classList.add("fit-width");
            currentImageDisplay = DISPLAYING_SAMPLE_IMAGE;
            break;
    }
}




/////////////////////////////////////////////////////
/// Force gelbooru to show display: none images   ///
/////////////////////////////////////////////////////

// TODO