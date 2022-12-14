function saveToLocalStorage(event) {

    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;

    const obj = {
        name,
        email,
        phonenumber
    }
    //localStorage.setItem(obj.email, JSON.stringify(obj))
    axios.post("https://crudcrud.com/api/496a4298dc184d40bb348179ac7d8db9/appointmentData",obj)
    .then((response)=>{
        showNewUserOnScreen(response.data);
    })
    .catch((err)=>console.log(err))
}


window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/496a4298dc184d40bb348179ac7d8db9/appointmentData")
    .then((response)=>{
    
         for(var i=0;i<response.data.length;i++){
            showNewUserOnScreen(response.data[i]);
         }
    })
    .catch((err)=>console.log(err))
    
})

function showNewUserOnScreen(user){
    
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phonenumber').value ='';
    // console.log(localStorage.getItem(user.emailId))
    // if(localStorage.getItem(user.email) !== null){
    //     removeUserFromScreen(user.email)
    //}

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user._id}> ${user.name} - ${user.email} - ${user.phonenumber}
                            <button onclick=deleteUser('${user._id}')> Delete User </button>
                            <button onclick=editUserDetails('${user._id}','${user.email}','${user.name}','${user.phonenumber}')>Edit User </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User

function editUserDetails(userId,emailId, name, phonenumber){

    document.getElementById('email').value = emailId;
    document.getElementById('username').value = name;
    document.getElementById('phonenumber').value =phonenumber;

    deleteUser(userId)
 }

// deleteUser('abc@gmail.com')

function deleteUser(userID){

    axios.delete(`https://crudcrud.com/api/496a4298dc184d40bb348179ac7d8db9/appointmentData/${userID}`)
    .then((response)=>{
        removeUserFromScreen(userID);
    })
    .catch((err)=>console.log(err))

}

function removeUserFromScreen(userID){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(userID);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}

//PUT


