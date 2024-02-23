# Ideas! 

Security
 - Uhmmm, there may or may not be API keys...DON'T TELL LEANNE
 - We do use photos and location so we likely have to make sure that's secure and have some sort of privacy policy.

Sustainability
 - A lot of our dropdowns is "hard coded". We need to make it such that in the future we don't have to update the code to handle future years.
 - Expanding on the point above here are the problems now: WQI has to be manually uploaded every month. Drop downs are not updated yearly.
 - It's costly to maintain the server - perhaps there's something internal on the phone directly.
 - "Optimization" 

Error handling
 - Say if we are missing WQI data or data for a Month. As of now our R server crashes without a useful error message. 

Accuracy
 - Current way of unit conversion is a bit weird.
 - We also need to reupload WQIs or at least verify all the numbers are correct with the right weights. 

Proposed solutions to above problems
 - Don't use R. Move to Python instead for data viz. 
 - Don't have API keys in your code. 

After fixing the above problems, to deploy the app:
 - For Android: https://docs.expo.dev/submit/android/
 - For Apple: 
 -- You need a Paid Apple Dev Account (https://developer.apple.com/) - $99/yearly
 -- Pretty recent Mac to build in Testflight
 -- And a few other stuff that Apple requires
 - More info here: https://docs.expo.dev/deploy/submit-to-app-stores/ and https://docs.expo.dev/deploy/build-project/


Future Idea(s) - Stuff not in the App that we don't need for the first build
 - Expanding AI Page
 - Weather and Water Correlation 
 - Add Pace Water Reports 
 - Sharing WQI
 - Relationship of WQI with other parameters. A WQI graph? 

