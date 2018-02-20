/**
 * Created by thihara on 11/2/16.
 */
$(document).ready(function () {

   //Setting up dummy API
   window.scorm = new SCOBotBase({
      debug: true,
      time_type: 'UTC',           // or GMT
      exit_type: 'suspend',       // or finish
      success_status: 'unknown',  // passed, failed, unknown
      cmi: {}  // optional way to resume locally or some other custom use case
   });

   window.scorm.initialize();

    //This is where content providers will look for the SCORM RTE
   window.API_1484_11 = new SCOBot_API_1484_11();

   $("body").on("click", ".navLink" ,function (evt) {
      evt.preventDefault();
      var link = this.href;
      $("#content").attr('src', link);
   });

   var urlParams = getQueryParameters(document.location.search);
   var contentID = urlParams.contentID;
   
   $.get('/navTree',{contentID:contentID},function (navData) {
      console.log(JSON.stringify(navData));
      createNavList(navData);
      // Note: comment createNavList and uncomment the line below to auto run the first SCO
      // $("#content").attr('src', navData[0].children[0].link);
   })
});

var createNavList = function (navData) {
   var contentNavList = $("<ul/>").appendTo('#contentNav');
   navData.forEach(function (entry) {
      contentNavList.append(`<li class="mainNav">${entry.title}</li>`);
      var subList = $(`<ul/>`)
      entry.children.forEach(function (child) {
         subList.append(`<li class="subNav"><a class="navLink" href="${child.link}">${child.title}</a></li>`);
      });
      contentNavList.append(subList);
   });
};

var getQueryParameters = function (queryString) {
   queryString = queryString.split('+').join(' ');

   var params = {},
       tokens,
       re = /[?&]?([^=]+)=([^&]*)/g;

   while (tokens = re.exec(queryString)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
   }

   return params;
};