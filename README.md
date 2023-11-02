# BISful API Usage Dashboard

Bisful is a React application that enables users to view and monitor Best In Slot API key usage. It fetches data from internal API and displays the usage details of each API key in a user-friendly interface. The application comprises two main components: `ApiKeyDetails` and `ApiKeyList`.

## Features

- **ApiKeyList.tsx**: Lists all API keys available to the user. Each key is clickable and redirects to the detailed usage view of that specific API key.
- **ApiKeyDetails.tsx**: Displays detailed usage information of a selected API key. It showcases both daily and monthly usage limits, along with other related information. Additionally, it visualizes the usage data using a bar chart.

## Libraries Used

- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: For handling routing within the application.
- **Chart.js**: An open-source JavaScript library for rendering charts.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/bisful.git
   cd bisful

2. **Install dependencies:**

    ```bash
    npm install

3. **Start the development server:**
    ```bash
    npm start
