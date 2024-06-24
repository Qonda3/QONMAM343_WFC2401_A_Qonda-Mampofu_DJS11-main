# 🎵 PODCAST APP | PORTFOLIO PIECE 💿

Welcome to the Podcast Application! This project allows users to explore, manage, and enjoy various podcasts. The application features a user login system, a protected route system, and various components to display podcast details, favorites, and more.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Technology](#technology)
* [Data](#data)
* [Contributing](#contributing)

## Installation

Follow these steps to get the project up and running on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/podcast-app.git
   cd podcast-app
2. **Install dependencies:**
   ```bash
   npm install
3. **Start the development server:**
   ```bash
   npm start
The application will be available at http://localhost:3000.

## Usage

Once the application is running, you can navigate through the following routes:

- /login: User login page.
- /: Protected route displaying the main dashboard with a sidebar and preview grid of podcasts.
- /show/:id: Protected route displaying detailed information about a specific podcast show.
- /favorites: Protected route displaying the user's favorite podcasts.

## Features

- User Login: Login users can access the main dashboard, show details, and favorites pages.
- Podcast Previews: Display a grid of podcast previews on the main dashboard.
- Show Details: View detailed information about a specific podcast show eg. Seasons, Episodes.
- Favorites: Manage and view favorite podcasts.
- Responsive Design: Ensures compatibility across various devices and screen sizes.

## Technology

This project is built with the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for routing in React applications.
- **CSS**: For styling components.
- **LocalStorage**: To manage user authentication state.

## Data

The data model consists of three basic semantic units:

- **SHOW**: A specific podcast that contains one or several seasons.
- **SEASON**: A collection of episodes released over a specific timespan.
- **EPISODE**: A specific MP3 file that users can listen to.

Additional information exposed via the API includes:

- **PREVIEW**: A summarized version of a show containing basic information.
- **GENRE**: Information related to one of many genres that can be assigned to a show.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

1. **Fork the repository.**
2. **Create a new branch:**

   ```bash
   git checkout -b feature-name
3. **Make your changes and commit them:**

   ```bash
   git commit -m 'Add some feature'
4. **Push to the branch:**

   ```bash
   git push origin feature-name
5. **Open a pull request.**

