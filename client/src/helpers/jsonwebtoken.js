export const jsonwebtoken = () => {
  let loggedInUser;
  if (window.localStorage.getItem("email")) {
    const email = window.localStorage.getItem("email");

    loggedInUser = email;
  }
  return loggedInUser;
};

export default jsonwebtoken;
