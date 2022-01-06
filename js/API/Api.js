export default class Api{
   

    returnApi(path,method='GET',body=null){
        const url=path;
        const options={
            method,
            mode:"cors",
            headers:{
                'Content-Type': 'application/json; charset=utf-8' ,
            }
        }
        if(body!==null){
            options.body=JSON.stringify(body);
        }   
     
       return fetch(url,options);
    }

    
}