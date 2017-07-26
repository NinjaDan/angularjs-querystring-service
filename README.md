# angularjs-querystring-service
A querystring service that allows for easy manipulation of the querystring using the *#!* pattern for non "HTML5 mode" applications. 
Complete with unit tests using Jasmine and documentation using ngdocs

## Usage
Simply give the module the name of you AngularJS application, then inject the ```querystring``` service 
as a dependancy into your controller into your controller and use one of the 4 methods available.


### getParam(key)
Gets a querystring value based on the key passed in.

**Example:**  
Given the URL ``` https://www.danielalvares.com/projects/?pid=1-11NAVKX ```   
``` querystring.getParam(pid) ```   
returns the value of the specified parameter **pid=1-11NAVKX**


### setParam(key, value)
Sets (or resets) a querystring key/value pair, appending after the '/#!/?' (if necessary) to prevent page refresh

**Example:**  
Given the URL ``` https://www.danielalvares.com/projects/ ```   
``` querystring.setParam('results', '22') ```   
updates the URL in the address bar & returns the new absolute URL **https://www.danielalvares.com/projects/#!/?results=22


### addParam(key, value)
ADDS to a value to a parameter in the querystring (separated by a '/' ). If the key does not exist, it will append it to the URL.

**Example:**  
Given the URL ``` https://www.danielalvares.com/projects/ ```   
``` querystring.addParam('category', '1'); ```
``` querystring.addParam('category', '2'); ```
updates the URL in the address bar & returns the new absolute URL **https://www.danielalvares.com/projects/#!/?category=1/2


### removeParam(key, value)
Removes a value from a key, a key/value pair or a entire querystring, depending what is 

**Example:**  
Given the URL ``` https://www.danielalvares.com/projects/#!/?category=1/2 ```   
``` querystring.removeParam('category', '1'); ```
updates the URL in the address bar & returns the new absolute URL **https://www.danielalvares.com/projects/#!/?category=1


