import CourseData from "../Elements/CoursData.js";
import Courses from "./courses.js";

export default class UpdateCourse{
    constructor(course,student){
        this.container=document.querySelector('.container');
        
        this.container.innerHTML=``;
        
        this.courseData=new CourseData();
        this.course=course;
        this.student=student;
        
        this.setNav();
        this.setMain();
        
        this.titleInput=document.querySelector('.title-input');
        this.description=document.querySelector('.description-input');
        this.time=document.querySelector('.time-input');
        
   

        this.checkLogin(this.student);
        console.log(this.student);
        console.log(this.course);


        
        this.titleInput.value=this.course.name;
        this.description.value=this.course.description;
        this.time.value=this.course.time;

        this.newCourse={};
        this.form=document.querySelector('form');
        this.form.addEventListener('change',this.handleChange);

        this.update=document.querySelector('.update');
        this.update.addEventListener('click',this.handleSubmit);
    }

    setNav=()=>{
        let nav=document.createElement('nav');
        nav.innerHTML=`
        <h2>Courses</h2>
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
        <h2>Update Course</h2>

        <form class="container-update">
            <article class="first-update-container">
                <label for="Title">Course Title</label>
                <input type="text" class="title-input">

           <p>By Joe Smith</p>

                <label for="Description">Course Description</label>
                <textarea name="" id="" cols="30" rows="10" class="description-input"></textarea>


            </article>
            <article class="second-update-container">
                <label for="Time">Estimated Time</label>
                <input type="tel" class="time-input">
            </article>
        </form>
        
        <div class="updateButtoane">
            <button class="update"> Update Course</button>
            <button class="cancelUpdate">Cancel</button>
        </div>
      </section>
        `
        this.container.appendChild(main);
    }
handleSubmit=(e)=>{
this.courseData.updateCourse(this.course.id,this.newCourse).then((rezultat)=>{
    if(rezultat===true){
        let courses=new Courses(this.student);
    }
});


}
    getCourseByName=(name)=>{
        let obj=JSON.parse(window.localStorage.getItem("courses"));
        let course;
        obj.forEach(e=>{
            if(e.title===name){
course=e;
            }
        })
        return course;
    }



    handleChange=(e)=>{
        let obj=e.target;
        this.newCourse=this.course;
        if(obj.classList.contains("time-input")){
            this.newCourse.time=obj.value;
        }else if(obj.classList.contains("title-input")){
            this.newCourse.name=obj.value;
        }else if(obj.classList.contains("description-input")){
            this.newCourse.description=obj.value;
        }

        console.log(this.newCourse);
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
