var SELECTED_IMAGE_DISPLAY = 1

function GetImageDisplay()
{
    // Attempt to get the displays' container
    var images = document.getElementsByTagName("img");
    var displaysContainer = null;
    for (var i = 0; i < images.length; i++)
    {
        if (images[i].outerHTML.includes("class=\"img1") || images[i].outerHTML.includes("class=\"img2"))
        {
            displaysContainer = images[i].parentElement;
            break;
        }
    }

    // If we couldn't get it, return null
    if (displaysContainer == null)
    {
        console.log("MEGA_Util::GetImageDisplay - Unable to aquire image displays container");
        return null
    }

    // Get the correct display depending on the active one
    if (SELECTED_IMAGE_DISPLAY == 1)
    {
        return displaysContainer.childNodes[0];
    }
    else
    {
        return displaysContainer.childNodes[1];
    }
}


function 

window.location = GetImageDisplay().src