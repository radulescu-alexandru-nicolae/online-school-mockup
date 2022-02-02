import Api from "../API/Api.js";
import Courses from "../Components/courses.js";

export default class StudentData{
    constructor(){
        this.api=new Api();
        this.customers=this.getStudents();
        
    }
    async getStudents(){
        try{
            const response=await this.api.returnApi("http://localhost:5000/api/v1/students","GET");

            if(response.status===200){
                return response.json();
            }else{
                return null;
            }
        }catch(e){
            return new Error(e);
        }
    }

    async createStudent(Student){
        try{
            const response=await this.api.returnApi("http://localhost:5000/api/v1/students/create","POST",Student);
            if(response.status===200){
               let courses=new Courses(Student);
            }
        }catch(e){
            return new Error(e);
        }
    }
    async deleteStudent(id){
        try{
            const response=await this.api.returnApi(`http://localhost:5000/api/v1/students/delete/${id}`,"DELETE");
            if(response.status===200){
                let course=new Courses();
            }
        }catch(e){
            return new Error(e);
        }
    }

    async getStudentByEmail(email){
        try{
                const response=await this.api.returnApi(`http://localhost:5000/api/v1/students/getByEmail/${email}`,"GET");
                if(response.status===302){
                    return response.json();
                }else{
                    
                    return false;
                }
        }catch(e){
            return new Error(e);
        }
    }
    async updateStudent(id,student){
        try{
            const response=await this.api.returnApi(`http://localhost:5000/api/v1/students/update/${id}`,student);
            if(response.status===200){
                return true;
            }else{
                return false;
            }
        }catch(e){
            return new Error(e);
        }
    }
    async joinCourse(id,studentId){
        console.log(id);
        try{
            const response=await this.api.returnApi(`http://localhost:5000/api/v1/students/joinCourse/${id}/${studentId}`,"POST");
            if(response.status===200){
                return true;
            }
        }catch(e){
            return new Error(e);
        }
    }

    async getJoinedCourses(id){
        try{
            const response=await this.api.returnApi(`http://localhost:5000/api/v1/students/getJoinedCourse/${id}`,"GET");
            if(response.status===200){
                return response.json();
            }
        }catch(e){
            return new Error(e);
        }
    }

    async deletJoindCourse(idCourse,idStudnt){
        try{
            const response=await this.api.returnApi(`http://localhost:5000/api/v1/students/deleteJoinedCourses/${idStudnt}/${idCourse}`,"DELETE");
            if(response.status===200){
                return true;
            }
        }catch(e){
            return new Error(e);
        }
    }
}