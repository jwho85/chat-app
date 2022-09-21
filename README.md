# chat-app

The objective of this project was to build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.  

## Tech

<ul>
<li>Expo</li>
<li>React Navigation</li>
<li>Gifted Chat</li>
<li>Firestore</li>
<li>AsyncStorage</li>
<li>NetInfo</li>
<li>Expo Permissions</li>
<li>Expo Image Picker</li>
<li>Expo Location</li>
<li>React Native Maps</li>
</ul>

## Dependencies

"@expo/react-native-action-sheet": "^3.13.0",<br>
"@react-native-async-storage/async-storage": "~1.17.3",<br>
"@react-native-community/masked-view": "^0.1.11",<br>
"@react-native-community/netinfo": "8.2.0",<br>
"@react-navigation/native": "^6.0.11",<br>
"@react-navigation/stack": "^6.2.2",<br>
"cookies": "^0.8.0",<br>
"expo": "~45.0.0",<br>
"expo-image-picker": "~13.1.1",<br>
"expo-location": "~14.2.2",<br>
"expo-permissions": "~13.2.0",<br>
"expo-status-bar": "~1.3.0",<br>
"firebase": "^7.9.0",<br>
"react": "17.0.2",<br>
"react-dom": "17.0.2",<br>
"react-native": "0.68.2",<br>
"react-native-gesture-handler": "~2.2.1",<br>
"react-native-gifted-chat": "^1.0.4",<br>
"react-native-maps": "0.30.2",<br>
"react-native-reanimated": "~2.8.0",<br>
"react-native-safe-area-context": "4.2.4",<br>
"react-native-screens": "~3.11.1",<br>
"react-native-web": "0.17.7",<br>
"react-navigation": "^4.4.4"

## Get Started

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

-Install Expo Permissions and Expo Image Picker

`expo install expo-permissions`
`expo install expo-image-picker`

-Install Expo Location and React Native Maps

`expo install expo-location`
`expo install react-native-maps`

-Store Images in Google Firebase Storage




















