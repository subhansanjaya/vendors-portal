# Vendors-Portal

> This is a simple app built to connect clients with vendors offering services. 

Booking Engine Flow -
1. Select a number square feet
2. Select the service or services
3. Enter the client address
4. Show date picker to select the date
5. Based on the selected date, show the available time slots (8 am to 5 pm) in 30 min sections
Based on the previous orders set to the Vendors the slots would be available or not.

Booking Engine Rules -
1. When a day starts all Vendor are free and will not have any travel time.
2. From the second booking onwards, Vendor should only be booked if the distance of the Client
is reachable after the previous job is completed.

- BEM CSS methodology is followed. 
- Bootstrap is used as parent theme.
- Google Maps and Distance Matrix APIs used to find locations and calculate travel time.
- Handlebars used as a template engine. React with Redux or any other front-end framework or library can be used.
- Bootstrap Material Design UI KIT can be used to design the steps wizard.

## Build Setup

``` bash
# Update database settings on config/database.js e.g. mongodb+srv://root:root@cluster.mongodbTo/booking-engine?retryWrites=true&w=majority
# Update apiKey on apps.js with Google maps and Distance Matrix APIs -

# Install required packages
npm install 

# To run the app
nodemon
