angular.module('FScapeApp.Services').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('main/app/pages/error.html',
    "<p>Page does not exist... or does it?</p>"
  );


  $templateCache.put('main/app/pages/testbed/testbed.tpl.html',
    "<div class=\"page\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <h1>ForeverScape Engine</h1>\r" +
    "\n" +
    "    <h2>Testbed</h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <foreverscape-engine></foreverscape-engine>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('main/core/components/bottomNav/bottom-nav.html',
    "<div class=\"location-tool\" ng-controller=\"bottomNavController as bottomNavCtrl\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <playback></playback>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('main/core/components/foreverscapeEngine/foreverscape-engine.tpl.html',
    "<div class=\"foreverscape-engine-wrapper\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"hud\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        time: {{ fscapeEngineCtrl.time| number:0 }}<br/>\r" +
    "\n" +
    "        hasRender: {{ fscapeEngineCtrl.hasRender| number:0 }}<br/>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        zoom: {{touchService.zoom}}\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div id=\"trace\">Hello</div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"engine-frame\"\r" +
    "\n" +
    "         ng-mouseleave=\"fscapeEngineCtrl.mouseUp($event)\"\r" +
    "\n" +
    "         ng-mousedown=\"fscapeEngineCtrl.mouseDown($event)\"\r" +
    "\n" +
    "\r" +
    "\n" +
    "         hm-drag=\"fscapeEngineCtrl.handleDrag($event)\"\r" +
    "\n" +
    "         hm-dragend=\"fscapeEngineCtrl.mouseUp($event)\"\r" +
    "\n" +
    "         hm-touch=\"fscapeEngineCtrl.touchGesture($event)\"\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "         ng-mouseleave=\"touchService.mouseUp($event)\"\r" +
    "\n" +
    "         ng-mousedown=\"touchService.mouseDown($event)\"\r" +
    "\n" +
    "\r" +
    "\n" +
    "         hm-drag=\"touchService.handleDrag($event)\"\r" +
    "\n" +
    "         hm-dragend=\"touchService.mouseUp($event)\"\r" +
    "\n" +
    "         hm-pinch=\"touchService.handlePinch($event)\"\r" +
    "\n" +
    "         hm-touch=\"touchService.touchGesture($event)\"\r" +
    "\n" +
    "\r" +
    "\n" +
    "         >\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"engine-scale\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div id=\"tile-engine\" class=\"engine-position\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<!--\r" +
    "\n" +
    "\r" +
    "\n" +
    "         ng-mouseup=\"fscapeEngineCtrl.mouseUp($event)\"\r" +
    "\n" +
    "         ng-mousemove=\"fscapeEngineCtrl.mouseMove($event)\"\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div id=\"{{gridBox.domId}}\" ng-style=\"{left:gridBox.x, top:gridBox.y, width: gridBox.width, height:gridBox.height }\" class=\"grid-box\" ng-repeat=\"(index,gridBox) in fscapeEngineCtrl.gridBoxes\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                   <img class=\"full\" id=\"full-{{gridBox.domId}}\"  ng-style=\"{width:gridBox.width, height: gridBox.height}\"/>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                   <img class=\"thumb\" image-onload numeric-id=\"{{gridBox.currentTile.id}}\" id=\"thumb-{{gridBox.domId}}\" ng-src=\"{{gridBox.currentTile.thumbUrl}}\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"grid-info\">\r" +
    "\n" +
    "    Page {{gridBox.id}}<br/>\r" +
    "\n" +
    "    {{gridBox.currentTile.name }}<br/>\r" +
    "\n" +
    "    {{gridBox.isOnScreen}}\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('main/core/components/loadIndicator/indicator.html',
    "<div style='z-index:500' class=\"load-indicator-view\">\r" +
    "\n" +
    "    <img src=\"main/resources/img/loader.gif\"/>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('main/core/components/locationTool/location-tool.html',
    "<div class=\"location-tool\" ng-controller=\"locationTool as locationCtrl\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"playback\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"play\" alt=\"play\" ng-click=\"locationCtrl.togglePlayback($event)\" ng-show=\"!fscapeService.isPlaying\"></div>\r" +
    "\n" +
    "        <div class=\"pause\" alt=\"pause\"  ng-click=\"locationCtrl.togglePlayback($event)\"  ng-show=\"fscapeService.isPlaying\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('main/core/components/nav/navigation.html',
    "<nav class=\"header-container\" ng-controller=\"navController as navCtrl\" ng-hide=\"navCtrl.hide\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <span class=\"menu\" ng-click=\"showMenu=true\">\r" +
    "\n" +
    "        <div ng-show=\"showMenu\">HelloMenu</div>\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"title\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"navigation\">\r" +
    "\n" +
    "        <ul >\r" +
    "\n" +
    "            <li >\r" +
    "\n" +
    "                <a href=\"http://foreverscape.com/about\"><b>L</b>earn</a>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "            <li >\r" +
    "\n" +
    "                <a href=\"https://foreverscape.com/shop/index.php\"><b>S</b>hop</a>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "            <li>\r" +
    "\n" +
    "                <a href=\"https://foreverscape.com/shop/index.php\"><b>D</b>iscover</a>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "            <li >\r" +
    "\n" +
    "                <a href=\"http://www.foreverscape.com/videos/\"><b>V</b>ideo</a>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "            <li >\r" +
    "\n" +
    "                <a href=\"https://github.com/vance/ForeverScapeCore\"><b>S</b>ourcecode</a>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</nav>"
  );


  $templateCache.put('main/core/components/playback/playback.html',
    "<div class=\"playback\" ng-controller=\"playbackController as playbackCtrl\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"play\" alt=\"play\" ng-click=\"fscapeService.togglePlayback($event)\" ng-show=\"!fscapeService.isPlaying\"></div>\r" +
    "\n" +
    "    <div class=\"pause\" alt=\"pause\"  ng-click=\"fscapeService.togglePlayback($event)\"  ng-show=\"fscapeService.isPlaying\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('main/core/modals/errorModal/error.tpl.html',
    "<div class=\"debugger\" ng-controller=\"ErrorController as errorCtrl\">\r" +
    "\n" +
    "  <div class=\"overlay-header\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <h2>SERVER ERROR!</h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <p>{{errorCtrl.errorService.errorMessage}}</p>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('main/core/modals/successModal/success.tpl.html',
    "<div ng-controller=\"SuccessController as successCtrl\">\r" +
    "\n" +
    "  <div class=\"overlay-header\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <h2>Success!</h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('main/core/overlay-containers/fullscreen/overlay.tpl.html',
    "<div class=\"overlay-container\"\r" +
    "\n" +
    "     ng-controller=\"OverlayController as overlayCtrl\"\r" +
    "\n" +
    "     ng-show=\"overlayCtrl.showOverlay\"\r" +
    "\n" +
    "     ng-click=\"overlayCtrl.onShadowClick($event)\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"overlay-content-wrapper\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"overlay-close\" ng-show=\"overlayCtrl.showCloseIcon\" ng-click=\"overlayCtrl.close()\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"overlay-help\" ng-show=\"overlayCtrl.showHelpIcon\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <overlay-content></overlay-content>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('main/website/pages/home/home.tpl.html',
    "<div class=\"page\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "<foreverscape-engine width=\"100%\" height=\"fill-window\"></foreverscape-engine>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );

}]);
