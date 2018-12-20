const jwtDecode = require('jwt-decode');

export const jsonwebtoken = (props) => {
  if(window.localStorage.getItem("jwt-token")){
    const token = window.localStorage.getItem("jwt-token")
    try {
      const loggedInUser = jwtDecode(token)
      return loggedInUser;
    } catch(error) {
      const loggedInUser = {}
      return loggedInUser;
    }
    }else {
      const loggedInUser = {}
      return loggedInUser;
    }

}
