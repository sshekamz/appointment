function saveToLocalStorage(event) {

    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;

    
    // localStorage.setItem('name', name);
    // localStorage.setItem('email', email);
    // localStorage.setItem('phonenumber', phonenumber)
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
    if(localStorage.getItem(user.email) !== null){
        removeUserFromScreen(user.email)
    }

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user.email}> ${user.name} - ${user.email}
                            <button onclick=deleteUser('${user.email}')> Delete User </button>
                            <button onclick=editUserDetails('${user.email}','${user.name}','${user.phonenumber}')>Edit User </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User

function editUserDetails(emailId, name, phonenumber){

    document.getElementById('email').value = emailId;
    document.getElementById('username').value = name;
    document.getElementById('phonenumber').value =phonenumber;

    deleteUser(emailId)
 }

// deleteUser('abc@gmail.com')

function deleteUser(emailId){
    console.log(emailId)
    localStorage.removeItem(emailId);
    removeUserFromScreen(emailId);

}

function removeUserFromScreen(emailId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(emailId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
