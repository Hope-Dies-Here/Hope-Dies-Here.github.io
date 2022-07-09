
const u = document.getElementById('username')
const p = document.getElementById('password')
const button = document.getElementById('submit')


const startingLocation = window.location.pathname




// function updateUsername(d) {
//     username.value = d
// }

// function updatePassword(d) {
//     password.value = d
// }

 



button.addEventListener('click', async () => {
    username = u.value
    password = p.value
    const data = { username, password }
    
    const sendThis = {
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
    }

    const response = await fetch('/login', sendThis)
    let res = await response.json();

    if(res.status) {
        console.log('Ur Logged in')
        window.location = 'index.html'
        
    } else{
        alert('wrong password')
        console.error('passworrd error')
    }
})




