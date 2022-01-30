import Api from "../API/Api.js";

export default class CourseData{
    constructor(){
        this.api=new Api();
        this.courses=this.getCourses();
    }


    async getCourses(){
        try{
            const response=await this.api.returnApi("http://localhost:5000/api/v1/courses","GET");
            if(response.status===200){
                return response.json();
            }else{
                return null;
            }
        }catch(e){
            return new Error(e);
        }
    }

    async createCourses(courses){
        try{
            const response=await this.api.returnApi("http://localhost:5000/api/v1/courses/create","POST",courses);

            if(response.status===200){
                return true;
            }else{
                return false;
            }
        }catch(e){
            return new Error(e);
        }
    }


    async getCourseById(id){
        try{

            const response=await this.api.returnApi(`http://localhost:5000/api/v1/courses/${id}`,"GET");
            
            if(response.status===200){
                return response.json();
            }else{
                return false;
            }
        }catch(e){
            return new Error(e);

        }

    }
    async getCourseByName(name){
        try{
            const response=await this.api.returnApi(`http://localhost:5000/api/v1/courses/getCourse/${name}`,"GET");
            if(response.status===200){
                return response.json();
            }else{
                return false;
            }
        }catch(e){
            return new Error(e);
        }
    }

    async deleteCourse(id){
        try{
            const response=await this.api.returnApi(`http://localhost:5000/api/v1/courses/delete/${id}`,"DELETE");
            if(response.status===200){
                return true;
            }else{
                return false;
            }
        }catch(e){
            return new Error(e);
        }
    }

    async updateCourse(id,course){
     
        try{
            const response=await this.api.returnApi(`http://localhost:5000/api/v1/courses/update/${id}`,"PUT",course)
            if(response.status===200){
                return true;
            }else{
                return false;
            }
        }catch(e){
            return new Error(e);
        }
    }
    
}