# GreenPlate - Eco-Food Tracker

A web app that helps users track their food's carbon footprint, make sustainable choices, and build eco-friendly eating habits.

## Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dtes-assignment1
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The app will be available at:
- Local: http://localhost:3000
- Network: http://[your-ip]:3000

## Features

- **Scan Meals**: Upload food photos to track CO�e impact
- **Challenges**: Join eco-friendly eating challenges
- **Community Feed**: Share your sustainable food journey
- **Dashboard**: Track progress, streaks, and achievements
- **Explore Deals**: Find discounts on sustainable food options

## Data Storage

The app uses browser localStorage to persist data. To reset:
1. Open Developer Tools (F12)
2. Go to Application/Storage tab
3. Find localStorage � your domain
4. Delete `greenplate-storage` key
5. Refresh the page