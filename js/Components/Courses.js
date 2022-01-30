import CreateCourse from "./CreateCourse.js";
import SignUp from "./SignUp.js";
import UpdateCourse from "./UpdateCourse.js";
import SignIn from "./SignIn.js";
import CourseData from "../Elements/CoursData.js";
import CourseDetail from "./CourseDetail.js";

export default class Courses{
    constructor(student){
        this.container=document.querySelector('.container');
        this.container.innerHTML=``;    
        this.setNav();
        this.setMain();
        this.main=document.querySelector('main');
        this.main.addEventListener('click',this.addCourse);
        this.main.addEventListener('click',this.goCourse);
        this.nav=document.querySelector('nav');
        this.nav.addEventListener('click',this.navEvent);
        this.student=student;
        this.checkAdmin(student);
        this.checkLogin(this.student);
        this.courseData=new CourseData();
        this.cursuri();

        console.log(this.courseData.getCourseByName("ASd"));
        
        

    }
   async cursuri(){
        let d=await this.courseData.getCourses();
        let containerCursuri=document.querySelector('.container-courses');
        d.forEach(e=>{
            containerCursuri.appendChild(this.containerCourse(e));
        })
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
    checkLogin=(student)=>{
        if(student!==undefined){
            document.querySelector('.login').classList.toggle("displayOff");
            document.querySelector('.sign-out h3').textContent=`Welcome ${student.email}`;
        }else if(student===undefined){
            document.querySelector('.sign-out').classList.toggle("displayOff");
        }
    }
    setMain=()=>{
        let main=document.createElement('main');
        main.innerHTML=`
        <section class="container-courses">
       


        <article class="addCourse">
            <i class="fas fa-plus"></i>
            <p>New Course</p>
        </article>

  </section>
        `;
        this.container.appendChild(main);
    }
    containerCourse(element){

        let article=document.createElement('article');
        article.className="course";
        article.innerHTML=`
        <p>Course</p>
        <h2>${element.name}</h2>
        `
        return article;
    }
    addCourse=(e)=>{
        let obj=e.target;
        if(obj.classList.contains("addCourse")){
            let createCourse=new CreateCourse(this.student);

        }
    }
    goCourse=(element)=>{
        let obj=element.target;
        console.log(obj);
        if(obj.classList.contains("course")){
            let courseDetail=new CourseDetail(obj,this.student);
        }else{
            obj=element.target.parentNode;
        }
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

    checkAdmin(e){
        if(e!==undefined){
            if(e.admin===false){
                document.querySelector('.addCourse').style.display="none";
            }else if(e.admin===true){
                document.querySelector('.addCourse').style.display="unset";
            }
        }else{
            document.querySelector('.addCourse').style.display="none";

        }
        
    }
}