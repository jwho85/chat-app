# chat-app

The objective of this project is to build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.  

## Directions for creating this app

-Install expo

`npm install expo-cli --global`

-Create a new Expo project

`expo init [project name]`

-Go the the project directory

`cd [project name]`

-Start Expo

`npm start` or `expo start`

-Install React Navigation

`npm install --save react-navigation`

-Install React Navigation dependencies

`npm install @react-navigation/native @react-navigation/stack`
`expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

-Android Studio

Step 1: Download Android Studio<br />
Step 2: Set Up Android Emulator<br />
Step 3: Configure Android Studio from the Welcome Screen<br />
Step 4: Virtual Device Manager<br />
Step 5: Start Your Emulator

-Install Gifted Chat

`npm install react-native-gifted-chat --save`

-Setup Firestore for React Native

`npm install --save firebase@7.9.0`

-The Firestore credentials should look like this in the code (input your own):

const firebaseConfig = {
    apiKey: "AIzaSyCYhM7ZWoVZLLUD5xzpcepyID3B5w1sfuE",
    authDomain: "test-8b82a.firebaseapp.com",
    databaseURL: "https://test-8b82a.firebaseio.com",
    projectId: "test-8b82a",
    storageBucket: "test-8b82a.appspot.com",
    messagingSenderId: "202131758796"
  }

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }

-Install AsyncStorage

`expo install @react-native-async-storage/async-storage `

-Install NetInfo

`expo install @react-native-community/netinfo`

-Install the ImagePicker API and the Permissions API

`expo install expo-permissions`
`expo install expo-image-picker`

-Install Expo Location and React Native Maps

`expo install expo-location`
`expo install react-native-maps`

-Store Images in Google Firebase Storage




















