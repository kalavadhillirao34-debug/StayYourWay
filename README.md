<div align="center">
  <h1>🏡 Stay Your Way</h1>
  <p><b>A beginner-friendly, full-stack Airbnb clone for discovering and hosting unique stays.</b></p>

  <a href="https://stayyourway.onrender.com/listings"><strong>Explore Live Demo »</strong></a>
  <br><br>
</div>

---

## 📖 About the Project
**Stay Your Way** is a web application where users can browse beautiful holiday rentals, create their own listings, and save their favorite spots. I built this project to learn how real-world applications handle users, databases, and image uploads.

### Why I built this:
* To master **Full-Stack Development** (Frontend + Backend).
* To learn how to store data safely in **MongoDB**.
* To understand how to handle **User Authentication** (Login/Signup).
* To work with **APIs** like Maps and Cloud Storage.

---

## 🌟 Main Features

* **Property Listings:** Anyone can view listings, but only logged-in users can create them.
* **User Accounts:** Secure signup and login system.
* **Wishlist:** Save your favorite homes to your personal "Wishlist" page.
* **Interactive Maps:** See exactly where a property is located using an integrated map.
* **Reviews & Ratings:** Share your experience by leaving a star rating and a comment.
* **Image Uploads:** Upload real photos of your property, which are stored safely in the cloud.
* **Responsive Design:** The website looks great on laptops, tablets, and mobile phones.

---

## 🛠️ Tools Used (The Tech Stack)

### **Frontend (The "Look")**
* **EJS:** For creating dynamic HTML pages.
* **Bootstrap 5:** To make the website look modern and pretty.
* **JavaScript:** To add interactive features.

### **Backend (The "Brain")**
* **Node.js & Express:** The engine that runs the server.
* **MongoDB & Mongoose:** The database used to store all user and property info.
* **Passport.js:** To keep user accounts and passwords secure.
* **Cloudinary:** A service that hosts the images uploaded by users.

---

## 📂 How the Folders are Organized
* `models/` - Defines how our data (users, listings, reviews) looks.
* `routes/` - Tells the website which page to show when you click a link.
* `views/` - Contains the HTML templates for the pages.
* `public/` - Holds the CSS styles and client-side scripts.
* `middleware/` - Safety checks (e.g., "Is this user logged in?").

---

## 🚀 How to Run This Project Locally

If you want to try running this code on your own computer, follow these simple steps:

1.  **Clone the project:**
    ```bash
    git clone [https://github.com/kalavadhillirao34-debug/StayYourWay.git](https://github.com/kalavadhillirao34-debug/StayYourWay.git)
    cd StayYourWay
    ```

2.  **Install the "ingredients" (Dependencies):**
    ```bash
    npm install
    ```

3.  **Setup your Secrets (.env):**
    Create a file named `.env` in the main folder and add your keys (you'll need accounts on MongoDB and Cloudinary):
    ```env
    CLOUDINARY_CLOUD_NAME=your_name
    CLOUDINARY_KEY=your_key
    CLOUDINARY_SECRET=your_secret
    MONGO_URL=your_mongodb_url
    SESSION_SECRET=anything_secret
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    Now, open your browser and go to `http://localhost:8080`!

---

## 👨‍💻 Author
**Kalavadhillirao**
*Aspiring Full-Stack Developer*

* **GitHub:** [@kalavadhillirao34-debug](https://github.com/kalavadhillirao34-debug)

---

<div align="center">
  <b>If you like this project, please give it a ⭐ star! It means a lot to me.</b>
</div>
