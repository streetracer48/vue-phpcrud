var app = new Vue({
	el: "#root",
	data: {
		showingAddModal: false,
		showingEditModal: false,
		showingDeleteModal: false,
		errorMessage:"",
		successMessage:"",
		users:[],
		newUser: {username: "", email: "", mobile: ""},
		clickUser:{}
	},

	mounted: function(){
		console.log("mounted");
		this.getAllUsers();
	},

	methods: {
		getAllUsers:function()
		{
			axios.get("http://localhost/www/vue-phpcrud/api.php?action=read")
.then(function(response)
{
	if(response.data.error)
	{
		app.errorMessage = response.data.message;
	}
	 else
	{
app.users = response.data.users;
	}
});

},
saveUser: function(){
//  console.log('sdadsad');
	//console.log(app.newUser);
	var formData = app.toFormData(app.newUser);

	axios.post("http://localhost/www/vue-phpcrud/api.php?action=create", formData)
	.then(function(response){

		app.newUser = {username: "", email: "", mobile: ""};

		if(response.data.error){
			app.errorMessage = response.data.message;
		} else{
			app.successMessage = response.data.message;
			app.getAllUsers();
		}
	});
},

updateUser: function(){
	//  console.log('sdadsad');
		//console.log(app.newUser);
		var formData = app.toFormData(app.clickUser);

		axios.post("http://localhost/www/vue-phpcrud/api.php?action=update", formData)
		.then(function(response){

			app.clickUser = {};

			if(response.data.error){
				app.errorMessage = response.data.message;
			} else{
				app.successMessage = response.data.message;
				app.getAllUsers();
			}
		});
	},
	deleteUser: function(){
		//  console.log('sdadsad');
			//console.log(app.newUser);
			var formData = app.toFormData(app.clickUser);

			axios.post("http://localhost/www/vue-phpcrud/api.php?action=delete", formData)
			.then(function(response){

				app.clickUser = {};

				if(response.data.error){
					app.errorMessage = response.data.message;
				} else{
					app.successMessage = response.data.message;
					app.getAllUsers();
				}
			});
		},
selectUser(user)
{
	console.log(user);
    app.clickUser = user;


},

toFormData: function(obj){
	var form_data = new FormData();
	  for ( var key in obj ) {
		  form_data.append(key, obj[key]);
	  }
	  return form_data;
},

clearMessage: function(){
	app.errorMessage = "";
	app.successMessage = "";
}

	}
});