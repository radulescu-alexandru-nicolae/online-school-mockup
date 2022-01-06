import CourseData from "../Elements/CoursData.js";
import Courses  from "./Courses.js";
import Forbidden from "./Forbidden.js";
export default class CreateCourse{
    constructor(student){
        this.container=document.querySelector('.container');
        this.container.innerHTML="";
        this.setNav();
        this.setMain();
        this.student=student;
        this.checkLogin(student);
        console.log('a');

        this.course={};
        this.courseData=new CourseData();

        this.form=document.querySelector('form');
        this.form.addEventListener('change',this.handleChange);
        this.createButton=document.querySelector('.create');
        this.createButton.addEventListener('click',this.submitEvent);

    
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
        
        <section class="course-update-container">
        <h2>Create Course</h2>
        
    <div class="validation">
    <h3>Validation Error</h3>
    <ul>
        <li class="title-validation">Pleas provide a value for "Title"</li>
        <li class="description-validation">Pleas proivde a value for "Description"</li>
    </ul>
</div>

        <form class="container-update">
            <article class="first-update-container">
                <label for="Title">Course Title</label>
                <input type="text" class="course-title">
                <label for="Department">Course Department</label>
                <input type="text" class="course-department">

     

                <label for="Description">Course Description</label>
                <textarea name="" id="" cols="30" rows="10" class="description-course"></textarea>


            </article>
            <article class="second-update-container">
                <label for="Time">Estimated Time</label>
                <input type="tel" class="time-course">
            </article>
        </form>
        
        <div class="updateButtoane">
            <button class="create"> Create Course</button>
            <button class="cancelCreate">Cancel</button>
        </div>
      </section>
        `
        this.container.appendChild(main);
    }   
    
    checkLogin=(student)=>{
        console.log('e');
        if(student!==undefined){
            console.log('d');
            document.querySelector('.login').classList.toggle("displayOff");
            document.querySelector('.sign-out h3').textContent=`Welcome ${student.email}`;
        }else if(student===undefined){
            console.log('a');
            document.querySelector('.sign-out').classList.toggle("displayOff");
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

  handleChange=(e)=>{
    let obj=e.target;
    if(obj.classList.contains("time-course")){
        this.course.time=obj.value;
    }else if(obj.classList.contains("description-course")){
        this.course.description=obj.value;
    }else if(obj.classList.contains("course-title")){
        this.course.name=obj.value;
    }else if(obj.classList.contains("course-department")){
        this.course.department=obj.value;
    }

    console.log(this.course);
  }


  submitEvent=(e)=>{
      if(this.course.name===undefined||this.course.description===undefined||this.course.time===undefined||this.course.department===undefined){
          console.log('e');
          document.querySelector('.validation').style.display="unset";
          document.querySelector('.validation').style.background=" #c6aaf5";
      }else{
          this.courseData.createCourses(this.course).then((result)=>{
              if(result===true){
                  let courses=new Courses(this.student);
              }else{
                  this.forbidden=new Forbidden();
              }
          });
      }
  }

   
}