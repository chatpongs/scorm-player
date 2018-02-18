/**
 * Created by thihara on 11/2/16.
 */
$(document).ready(function () {
   $.get('/content',{},function (contentList) {
      console.log(JSON.stringify(contentList));
      createContentList(contentList);
   })
});

var createContentList = function (conentList) {
   var contentList = $("#contentList");
   conentList.forEach(function (entry) {
      contentList.append(`<li class="content"><a href="/scormPlayer.html?contentID=${entry}">${entry}</a></li>`);
   });
};