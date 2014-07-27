angular.module('FScapeApp.Services').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/main/app/pages/error.html',
    "<p>Page does not exist... or does it?</p>"
  );


  $templateCache.put('src/main/app/pages/testbed/testbed.tpl.html',
    "<div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<h1>ForeverScape Engine</h1>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <h2>Testbed</h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    This is the testbed page where you can load  and test the engine directive\r" +
    "\n" +
    "\r" +
    "\n" +
    "<foreverscape-engine width=\"100%\" height=\"fill-window\" ></foreverscape-engine>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/main/core/components/loadIndicator/indicator.html',
    "<div class=\"load-indicator-view\">\r" +
    "\n" +
    "  <div class=\"load-indicator-background\">&nbsp;</div>\r" +
    "\n" +
    "  <div class=\"load-indicator-spinner ir\">\r" +
    "\n" +
    "    Loading...\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/main/core/components/nav/navigation.html',
    "<nav class=\"header-container\" ng-controller=\"NavController as navCtrl\" ng-hide=\"navCtrl.hide\">\r" +
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
    "    <div class=\"title\">ForeverScape</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <ul class=\"navigation\">\r" +
    "\n" +
    "        <li ng-class=\"{active:learnHover}\"\r" +
    "\n" +
    "                ng-mouseenter=\"learnHover=true\"\r" +
    "\n" +
    "                ng-mouseleave=\"learnHover=false\">\r" +
    "\n" +
    "            <b>L</b>earn\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "        <li ng-class=\"{active:shopHover}\"\r" +
    "\n" +
    "                ng-mouseenter=\"shopHover=true\"\r" +
    "\n" +
    "                ng-mouseleave=\"shopHover=false\">\r" +
    "\n" +
    "            <b>S</b>hop\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "        <li ng-class=\"{active:discoverHover}\"\r" +
    "\n" +
    "                ng-mouseenter=\"discoverHover=true\"\r" +
    "\n" +
    "                ng-mouseleave=\"discoverHover=false\">\r" +
    "\n" +
    "            <b>D</b>iscover\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "</nav>"
  );


  $templateCache.put('src/main/core/components/widgetView/WidgetList.tpl.html',
    "<div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-show=\"widgetCtrl.widgets.data.length > 1 \">\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <span ng-show=\"widgetCtrl.widgets.data.length\"> Yay! We found {{widgetCtrl.widgets.data.length}} widgets! </span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <ul ng-repeat=\"widget in widgetCtrl.widgets.data\">\r" +
    "\n" +
    "            <li>{{widget.name}} :\r" +
    "\n" +
    "                <a href=\"\" ng-click=\"widgetCtrl.getWidgetById(widget.id)\">Directive Link</a>, <a href=\"/#/widget/id/{{widget.id}}\">Permalink By Id</a> ,\r" +
    "\n" +
    "                <a href=\"/#/widget/name/{{widget.name}}\">Permalink By Name</a>\r" +
    "\n" +
    "                <a href=\"/#/widget/lastname/{{widget.lastName}}\">permalink by lastName</a>\r" +
    "\n" +
    "                <br/>\r" +
    "\n" +
    "                <input type=\"button\" ng-click=\"widgetCtrl.deleteWidget(widget.id)\" value=\"Delete\"/>\r" +
    "\n" +
    "                <input type=\"button\" ng-click=\"widgetCtrl.editWidget(widget.id)\" value=\"Edit\"/>\r" +
    "\n" +
    "                <br/>\r" +
    "\n" +
    "                Rating:\r" +
    "\n" +
    "                    <input type=\"button\" ng-click=\"widgetCtrl.rateWidget(widget.id,1)\" value=\"&#10032;\"/>\r" +
    "\n" +
    "                    <input type=\"button\" ng-click=\"widgetCtrl.rateWidget(widget.id,2)\" value=\"&#10032;\"/>\r" +
    "\n" +
    "                    <input type=\"button\" ng-click=\"widgetCtrl.rateWidget(widget.id,3)\" value=\"&#10032;\"/>\r" +
    "\n" +
    "                    <input type=\"button\" ng-click=\"widgetCtrl.rateWidget(widget.id,4)\" value=\"&#10032;\"/>\r" +
    "\n" +
    "                    <input type=\"button\" ng-click=\"widgetCtrl.rateWidget(widget.id,5)\" value=\"&#10032;\"/>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <ul ng-repeat=\"(key, value) in widget track by $index\">\r" +
    "\n" +
    "                    <li style=\"margin-top:-12px;\" >{{key}} : {{value}}</li>\r" +
    "\n" +
    "                </ul>\r" +
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
    "    <div ng-show=\"widgetCtrl.widgets.data.length <= 1 && widgetCtrl.widgets.data.length > 0 \">\r" +
    "\n" +
    "        <ul ng-repeat=\"widget in widgetCtrl.widgets.data\">\r" +
    "\n" +
    "            <li >{{widget.name}}</li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/main/core/modals/errorModal/error.tpl.html',
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


  $templateCache.put('src/main/core/modals/successModal/success.tpl.html',
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


  $templateCache.put('src/main/core/overlay-containers/fullscreen/overlay.tpl.html',
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

}]);
