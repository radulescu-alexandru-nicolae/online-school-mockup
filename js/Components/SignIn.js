import StudentData from "../Elements/StudentData.js";
import Courses from "./courses.js";

export default class SignIn{
    constructor(){
        this.container=document.querySelector('.container');
        this.container.innerHTML=``;
        this.setNav();
        this.setMain();
        this.account={};
this.form=document.querySelector('form');
this.form.addEventListener('change',this.handleChange);
this.studentData=new StudentData();
console.log(this.studentData.getStudentByEmail("test"));
this.signInButton=document.querySelector('.signInButton');
this.signInButton.addEventListener('click',this.logIn);

this.nav=document.querySelector('nav');
this.nav.addEventListener('click',this.navEvent);
    }


    setNav=()=>{
        let nav=document.createElement('nav');
        nav.innerHTML=`
        <h2 class="home">Courses</h2>
        <article class="sign-out">
            <p class="signUp">Sign Up</p>
            <p class="signIn">Sign In</p>
        </article>
        <article class="login displayOff">
            <h3>Sign Up</h3>
            <h3>Sign In</h3>
        </article>
        `;
        this.container.appendChild(nav);
        
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
    setMain=()=>{
        let main=document.createElement('main');
        main.innerHTML=`
        <section class="signIn">
    <h2>Sign In</h2>
    <form action="">
        <label for="email">Email Address</label>
        <input type="email" class="input-email">
        <label for="password" >Password</label>
        <input type="password" class="input-password">
        <div class="container-buttons">
            <button class="signInButton">Sign In</button>
            <button class="cancelButton">Cancel</button>
        </div>
      
        <p>Don't have a suer account?Click here to <span>sign up</span>!</p>
    </form>
</section>
        
        `
        ;
        this.container.appendChild(main);
    }
    handleChange=(e)=>{
        let obj=e.target;
        if(obj.classList.contains("input-email")){
            this.account.email=obj.value;
        }else if(obj.classList.contains("input-password")){
            this.account.password=obj.value;
        }

    }

  logIn=(e)=>{
        e.preventDefault();
        let student= this.studentData.getStudentByEmail(this.account.email);
        student.then((user)=>{
            if(user.email===this.account.email&&user.password===this.account.password){
                let courses=new Courses(user);
            }
        })
        
    }
}
