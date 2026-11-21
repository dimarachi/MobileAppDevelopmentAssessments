# Volunteam App

## About the project

Volunteam is a mobile app, built with React Native and Expo, that connects volunteers with local events.

The goal of the app is to make it easy to find events that need help nearby, and to create new events that need volunteers.

With the app, users can:

- Log in with their email and password.
- See upcoming events on a map. The marker color shows if the user has already volunteered (blue), if the team is full (grey) or if the event still needs volunteers (orange).
- See the details of an event, share it, get directions to it and call or text the organizer.
- Add a new event by choosing its location on the map and filling in its name, description, number of volunteers, date, time and picture.
- See the events saved on the device when there is no internet connection.

## Setting up the development environment

### Requirements

- [Node.js](https://nodejs.org/) (LTS version) and npm
- [Git](https://git-scm.com/)
- The [Expo Go](https://expo.dev/go) app on your phone, or an Android emulator / iOS simulator
- A free account on [freeimage.host](https://freeimage.host/signup) to upload pictures

### 1. Clone the repo and install the dependencies

```
git clone <repo-url>
cd SODV2453_Volunteam_App
npm install
```

### 2. Set up the fake API (json-server)

The app uses [json-server](https://github.com/typicode/json-server) with `json-server-auth` as a fake API. The data is saved in the `db.json` file at the root of the project.

Get your computer's IP address and update the `baseURL` in `src/services/api.ts`:

```ts
baseURL: 'http://your_ip_address_here:3333',
```

Your phone and computer must be connected to the same network.

To access your server online without running json-server locally, you can set your baseURL to:

```
https://my-json-server.typicode.com/<your-github-username>/<your-github-repo>
```

To use `my-json-server`, make sure your `db.json` is located at the repo root.

### 3. Set up the image upload API

The app uploads event pictures to the [freeimage.host API](https://freeimage.host/page/api). You can use any hosting service of your preference by updating `src/services/imageApi.ts`.

Sign up for free at https://freeimage.host/signup, get your API key and add it to a `.env` file in the root folder:

```
FREEIMAGE_API_KEY=insert_your_api_key_here
```

The `.env` file is ignored by Git, so your key is not shared.

When creating your app build or publishing, import your secret values to EAS running:

```
eas secret:push
```

## Running the application

### 1. Start the fake API

In one terminal, run:

```
npx json-server --watch db.json --port 3333 --host your_ip_address_here -m ./node_modules/json-server-auth
```

### 2. Start the app

In another terminal, run:

```
npm start
```

Then:

- Scan the QR code with the Expo Go app (Android) or the Camera app (iOS), or
- Press `a` to open the app in an Android emulator, or `i` to open it in an iOS simulator.

You can also run `npm run android` or `npm run ios` to open the app directly on an emulator or simulator.

### Running the tests

```
npm test
```
