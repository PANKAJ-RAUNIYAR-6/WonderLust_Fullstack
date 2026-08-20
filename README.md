# 🌍 Wanderlust

A full-stack travel and accommodation listing web application where users can explore places, create and manage their own listings, add reviews, and view listing locations on an interactive map.

## 🚀 Live Demo

**Live Website:** `https://fullstack-project-wonderlist.onrender.com`

## 📌 About the Project

**Wanderlust** is a full-stack web application inspired by travel and accommodation platforms.

The application allows users to explore different listings and view detailed information such as title, image, owner, description, price, category, country, and location.

Authenticated users can create their own listings, edit or delete the listings they created, and add reviews to listings. Users can also delete only the reviews they have created.

The application uses **Mapbox** for interactive maps and geocoding. Listing locations are converted into geographic coordinates and displayed as markers on the map. Clicking on a marker displays the title of the corresponding listing.

Authentication and authorization are implemented using **Passport.js**, while **MongoDB Atlas** is used for cloud database storage. The application is deployed on **Render**.



## ✨ Features

### 🔐 Authentication & Authorization

* User Sign Up
* User Login
* User Logout
* Authentication using Passport.js
* Authorization for protected actions
* Users can edit only their own listings
* Users can delete only their own listings
* Users can delete only their own reviews
* Unauthenticated users cannot perform protected actions

### 🏡 Listing Management

Users can:

* Create a new listing
* View listing details
* Edit their own listing
* Delete their own listing
* Explore all available listings

Each listing contains:

* 🏷️ Title
* 🖼️ Image
* 👤 Owner
* 📝 Description
* 💰 Price
* 🏷️ Category
* 🌎 Country
* 📍 Location

### ⭐ Review System

* Users can add reviews to listings
* Users can delete reviews they created
* Review ownership is checked before deletion
* Reviews are displayed on the listing details page

### 🗺️ Mapbox Integration

The project uses **Mapbox** for interactive maps.

Features include:

* Listing location geocoding
* Conversion of location into geographic coordinates
* Interactive map for each listing
* Marker for each listing location
* Listing title displayed when clicking on a marker

### 🔎 Explore

* Explore button available in the navigation bar
* Displays all available listings
* Users can browse and explore different listings

### ➕ Add New Listing

* Dedicated **Add New Listing** button
* Logged-in users can create their own listings
* Listing data is stored in MongoDB Atlas

### 💬 Flash Messages

Flash messages are used to provide feedback to users for different actions, such as:

* Successful login
* Successful logout
* Listing creation
* Listing update
* Listing deletion
* Review actions
* Validation or error messages

### 🧾 Display Tax

* Display Tax toggle is available
* Users can toggle the display of tax-related pricing information

### 🎨 User Interface

* Navigation bar
* Login page
* Sign Up page
* Explore page
* Listing details page
* Add listing page
* Edit listing page
* Footer
* Flash messages
* Responsive layout



## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* MongoDB Atlas

### Authentication

* Passport.js
* Express Session

### Maps & Location

* Mapbox
* Mapbox Geocoding

### Other Technologies

* EJS Mate
* Connect-Mongo
* Connect-Flash
* Method-Override

### Deployment

* Render



## 📂 Project Structure

```text
Wanderlust/
├── controllers/     # Application controllers
├── models/          # MongoDB/Mongoose models
├── routes/          # Application routes
├── views/           # EJS templates
├── public/          # CSS, JavaScript, images
├── utils/           # Utility/helper functions
├── init/            # Database initialization
├── middleware.js    # Custom middleware
├── app.js           # Main application file
├── package.json
├── .gitignore
├── .cloudConfig.js
├── .package-lock.json
├── .schema.js
└── README.md


```


## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PANKAJ-RAUNIYAR-6/WonderLust_Fullstack.git
```

### 2. Navigate to the Project

```bash
cd WonderLust_Fullstack
```

### 3. Install Dependencies

```bash
npm install
```

`npm install` automatically installs all the packages listed in `package.json`.

You do **not** need to install every package separately.

### 4. Create a `.env` File

Create a `.env` file in the root directory of the project.

Example:

```env
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloud_api_seceret
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret
MAP_TOKEN=your_mapbox_token
```

### 5. Start the Application

```bash
node app.js
```

The application will run on your configured local port.

```text
http://localhost:8080/listings
```


## 🔑 Environment Variables

The application uses environment variables to store sensitive configuration.

Typical environment variables include:

| Variable      | Description                     |
| ------------- | ------------------------------- |
| `ATLASDB_URL` | MongoDB Atlas connection string |
| `SECRET`      | Session secret                  |
| `MAP_TOKEN`   | Mapbox access token             |
| `CLOUD_NAME`   | Cloudinary cloud name             |
| `CLOUD_API_KEY`   | Cloudinary API key            |
| `CLOUD_API_SECRET`   | Cloudinary API secret             |


```


## 🗄️ Database

Wanderlust uses **MongoDB Atlas** as the cloud database.

The database stores application data such as:

* Users
* Listings
* Reviews
* Listing locations
* Listing ownership information

The application connects to MongoDB Atlas using the MongoDB connection string stored in environment variables.



## 🗺️ How the Map Works

The application uses Mapbox to display the location of each listing.

The basic flow is:

```text
Listing Location
       ↓
   Geocoding
       ↓
Latitude & Longitude
       ↓
   Mapbox Map
       ↓
     Marker
       ↓
Click Marker
       ↓
 Listing Title
```

This allows every listing to have its own location displayed on an interactive map.



## 🔐 Authorization Flow

Wanderlust uses authentication and authorization to protect user actions.

For example:

```text
User Login
    ↓
Passport.js Authentication
    ↓
Authenticated User
    ↓
Create / Edit / Delete
```

For ownership-based actions:

```text
User requests Edit/Delete
          ↓
     Check Login
          ↓
    Check Ownership
          ↓
   Allow / Deny Action
```

This ensures that a user cannot edit or delete another user's listing or review.



## 🧭 Main Pages

### 🏠 Explore Page

Displays all available listings so users can browse different places.

### 🔐 Login Page

Allows existing users to log in.

### 📝 Sign Up Page

Allows new users to create an account.

### ➕ Airbnb Your Home

Allows authenticated users to create a new listing.

### 📄 Listing Details Page

Displays complete listing information including:

* Title
* Image
* Owner
* Description
* Price
* Category
* Country
* Location
* Reviews
* Map

### ✏️ Edit Listing Page

Allows the owner of a listing to update its information.



## 📸 Screenshots

Add screenshots of your project here.

Example:

```markdown
## 📸 Screenshots

### Explore Page

![Explore Page](screenshots/explore.png)

### Listing Details

![Listing Details](screenshots/listing-details.png)

### Map

![Map](screenshots/map.png)

### Login Page

![Login](screenshots/login.png)

### Add Listing

![Add Listing](screenshots/add-listing.png)
```


## 🚀 Deployment

The application is deployed using **Render**.

### Deployment Configuration

Make sure the following are configured in your Render environment:

* MongoDB Atlas connection string
* Session secret
* Mapbox token
* Cloud Name
* Cloud API Key
* Cloud API Secret



## 📦 Running the Project Locally

After cloning the repository:

```bash
npm install
```

Configure your environment variables and then run:

```bash
node app.js
```

That's all that is required to install the project's dependencies because `npm install` reads them from `package.json`.



## 🎯 Project Highlights

* Full-stack CRUD application
* User authentication with Passport.js
* Authorization based on listing/review ownership
* MongoDB Atlas cloud database
* Interactive Mapbox integration
* Location geocoding
* Listing-based map markers
* Review system
* Flash messages
* Explore functionality
* Display Tax toggle
* Render deployment



## 🔮 Future Improvements

Some possible improvements for future versions:

* Advanced search and filtering
* Sort listings by price or rating
* Wishlist/favorite listings
* Booking functionality
* Payment integration
* User profile page
* Image upload and cloud storage
* Pagination for listings
* Improved map-based search
* Email notifications



## 👨‍💻 Author

**Pankaj Rauniyar**

* GitHub: `https://github.com/PANKAJ-RAUNIYAR-6/WonderLust_Fullstack.git`




## 📄 License

This project was created for learning and educational purposes.
