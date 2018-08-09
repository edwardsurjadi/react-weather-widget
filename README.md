# Frontend Development Test

## Task: Weather Widget Builder

### Requirements
- npm 5.6.0
- node 8.11.3
- react 16
- enzyme
- chrome browser (geolocation does not work with non-https site on safari)

### Guidelines
- run "npm install" to install the required modules
- run "npm run watch-css" to compile the css
- run "npm test" to run the unit test
- run "npm start" to run the website

### Comments
This is a very humble widget weather that fetch weather information from Open Weather API and displays it in a beautiful small widget which is configurable.

- This project is done using React to put my React knowledge on practice

- As much as possible ES6 syntaxes are used to promote readability and consistency with industry standard

- SASS is used for pre-processor as it promotes CSS modularity and repetition

- Unit Testing using enzyme

- The application consists of 2 React components, with reusability in mind. First is the setting component (
WidgetForm) and the widget itself (WidgetViewer)

- Promise is used to avoid nested callback to promote code readability

- Bootstrap CSS is not used for this simple project so it gives more liberation on writing stylesheets


### Assumptions
- Weather icons are fetched from the open weather website (http://openweathermap.org/img/w/${weatherIcon}.png), hence the resolution is a bit low compared to the original requirement

- When user changes the temperature unit (metric or imperial), it will fetch the weather information from the Open Weather API by passing the unit in the parameter.

- When passing metric unit, Open Weather API returns wind speed in meter/sec, it is then converted in the code to be km/h to fit with the requirement

- Location information (town) is fetched from the name object returned from the Open Weather api

- When user choose to disable the wind, the wind information on the widget will be hidden

- The design is responsive, and will become one column if the screen shrink or viewed from mobile device

- Open Weather API account is created for this demo purpose with some calls frequency limitation. API KEY is e756356c32b01ec9e09d4b3bd166a841

### Improvements
As it is a very humble widgets. There are still improvements to be made in the future:
- Fetching geolocation data does not work with all browser
- Fetching geolocation data takes several seconds, so when user changes the temperature, for example there will be several seconds delay before the widget is refreshed
- Icons are still in low resolution
