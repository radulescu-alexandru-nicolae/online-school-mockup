import Courses from "./courses.js";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";

export default class Forbidden{
    constructor(){
        this.container=document.querySelector('.container');
this.container.innerHTML=``;
        this.setNav();
        this.setMain();


        this.checkLogin(undefined);
        this.nav=document.querySelector('nav');
        this.nav.addEventListener('click',this.navEvent);
    }

    setNav=()=>{
        let nav=document.createElement('nav');
        nav.innerHTML=`
        <h2 class="home">Courses</h2>
        <article class="sign-out">
            <h3>Welcome</h3>
            <p class="signOut">Sign Out</p>
        </article>
        <article class="login">
            <h3 class="signUp">Sign Up</h3>
            <h3 class="signIn">Sign In</h3>
        </article>
        `;
        this.container.appendChild(nav);
    }

    setMain=()=>{
        let main=document.createElement('main');
        main.innerHTML=`
        
        <article class="forbidden">
        <h2>Forbidden</h2>
        <p>Oh oh!You can't acces this page</p>
    </article>
        `
        this.container.appendChild(main);
    }
    navEvent=(e)=>{
        let obj=e.target;
        if(obj.classList.contains("signUp")){
            let signUp=new SignUp();
        }else if(obj.classList.contains("signIn")){
            let signIn=new SignIn();
        }else if(obj.classList.contains("signOut")){
            let signOut=new Courses();
        }else if(obj.classList.contains("home")){
            let courses=new Courses();
        }
    }
    checkLogin=(student)=>{
        if(student!==undefined){
            document.querySelector('.login').classList.toggle("displayOff");
            document.querySelector('.sign-out h3').textContent=`Welcome ${student.email}`;
        }else if(student===undefined){
            document.querySelector('.sign-out').classList.toggle("displayOff");
        }
    }

}