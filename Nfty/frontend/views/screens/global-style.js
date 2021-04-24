const React = require("react-native");
import { StyleSheet} from "react-native"

/**
 * Global Style Object
 * 
 * Reusable style definitions
 */

// export const globalStyle = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
	
// });

export const AppStyles = {
	color: {
	  main: "#5ea23a",
	  text: "#696969",
	  title: "#464646",
	  subtitle: "#545454",
	  categoryTitle: "#161616",
	  tint: "#ff5a66",
	  description: "#bbbbbb",
	  filterTitle: "#8a8a8a",
	  starRating: "#2bdf85",
	  location: "#a9a9a9",
	  white: "white",
	  facebook: "#4267b2",
	  grey: "grey",
	  greenBlue: "#00aea8",
	  placeholder: "#a0a0a0",
	  background: "#f2f2f2",
	  blue: "#3293fe"
	},
	fontSize: {
	  title: 30,
	  content: 20,
	  normal: 16
	},
	buttonWidth: {
	  main: "70%"
	},
	textInputWidth: {
	  main: "80%"
	},
	borderRadius: {
	  main: 25,
	  small: 5
	}
  };

export const globalStyle = {
	container: {
		flex: 1,
		alignItems: "center"
	},
containerView: {
  flex: 1,
},
loginScreenContainer: {
  flex: 1,
},
body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
logoText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 150,
  marginBottom: 30,
  textAlign: 'center',
},
loginFormView: {
  flex: 1
},
loginFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,

},
loginButton: {
  backgroundColor: '#3897f1',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
},
fbLoginButton: {
  height: 45,
  marginTop: 10,
  backgroundColor: 'transparent',
},
loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
};