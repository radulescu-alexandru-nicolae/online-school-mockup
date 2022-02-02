import StudentData from "../Elements/StudentData.js";
import Courses from "./Courses.js";
import Forbidden from "./Forbidden.js";

export default class SignUp{
    constructor(){
        this.container=document.querySelector('.container');
        this.container.innerHTML=``;
        this.setNav();
        this.setMain();
        this.newAccount={};
        this.conturi=[];
        this.aux;
        this.form=document.querySelector('form');
        this.form.addEventListener('change',this.handleChange);
        this.signInButton=document.querySelector('.signInButton');
        this.load();
        this.signInButton.addEventListener('click',this.addAccounut);
        this.studentData=new StudentData();
        this.nav=document.querySelector('nav');
        this.nav.addEventListener('click',this.navEvent);
        this.checkEmail('testt');
    }
    setNav=()=>{
        let nav=document.createElement('nav');
        nav.innerHTML=`
        <h2 class="home">Courses</h2>
        <article class="sign-out">
            <h3>Welcome,Joe Smith!</h3>
            <p class="signOut">Sign Out</p>
        </article>
        <article class="login displayOff">
            <h3>Sign Up</h3>
            <h3>Sign In</h3>
        </article>
        `;
        this.container.appendChild(nav);
        
    }
    setMain=()=>{
        let main=document.createElement('main');
        main.innerHTML=`
        <section class="signUp">
    <h2>Sign In</h2>
    <form action="">

        <label for="firstName">First Name</label>
        <input type="text " class="input-firstName" >
        <label for="lastName">Last Name</label>
        <input type="text " class="input-lastName">
        <label for="email">Email Address</label>
        <input type="email " class="input-email">
        <label for="password">Password</label>
        <input type="password " class="input-password">
        <label for="age">Age</label>
        <input type="tel" class="input-age">
    
    
        <div class="container-buttons">
        <button class="signInButton">Sign In</button>
        <button class="cancelButton">Cancel</button>
    </div>
        <p>Already have a user account?Click here to <span>sign in</span>!</p>
    </form>
   
</section>
        `
        ;
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
    handleChange=(e)=>{
    
        let obj=e.target;

        if(obj.classList.contains("input-firstName")){
            this.newAccount.first_name=obj.value;

        }else if(obj.classList.contains("input-lastName")){
          
            this.newAccount.last_name=obj.value;
        }else if(obj.classList.contains("input-email")){
            this.newAccount.email=obj.value;

            this.checkEmail(obj.value);
        }else if(obj.classList.contains("input-password")){
            this.newAccount.password=obj.value;
        }else if(obj.classList.contains("input-age")){
            this.newAccount.age=obj.value;
        }
    }
   async checkEmail(email){
       try{
        let allStudents=await this.studentData.getStudentByEmail(email);
      console.log(allStudents);
      if(allStudents!==false){
          document.querySelector('.input-email').style.border="2px solid red";
          console.log('a');
      }else{
        document.querySelector('.input-email').style.border="2px solid black";
      }
       }catch(e){
           throw new Error(e);
       }
    }
    addAccounut=(e)=>{
        let ok=1;
        e.preventDefault();
       if(this.newAccount.first_name===undefined||this.newAccount.last_name===undefined||this.newAccount.email===undefined||
        this.newAccount.password===undefined||this.newAccount.age===undefined||this.checkEmail(this.newAccount.email)){
        let forbidden=new Forbidden();
       }else{
        this.studentData.createStudent(this.newAccount);
        this.courses=new Courses(this.newAccount);
       }
       

    
      
    }
    load(){
        let obj=JSON.parse(window.localStorage.getItem("account"));
        if(obj!==null){
            obj.forEach(e=>{
                this.conturi.push(e);
            })
        }
    }
    




}