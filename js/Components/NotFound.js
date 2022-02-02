export default class NotFound{
    constructor(){
        this.container=document.querySelector('.container');

        this.container.innerHTML=``;
        this.setNav();
        this.setMain();
    }
    setNav=()=>{
        let nav=document.createElement('nav');
        nav.innerHTML=`
        <h2>Courses</h2>
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
        <article class="notFound">
        <h2>Not Found</h2>
        <p>Sorry!We couldn't finid the page you're looking for.</p>
    </article>
        `
        ;
        this.container.appendChild(main);
    }
}