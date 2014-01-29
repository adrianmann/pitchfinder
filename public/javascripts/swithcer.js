


var defaultStyleLink, otherStyleLink;

defaultStyleLink = document.getElementById("Original");
otherStyleLink = document.getElementById("Alternate");


function setActiveStyleSheet ( styleId ) {
    var i = 0;
    var linkItem, linkArray;

    linkArray = document.getElementsByTagName("link");

    for ( var i = 0; i < linkArray.length; i++ ) {

        linkItem = linkArray[i];

        if ( linkItem.getAttribute("rel").indexOf("style") != -1 && linkItem.getAttribute("title") ) {
        }
        if ( linkItem.getAttribute("rel").indexOf("style") != -1 && linkItem.getAttribute("title") ) {
            linkItem.disabled = true;
        }
        if (linkItem.getAttribute("title") === styleId ) {
            linkItem.disabled = false;
        }
    }
}

function getActiveStyleSheet () {
    var i = 0;
    var linkItem, linkArray;

    linkArray = document.getElementsByTagName("link");

    for ( i = 0; i < linkArray.length ; i++ ) {

        linkItem = linkArray[i];

        if ( linkItem.getAttribute("rel").indexOf("style") != -1 &&
            linkItem.getAttribute("title") && !linkItem.disabled ) {
            return linkItem.getAttribute("title");
        }
    }
    return null;
}



defaultStyleLink.onclick = function() {
    setActiveStyleSheet( this.id );
};
otherStyleLink.onclick = function() {
    setActiveStyleSheet( this.id );
};

window.onload = function() {

    var cookie = readCookie ( "style" );
    var title;

    if ( cookie ) {
        title = cookie;
        setActiveStyleSheet ( title );
    }
}

window.onunload = function() {
    var title = getActiveStyleSheet();
    createCookie("style", title, 30);
}