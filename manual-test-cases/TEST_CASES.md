# Expedia Test Cases

## **Test Case: User Story 1 - Search for a Hotel and Apply Filters**

### **Test Case 1.1: Search for Hotels in a Random City**
- **Preconditions**: User is on the hotel search page.
- **Test Steps**:
  1. Enter "New York" in the search bar.
  2. Click on the search button.
- **Expected Result**: The search results should show hotels in New York.
- **Pass Criteria**: The displayed hotels should be relevant to New York.

### **Test Case 1.2: Select Check-in and Check-out Dates**
- **Preconditions**: User is on the hotel search results page.
- **Test Steps**:
  1. Select a check-in date.
  2. Select a check-out date.
  3. Click on "Apply" or "Search".
- **Expected Result**: The availability of hotels should be updated based on the selected dates.
- **Pass Criteria**: The results should show hotels that are available for the selected dates.

### **Test Case 1.3: Apply "Guest Rating: 8+" Filter**
- **Preconditions**: User is on the hotel search results page.
- **Test Steps**:
  1. Apply the "Very good 8+" filter from the filter options.
  2. Check the updated results.
- **Expected Result**: The search results should only show hotels with a guest rating of 8 or higher.
- **Pass Criteria**: All displayed hotels should have a guest rating of 8 or more.

### **Test Case 1.4: Apply "Stars Rating: 4+" Filter**
- **Preconditions**: User is on the hotel search results page.
- **Test Steps**:
  1. Apply the "4 stars+" filter from the filter options.
  2. Check the updated results.
- **Expected Result**: The search results should only show hotels with a stars rating of 4 or higher.
- **Pass Criteria**: All displayed hotels should have a stars rating of 4 or more.

### **Test Case 1.5: Apply a New Price Range**
- **Preconditions**: User is on the hotel search results page.
- **Test Steps**:
  1. Apply a price range filter between $50 and $250.
  2. Wait for the page to update with the new filter applied.
  3. Retrieve the list of hotel titles displayed after the filter is applied.
  4. Verify that the number of hotels displayed is greater than 0.
  5. Ensure that the price range filter text "$50 to $250" is visible on the page.
- **Expected Result**:
  - The list of hotels should show results that fall within the price range of $50 to $250.
  - The price range filter text "$50 to $250" should be visible.
- **Pass Criteria**:
  - The length of the hotel titles list should be greater than 0, indicating that hotels are filtered by the new price range.
  - The filter text "$50 to $250" should be visible on the page.

### **Test Case 1.6: Apply "Price: low to high" Filter**
- **Preconditions**: User is on the hotel search results page.
- **Test Steps**:
  1. Select the "Price: low to high" option.
- **Expected Result**: The hotels should be reordered based on the lowest price.
- **Pass Criteria**: The hotels should be listed in ascending order of price.

---

## **User Story 2: User Story 2 - Flight Booking with Round Trip Selection**

### **Test Case 2.1: Go to the "Flights" Tab**
- **Preconditions**: User is on the Expedia homepage.
- **Test Steps**:
  1. Click on the "Flights" tab.
- **Expected Result**: The "Flights" section is opened.
- **Pass Criteria**: The "Flights" tab is highlighted and the user is taken to the flight booking section.

### **Test Case 2.2: Select "Roundtrip" Flight Type**
- **Preconditions**: User is on the "Flights" page.
- **Test Steps**:
  1. Select the "Roundtrip" option for flight type.
- **Expected Result**: The "Roundtrip" flight type is selected.
- **Pass Criteria**: The "Roundtrip" option is visibly selected, and the user can select departure and return dates.

### **Test Case 2.3: Perform a Flight Search with Randomly Selected US Cities**
- **Preconditions**: User has selected "Roundtrip" flight type.
- **Test Steps**:
  1. Enter random US cities for departure and destination (e.g., New York and Los Angeles).
  2. Enter random dates for the departure and return.
  3. Click "Search" or "Find Flights".
- **Expected Result**: The system displays flight search results.
- **Pass Criteria**: Flight search results are displayed with available flights.

### **Test Case 2.4: Update Departure and Return Dates**
- **Preconditions**: User is on the flight search results page.
- **Test Steps**:
  1. Update the departure and return dates to new values.
  2. Verify that the list of available flights updates to reflect the new dates.
