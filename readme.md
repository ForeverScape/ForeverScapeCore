##ForeverScape Tile Engine##
### An Artwork so Large, it Needs it's own Software to View it ###

The ForeverScape is a massive 2.3 football field long hand-drawn illustration that tiles like wallpaper (every page connects to the next).  The drawing is set to "Go Until I do" with no end in sight. The images are periodic and the left column matches the right column, making traditional map APIs not applicable. This is an Angular component implementation that allows users to explore the ForeverScape universe and developers to build upon this universe with their own interactives.

### Live Demo http://staging.foreverscape.com###

Explore the artwork for yourself using the stable version of tile engine.

Dev: http://dev.foreverscape.com


####Learn More:####
See the artwork, watch videos etc. at the current *slammed together* website http://foreverscape.com

####Caveat####

Looking at mobile performance, we will have to likely abondon the Angular convention of ng-repeat for the actual tile engine component. UI and other interfaces are fine, but the tiling needs to be super-efficient, we can't have two-way binding and $digests() going on all the time.


###Licensing:###

Any display of content directly from or derived from the ForeverScape artwork must be accompanied with the text "ForeverScape" on or in the same vicinity of the display apparatus, NOT JUST IN SOURCE CODE. The minimum font size for the text "ForeverScape" must be at least 7% of the of height or width (whichever is greater) of the screen size of the artwork presented and must link to ```http://foreverscape.com?source={{ URL of your company or app}}``` in a browser on the device. This applies to any single image, cropping of a single image or assembly of multiple images. If your host is found to be pulling more than 500,000 CDN responses, please contact ForeverScape LLC to split the Amazon CloudFront bill or make arrangements to purchase redistribution rights. Failure to comply will lead to blocking your hosts. 

You can create commercial software products using this API and the images in the CDN hosted by ForeverScape, LLC as long as you adhere to the restrictions above. Failture to comply will be prosecuted to the fullest extent of the law, including trademark and copyright law. Redistribution of images is strictly prohibited and granted only by the Artist in writing. Reproduction of images, in the form of digital tranfer over network, print, etching, engraving, stamping, and other mediums is strictly prohibited.

Code is distributed under MIT license. 



###Usage:###

  There are several ways to use this library
  
  	   1. Add your own components to the application directory (or other directory of choice)
            

      2. Include `Core` Directory in your project
           
            - copy the core directory to your application
            - inject the following modules

      3. Standalone Page (Good for viewing the Foreverscape)
            - Compile using `Compiling` directions below
            - host the application on your server of choice
            - run index.html in your browser


###Compiling###

1. install node
2. install grunt
3. install node modules with command `npm install`
4. run `grunt comiple` to compile to the `compiled` directory

###Unit Testing###

Dayjob I keep 80%+ code coverage. I don't really have time to maintain tests for this project yet, there are just too many features to get out there, let alone the backend is not yet implimented. 


##TODO: Stories + Features##

Items without *developing* tag are *future stories*. *Developing* tags are actively in development.

**basics**
- ~~Repository~~	
- ~~Setup staging server~~
- Setup New Database + API Server	http://www.hostdepartment.com/databases/mysql-hosting/
- ~~Deployment/Build scripts~~
- ~~setup dev server~~

- **Tile Engine**
	- mobile layout works for iOS
	- mobie layout works for android
	- ~~works in fireforx~~ had to workaround for zoom
	- ~~works in IE~~ 10+ only tested so far
	- ~~works in chrome~~
	- Place Marker *developing*
	- Scroll To Marker  *developing*
	- commenting API  *developing*
	- snap a screenshot and share on Facebook wall / twitter --> deploy to CDN or S3 (needs JS SDK auth)
	- autoplayback in any direction  *developing*
	- fullscreen mode
	- double-tap [touch] to zoom back to default  *developing*
	- ~~pinch [touch] to set zoom~~ tested ios, android need to test mobile IE
	- perhaps use AWS identity services + DynamoDB for location comment engine
	- widget player project that people can "embed" into blog, website etc. 
- **Website Overhaul Design**	
	- Fonts Etc
	- Layout Templates
	- pages + content 
	- SEO grunt script to redirect to hashed pages
- **Integrate  products sales**
	- top banner area
	- sales page
	- snap a capture and send a physical postcard with on demand print API
	
**GAME Design**

	- use AWS identity services
	- Social media API + login
	- Game API
	- Game CMS
	- setup Game Staging site?? nah, just make "game mode" on site when logged in
	- Mobile Targets: Use Appcellerator Titanium or PhoneGap???
	- Mobile platform specific code
	- Publish Targets Android
	- Publish Target IOS
	
