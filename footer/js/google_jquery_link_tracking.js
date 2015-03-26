// Version 1.1, 2012-11-05, by Hilary Mark Nelson

// Make sure there's a Google queue to hold the _trackEvent items
var _gaq = _gaq || [];
    
// Set some time variables
var startTime = startTime || new Date();
var beginning = beginning || startTime.getTime();

jQuery(document).ready(function() {

  // Attach a _trackEvent action to record clicks on all links in the content.
  jQuery('a').click( function(event){

    var thisHost = location.host;
    var hostLength = thisHost.length;
    var tld = thisHost.split('.').slice(-2).join('.');
    var linkTitle = jQuery(this).attr('title')
    if(linkTitle === undefined) {
      linkTitle = '';
    }
    else {
      linkTitle = linkTitle.slice(0,55);
    }
    var linkText = jQuery(this).text();
    if(linkText === undefined) {
      linkText = '';
    }
    else {
      linkText = linkText.slice(0,55);
    }
    var linkUrl = jQuery(this).attr('href');
    if (linkUrl === undefined) {
      linkUrl = '';
    }
    var linkAction = 'Other';

    // The action recorded will depend on where the link goes.
    // Internal = a page on the current host
    // SubDmain = a page on a different sub-domain
    // External = a page on a different domain
    // Other = a link that couldn't be identified as one of the other types

    if ((linkUrl[0] == '/') && (linkUrl[1] != '/')) {
      linkAction = 'Internal';
    } 
    else if ((linkUrl.search('//' + thisHost) >= 0) || (linkUrl.slice(0,hostLength) == thisHost)) {
      linkAction = 'Internal';
    }
    else if ((linkUrl.slice(0,2) == './') || (linkUrl.slice(0,3) == '../')) {
      linkAction = 'Internal';
    }
    else if (linkUrl.search(tld) >= 0) {
      linkAction = 'SubDmain';
    }
    else if (linkUrl.slice(0,4).toLowerCase() == 'http') {
      linkAction = 'External';
    }
    else if (linkUrl.slice(0,2) == '//') {
      linkAction = 'External';
    }
    else if (linkUrl.slice(0,2) != '//') {
      linkAction = 'Internal';
    }
    else {
      linkAction = 'Other';
    }
    
    // Use the text of the link as the label for _trackEvent, 
    // truncating it so that it and its key (ClickLink) are 
    // less than 64 characters. (The max length of a 
    // Google Analytics key:value pair.)
    
    if (linkTitle != '') {
      eventLabel = linkTitle;
    } else if (linkText != '') {
      eventLabel = linkText;
    } else {
      eventLabel = jQuery(this).attr('href').slice(0,55);
    }
    
    // Work out how long it's been since page load, and use that as the value.
    
    var currentTime = new Date();
    var clickTime = currentTime.getTime();
    var eventTime = Math.round((clickTime - beginning) / 1000);
    
    _gaq.push(['_trackEvent', 'Links', linkAction, eventLabel, eventTime]);
    
  });

});