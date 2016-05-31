
var userLoggedIn = {};

module.exports = {
	userLoggedIn: userLoggedIn,
	saveLoggedInUser: function(userObject){
		userLoggedIn.username = userObject.username;
		userLoggedIn.Id = userObject._id;
		console.log("User " + userLoggedIn.username + " is logged in!" );
	},
	clearUser: function(){
		console.log("Logging out user ");
		userLoggedIn.username = null;
		userLoggedIn.Id = null;
		if(!userLoggedIn.username) {
			console.log("No current user." );
		} else {
			console.log("Something went wrong.");
		}
		

	}

};