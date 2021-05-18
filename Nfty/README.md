<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>



## 🚀 How to use

#### Setup

- Install node js if you don't have it already. To check, in terminal do `node -v`
- Then using `npm` from node, install Yarn: `npm install -g yarn` 
- Install dependencies for the project: `yarn install` and `npm install`
- Create an environment document from the example: `cp .env.example .env`
- Download metamask crypto wallet for chrome *and* on your phone. (Right now, the web application requires a phone wallet.) 
 
#### To Run

- `yarn run web # ios, android` 
- Issues: If you get an module not found error for '../artificats/contracts' then run `npx hardhat compile` 
- Note: ios and android simulators can't connect to a metamask wallet, because metamask isn't on your simulator phone. 

#### To edit
- Active code for the app lives `frontend/App.tsx` 
- TypeScript is a superset of JavaScript which gives you static types and powerful tooling in Visual Studio Code including autocompletion and useful inline warnings for type errors.


## 📝 Notes

- [Download Node JS](https://nodejs.org/en/download/)
- [Metamask](https://docs.expo.io/versions/latest/guides/typescript/)
- Generated from [create-react-native-dapp](https://github.com/cawfree/create-react-native-dapp)
