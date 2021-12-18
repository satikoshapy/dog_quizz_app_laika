// hardcoded users that are allowed to log in =)
let users = [
    {
       id: "Jason",
       email: "hello@test.com",
       password: "welcome123"
    }
   ,
   {   
       id: "Bjorn",
       email: "bye@test.com",
       password: "welcome111"
    }
   
];
//check if submit button exists and if clicked, call the function validate user
if (document.getElementById('submit')) {
   const submit = document.getElementById('submit');
   submit.addEventListener('click', (e) => {
       e.preventDefault();
       validateUser();
   })
}

//check if the user inside the users array
const validateUser = () => {
   let email = document.getElementById("inputEmail").value;
   let password = document.getElementById("inputPassword").value;
   //save the value of the user name in a var so we can later use it in secure.html
   //let userName = document.getElementById("name").value;

   console.log(email);
   console.log(password);

   //lets loop through the users array so we can check if we can grant the access to the user
   for (let user of users){
       if(user.email == email && user.password == password){
           //if the user email and password match with any item inside the users array
           //redirect the page to secure.html
           setTimeout(() => {
            window.location.href = "quiz.html";
            console.log("yay")
            //save the user name to session storage so we can use it on secure.html
           sessionStorage.setItem("userName", JSON.stringify(user.id));
           },1000)    
           
           
       } else {
           // else acces denied
           setTimeout(function(){
               alert('access denied');
           }, 3000)
           
       }
   }       
   
}

const urlArr = window.location.pathname.split("/");//lets make the current page into an array
/// if the user is on secure.html say Hello and their name
if (urlArr[urlArr.length - 1] == "quiz.html"){
    //fetching the saved user name from the sessionstorage
    let userName = JSON.parse(sessionStorage.getItem('userName'))
    if(document.querySelector("h2")){
        //say hello to our user
        document.querySelector("#userSays").innerHTML =  userName;
        
    }
}
let count = 0;
        /*let startBtn = document.getElementById("start-btn");
        startBtn.addEventListener("click", function(e){
            e.preventDefault();
            console.log("button pressed")
            getDogs();
        })*/
        window.onload = function(){
            getDogs()
        }
        
        function getDogs() {
            fetch("https://api-dog-breeds.herokuapp.com/api/dogs")
            .then(response => response.json())
            .then(data => {
                displayData(data);
                count++;
            })
        }

        function addElem(but, str) {
            const preItem = `
            <div class="card d-flex justify-content-center" id="dog-card">
            `;
            const postItem = "</div>";
            let arr = [2,3,1,4];
            let randBut = Math.floor(Math.random() * 4) + 1;
            for (var i = 0; i < arr.length; i++){
                if(randBut == arr[i]){
                    arr.splice(i,1).pop(randBut)
                }
            }
            let thatNum = arr[2];
            let thatSecondNum = arr[1];
            let thatThirdNum = arr[0];
            document.getElementById("dogs").innerHTML += preItem + str + but.split("\n")[randBut] + but.split("\n")[thatNum] + but.split("\n")[thatSecondNum] + but.split("\n")[thatThirdNum] + postItem;

            

    }


        const displayData = (data) => {
            
            //for (var el of data) {
                let randNum = Math.floor(Math.random() * 100);
                addElem(

                    `
                    <div style="flex-direction: column;" id="btns">
                    <button id="correct" class="btn btn-primary rounded-pill mt-2" style="width: 15rem;">${data[count].breedName}</button>
                    <button id="incorrect" class="btn btn-primary rounded-pill mt-2" style="width: 15rem;">${randNum == data.indexOf(count) ? data[randNum+1]["breedName"] : data[randNum]["breedName"]}</button>
                    <button id="incorrect" class="btn btn-primary rounded-pill mt-2" style="width: 15rem;">${data[randNum +2]["breedName"]}</button>
                    <button id="incorrect" class="btn btn-primary rounded-pill mt-2" style="width: 15rem;">${data[randNum +3]["breedName"]}</button>
                    </div>`,
                    `
                    <img src="${data[count].image}" class="card-img-top" alt="...">
                    `)
                
           // }
        }
        let score = 0;
        let btnDiv = document.getElementById("dogs");
        if(btnDiv){
            btnDiv.addEventListener("click", function(event) {
                if(event.target.id === "correct"){
                    event.target.classList.add("btn-success");
                    score++;
                    document.getElementById("score").innerText = score;
                    setTimeout(function(){
                        document.getElementById("dog-card").remove();
                        getDogs();
                    }, 2000)
                    
                }
                else if(event.target.id === "incorrect"){
                    event.target.classList.add("btn-danger");
                    setTimeout(function(){
                        document.getElementById("dog-card").remove();
                        getDogs();
                    }, 2000)
                }
            })
        }