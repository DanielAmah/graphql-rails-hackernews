
export const jsonwebtoken = (props) => {
  if(window.localStorage.getItem("email")){
    const email = window.localStorage.getItem("email")

      const loggedInUser = email
      return loggedInUser;

    }else {
      const loggedInUser = ''
      return loggedInUser;
    }

}
