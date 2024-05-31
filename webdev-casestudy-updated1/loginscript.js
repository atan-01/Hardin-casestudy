var attempt = 0;
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("pass").value;

    if (username == "nathaniel@gmail.com" && password == "1234"){
        window.location.href = "gardening.html";
        return true;
    }   else {
        attempt ++;
            if (attempt == 3){
                alert("Cannot login. Attempts exceeded!")
                document.getElementById("login").disabled = true;
                document.getElementById("username").disabled = true;
                document.getElementById("pass").disabled = true;
                document.getElementById("username").value = null;
                document.getElementById("pass").value = null;
            return false;
            }
            else {
                alert("Incorrect username or password.")
            }
    }
}
