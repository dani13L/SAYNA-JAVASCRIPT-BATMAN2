window.onload=()=>{
    let myForm=document.getElementById("myForm");
    myForm.addEventListener('submit',function(e){
        e.preventDefault();
        let email = document.getElementById('email');
        if(email.value==''){
            let invalid=document.getElementById('invalid');
            invalid.innerHTML='Le champ email ne peut pas être vide';
            invalid.style.color='red';
        }else{
            let invalid=document.getElementById('invalid');
            invalid.innerHTML='';
            document.getElementById('popupboxs').style.display='block';
        }
       
    });
}