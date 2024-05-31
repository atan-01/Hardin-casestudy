function submitmessage(event){
    event.preventDefault();

    const name = document.getElementById('name');
    const subject = document.getElementById('subject');
    const message = document.querySelector('.message')

    name.value ='';
    subject.value ='';
    message.value='';

    alert('Your message has been sent to the department. Thankyou!');
}

function logout(){
    window.location.href = "index.html";
}