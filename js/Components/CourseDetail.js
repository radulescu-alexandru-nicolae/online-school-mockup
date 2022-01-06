import CourseData from "../Elements/CoursData.js";
import Courses from "./courses.js";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import UpdateCourse from "./UpdateCourse.js";

export default class CourseDetail{
    constructor(course,student){
        this.courseData=new CourseData();
        this.course=course;
        this.container=document.querySelector('.container');
        this.container.innerHTML="";
        this.setHeader();
        this.setMain();
        this.nav=document.querySelector('nav');
        this.nav.addEventListener('click',this.navEvent);
  
        this.student=student;
        this.checkLogin(student);

       

        this.id;


        this.header=document.querySelector('.container-button-header');
        this.header.addEventListener('click',this.eventHeader);

this.aux;

        this.showHeader();
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
    setHeader=()=>{
        let header=document.createElement('header');
        header.innerHTML=`
        <nav>
        <h2>Courses</h2>
        <article class="sign-out">
            <h3>Welcome</h3>
            <p class="signOut">Sign Out</p>
        </article>
        <article class="login">
            <h3 class="signUp">Sign Up</h3>
            <h3 class="signIn">Sign In</h3>
        </article>
       </nav>
       <div class="container-button-header">
        <button class="update">Update Course</button>
        <button class="delete">Delete Course</button>
        <button class="return">Return to List</button>
        <button class="join">Join</button>
       </div>
        `
        this.container.appendChild(header);
    }

    setMain=()=>{
        console.log(this.course.querySelector('h2').textContent);
        this.courseData.getCourseByName(this.course.querySelector('h2').textContent).then((curs)=>{
          this.createMain(curs);
      this.id=curs.id;

      this.aux=curs;
          
          });
      
    }
    createMain=(element)=>{
        let main=document.createElement('main');
        main.innerHTML=`
        <section class="course-detail-container">
        <h2>Course Detail</h2>
        <article class="container-first-second">
            <div class="first-detail-container">
                <section class="courseDetail">
                    <p class="p-course">Course</p>
                    <article class="course-information">
                        <h1>${element.name}</h1>
                        <p>By ${element.department}</p>
                        <p>${element.description}</p>
                    </article>
                </section>
                <section class="estimatedMaterials">
                    <article class="estimated"></article>
                </section>
            </div>
            <div class="second-detail-container">
                <p class="estimated">Estimated Time</p>
                <p>${element.time}h</p>


                <p class="materials">Materials Needed</p>
                <ul>
                    <li>1/2x3/4 inch parting strip</li>
                    <li>1x2 common pine</li>
                    <li>1x4 common pine</li>
                    <li>1x10 common pine</li>
                    <li>1/4 inch thick laun plywood</li>
                </ul>
            </div>
        </article>
     
    </section>
        `
        ;
        this.container.appendChild(main);
    }

    
 


    checkLogin=(student)=>{
        if(student!==undefined){
            document.querySelector('.login').classList.toggle("displayOff");
            document.querySelector('.sign-out h3').textContent=`Welcome ${student.email}`;
        }else if(student===undefined){
            document.querySelector('.sign-out').classList.toggle("displayOff");
        }
    }


    checkAdmin(account){
  if(account!==undefined){
    if(account.admin===true){
        return true;
    }else{
        return false;
    }
  }else{
      return false;
  }
    }


    eventHeader=(e)=>{

        let obj=e.target;
        if(obj.classList.contains("delete")){
            this.courseData.deleteCourse(this.id).then((raspuns)=>{
                if(raspuns===true){
                    let a=new Courses(this.student);
                }
            })
        }else if(obj.classList.contains("return")){
            let a=new Courses(this.student);
        }else if(obj.classList.contains("update")){
            let update=new UpdateCourse(this.aux,this.student);
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
            console.log('e');
            let courses=new Courses();
        }
    }
    showHeader(){
        if(this.checkAdmin(this.student)!==true){
            document.querySelector('.delete').classList.toggle("displayOff");
            document.querySelector('.update').classList.toggle("displayOff");
        }
    }
}