- **Expected Result**: The flight search results should update according to the new dates.
- **Pass Criteria**: The updated flight list should reflect the new departure and return dates.

### **Test Case 2.5: Verify the Flight Summary Page**
- **Preconditions**: User has navigated to the Flight Summary page.
- **Test Steps**:
  1. Verify that the Flight Summary page loads correctly.
  2. Ensure that the flight details (departure, return dates, and flights) are visible.
  3. Confirm the price summary is displayed.
- **Expected Result**: The Flight Summary page should show all relevant flight details and the price summary.
- **Pass Criteria**: The flight details and price should match the selected flights, and the summary page should load without errors.

### **Test Case 2.6: Attempt to Search for a Flight with Same City for Both Departure and Arrival**
- **Preconditions**: User has selected "Roundtrip" flight type.
- **Test Steps**:
  1. Enter the same city for both departure and destination (e.g., New York for both).
  2. Enter valid dates for departure and return.
  3. Click "Search" or "Find Flights".
- **Expected Result**: The system should not allow the search to proceed.
- **Expected Result**: Appropriate error messages should be displayed, prompting the user to correct the input.
- **Pass Criteria**: The search should not return any results, and the system should prevent searching for a round-trip flight with the same origin and destination.
- **Pass Criteria**: Error messages such as "Departure city cannot be the same as the arrival city" should be visible.

---

## **User Story 3: User Login and Account Profile Update**

### **Test Case 3.1: Navigate to the Login Page and Perform Login**
- **Preconditions**: User is not logged in and is on the home page.
- **Test Steps**:
  1. Open the login page (click on the login button or navigate directly).
  2. Enter valid login credentials (username and password).
  3. Click on the "Login" button.
- **Expected Result**: The user is logged in successfully.
- **Pass Criteria**: No error message, and the login process completes without issues.

### **Test Case 3.2: Navigate to the Account Dashboard**
- **Preconditions**: User is logged in successfully.
- **Test Steps**:
  1. Click on the user profile icon or go to the account section.
  2. Navigate to the account dashboard.
- **Expected Result**: The user is directed to the account dashboard.
- **Pass Criteria**: The dashboard page loads, displaying the user’s account information.

### **Test Case 3.3: Update User's Basic Information (Name)**
- **Preconditions**: User is on the account dashboard page.
- **Test Steps**:
  1. Click on the "Edit Profile" or equivalent option.
  2. Update the user's basic information (e.g., name).
  3. Save the changes.
- **Expected Result**: The user's updated information should reflect on the UI.
- **Pass Criteria**: The updated name should be visible in the profile section.

### **Test Case 3.4: Update User's Contact Information (Phone Number)**
- **Preconditions**: User is on the account dashboard page with access to profile editing.
- **Test Steps**:
  1. Click on the "Edit Profile" or equivalent option.
  2. Update the user's contact information (e.g., phone number).
  3. Save the changes.
- **Expected Result**: The user's updated contact information should be reflected on the UI.
- **Pass Criteria**: The updated phone number should appear in the contact information section of the profile.

### **Test Case 3.5: Sign Out of the Account**
- **Preconditions**: User is logged in and has made profile updates.
- **Test Steps**:
  1. Click on the "Sign Out" or "Log Out" button from the account menu or settings.
- **Expected Result**: The user should be signed out and redirected to the home page or login page.
- **Pass Criteria**: The user should no longer be logged in, and the system should redirect them to the login page or homepage.

### **Test Case 3.6: Verify Login with Empty Email**
- **Preconditions**: User is on the login page.
- **Test Steps**:
  1. Leave the email field empty.
  2. Click on the "Continue" button.
- **Expected Result**: An error message should be displayed indicating that the email field is required.
- **Pass Criteria**: The error message "Please enter your email address." should be visible, and the login should not proceed.

### **Test Case 3.7: Verify Login with Incorrect Password**
- **Preconditions**: User is on the login page.
- **Test Steps**:
  1. Enter a valid email address.
  2. Enter an incorrect password.
  3. Click on the "Login" button.
- **Expected Result**: An error message should be displayed indicating that the password is incorrect.
- **Pass Criteria**: The error message "Email and password don't match. Try again." should be visible, and the login should not proceed.
