import StudentData from "../Elements/StudentData.js";
import CreateCourse from "./CreateCourse.js";
import SignUp from "./SignUp.js";
import UpdateCourse from "./UpdateCourse.js";
import SignIn from "./SignIn.js";
import CourseData from "../Elements/CoursData.js";
import CourseDetail from "./CourseDetail.js";
import Courses from "./Courses.js";

export default class JoinedCourses{

    constructor(student){
        this.container=document.querySelector('.container');
        this.container.innerHTML=``;    
        this.setNav();
        this.setMain();
        this.main=document.querySelector('main');
        this.nav=document.querySelector('nav');
        this.nav.addEventListener('click',this.navEvent);
        this.student=student;

        this.checkLogin(this.student);
   
        this.studentData=new StudentData();

        this.cursuri();

        this.main.addEventListener('click',this.deleteJoinedCOurses);

        this.courseData=new CourseData();
     

        
    }
    setNav=()=>{
        let nav=document.createElement('nav');
        nav.innerHTML=`
        <h2 class="home">Courses</h2>
        <article class="sign-out">
            <h4 class="courseList">Joined Courses</h4>
            <h4 class="allCourses">All COurses</h4>
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
        <section class="container-courses joinedCourses">
       



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

    async cursuri(){
        let d= await this.studentData.getJoinedCourses(this.student.id);
        let containerCursuri=document.querySelector('.container-courses');
        d.forEach(e=>{
            containerCursuri.appendChild(this.containerCourse(e));
        })
    }

    containerCourse(element){

        let article=document.createElement('article');
        article.className="course";
        article.innerHTML=`
        <p>Course</p>
        <h2>${element.name}</h2>
        <p class="exit">X</p>
        `
        return article;
    }

    navEvent=(e)=>{
        let obj=e.target;
        if(obj.classList.contains("signUp")){
            let signUp=new SignUp();
        }else if(obj.classList.contains("signIn")){
            let signIn=new SignIn();
        }else if(obj.classList.contains("signOut")){
            let signOut=new Courses();
        }else if(obj.classList.contains("home")||obj.classList.contains("allCourses")){
            let courses=new Courses(this.student);
        }
    }

deleteJoinedCOurses=(e)=>{
        let obj=e.target;
     if(obj.classList.contains("exit")){
         let curs=obj.parentNode;
      this.courseData.getCourseByName(curs.querySelector('h2').textContent).then((raspuns)=>{

        this.studentData.deletJoindCourse(raspuns.id,this.student.id);
        

        let courses=new Courses(this.student);
      })
        
     }

    }
}