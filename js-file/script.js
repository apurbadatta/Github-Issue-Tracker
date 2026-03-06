document.getElementById("signin-btn").addEventListener("click", function () {
  const usernameInput = document.getElementById("username-input");
  const userName = usernameInput.value;
//   console.log(userName);
  const passwordInput = document.getElementById("password-input");
  const passWord = passwordInput.value;
//   console.log(passWord);
// Username: admin
// Password: admin123
if (userName== "admin" && passWord=="admin123" ){
    alert("sign in Success");
    window.location.assign("../home.html")
}else( 
alert("sign in Failed")
);
return;

});
