# RideWave : Your Trusted Ride-Sharing Platform 🚗

RideWave connects passengers with drivers for fast, reliable, and safe transportation. Whether traveling across town or embarking on a longer journey, RideWave ensures a smooth and comfortable experience.

---

## Features  

### For Passengers:  
- Seamless ride booking by entering pickup and drop-off locations.  
- Real-time driver tracking with live maps.  
- Secure, cashless payments through the app.  
- Access to ride history and detailed receipts.  

### For Drivers:  
- Flexibility to accept or reject ride requests.  
- Real-time navigation with integrated maps.  
- An earnings dashboard for tracking completed rides.  
- A rating system to attract more passengers.  

### For Admins:  
- Manage users and rides for a smooth and safe experience.  
- Real-time insights into rides, payments, and user activity.  

---

## How It Works  

1. Sign up as a passenger or driver and complete your profile.  
2. Passengers enter pickup and destination details to request a ride.  
3. Nearby drivers receive the request. Once accepted, passengers can track the ride in real-time.  
4. After the ride, payment is made securely, and both parties can rate their experience.  
5. Admins oversee operations to ensure quality and resolve any issues.  

---

# High-Level Design  

## 1) Riders can input their pickup and destination to get a fare estimate.  

The first thing that users will do when they open the app to request a ride is search for their desired destination. At this point, the client will make a request to our service to get an estimated price for the ride. The user will then have a chance to request a ride with this fare or do nothing.

Lets lay out the necessary components for communicating between the client and our microservices, adding our first service, “Ride Service” which will handle fare estimations

![High-Level Design Diagram](link-to-diagram-image)

### Core Components  

- **Rider Client**: The user-facing app on iOS and Android for seamless interaction with backend services.  
- **API Gateway**: Routes client requests to microservices, handling authentication and rate limiting.  
- **Ride Service**: Calculates fare estimates using third-party mapping APIs and the pricing model.  
- **Third-Party Mapping API**: Provides distance and travel time data.  
- **Database**: Stores fare details, including estimated prices and ETAs.  

---

### Fare Estimation Workflow  

1. The rider enters their pickup and destination in the app. The request is sent to the backend via `/fare`.  
2. The API Gateway authenticates and forwards the request to the Ride Service.  
3. The Ride Service queries the mapping API to calculate distance and travel time, applies pricing, and creates a Fare entity in the database.  
4. The API Gateway forwards the fare details back to the app for the rider to review and confirm.  


## 2) Riders should be able to request a ride based on the estimated fare

Once a user reviews the estimated fare and ETA, they can request a ride. By building upon our existing design, we can extend it to support ride requests pretty easily.

We don't need to add any new entities at all, we just need to add a Ride table to our Database.

![High-Level Design Diagram](link-to-diagram-image)

### Handling a Ride Request  

When a user confirms a ride request, the system processes it as follows:  

1. User Confirmation:  
   -- The user confirms their ride request in the client app.  
   -- The app sends a `POST` request to the backend system with the ID of the Fare they are accepting.  

2. API Gateway:  
   -- The API Gateway authenticates the request and applies rate limiting as needed.  
   -- The request is forwarded to the Ride Service.  

3. Ride Service:  
   -- Receives the request and creates a new entry in the **Ride** table.  
   -- Links this entry to the relevant Fare that was accepted.  
   -- Initializes the Ride’s status as **requested**.  

4. Driver Matching:  
   -- The Ride Service triggers the **matching flow** to assign a driver to the ride. (Details on driver matching follow below.)  

## 3) Upon request, riders should be matched with a driver who is nearby and available
Now we need to introduce some new components in order to facilitate driver matching.

1. **Driver Client**: In addition to the Rider Client, we introduce the Driver Client, which is the interface for drivers to receive ride requests and provide location updates. The Driver Client communicates with the Location Service to send real-time location updates.
2. **Location Service**: Manages the real-time location data of drivers. It is responsible for receiving location updates from drivers, storing this information in the database, and providing the Ride Matching Service with the latest location data to facilitate accurate and efficient driver matching.
3. **Ride Matching Service**: Handles incoming ride requests and utilizes a sophisticated algorithm (abstracted away for the purpose of this interview) to match these requests with the best available drivers based on proximity, availability, driver rating, and other relevant factors.

![High-Level Design Diagram](link-to-diagram-image)

### Ride Request and Driver Matching Workflow  

Let's walk through the sequence of events that occur when a user requests a ride and the system matches them with a nearby driver:  

1. User Confirms Ride Request  
-- The user confirms their ride request in the client app, which sends a `POST` request to the backend system with the ID of the fare they are accepting.  

2. API Gateway Processing  
-- The API Gateway performs necessary authentication and rate limiting before forwarding the request to the Ride Matching Service.  

3. Ride Object Creation  
-- A ride object is created (as described earlier), and the matching workflow is triggered.  

4. Driver Location Updates  
-- Drivers continuously send their current location to the Location Service. This service updates the database with the drivers' latest latitude and longitude, ensuring we always know their real-time position.  

5. Matching Workflow Execution  
-- The matching workflow uses these updated locations to query for the closest available drivers, attempting to find the most optimal match for the ride request.  


## 4) Drivers should be able to accept/decline a request and navigate to pickup/drop-off
Once a driver is matched with a rider, they can accept the ride request and navigate to the pickup location.

We only need to add one additional service to our existing design.

1. **Notification Service**: Responsible for dispatching real-time notifications to drivers when a new ride request is matched to them. It ensures that drivers are promptly informed so they can accept ride requests in a timely manner, thus maintaining a fluid user experience. Notifications are sent via APN (Apple Push Notification) and FCM (Firebase Cloud Messaging) for iOS and Android devices, respectively.

![High-Level Design Diagram](link-to-diagram-image)

### Driver Accepts Ride Request and Completes the Ride  

1. Driver Notification  
-- After the Ride Matching Service determines the ranked list of eligible drivers, it sends a notification to the top driver on the list via APN or FCM.  

2. Ride Request Acceptance  
-- The driver receives a notification that a new ride request is available.  
-- They open the Driver Client app and accept the ride request, sending a `PATCH` request to the backend system with the `rideID`.  
   -- If the driver declines the ride, the system sends a notification to the next driver on the list.  

3. API Gateway Processing  
-- The API Gateway receives the request and routes it to the Ride Service.  

4. Ride Status Update  
-- The Ride Service updates the ride status to "accepted" and assigns the driver to the ride.  
-- The service returns the pickup location coordinates to the Driver Client.  

5. Driver Navigation  
-- The driver uses the provided coordinates and their client GPS to navigate to the pickup location.  


---

## Why Choose RideWave?  

- Quick connections to nearby drivers.  
- Real-time tracking for peace of mind.  
- Convenient, secure payments.  
- A transparent rating system for trust and quality.  
- Available 24/7, whenever you need a ride.  

---

## References

- [Visit HelloInterview - System Design of Uber/Ride Share](https://www.hellointerview.com/learn/system-design/answer-keys/uber)
- [System Design Sketch](https://okso.app/showcase/system-design/page/3033cade-7fcb-420a-0937-64245b7a1dc4)


## Contact  

For support or feedback, email us at: [harshninave32@gmail.com](mailto:harshninave32@gmail.com)  

We look forward to making your rides safe, comfortable, and efficient.  