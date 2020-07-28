export function about() {
    document.querySelector('.items').style.display = 'none'
    document.querySelector('#chartContainer').style.display = 'none'
    let divAbout = document.querySelector('#about')
    divAbout.style.display = 'flex'
    let html = `<div id="aboutRon">
                <h1>About Ron Gabbay </h1>
                <p class="lead">Hi! My name is Ron, I'm 29 years old. <br>
                 Currently living in Tel-Aviv.<br>
                 I served 5 years of in Israeli Navy Submarines unit<br>
                 After my military service, i learned 3 years at Sandciel Circus School with additional classes at France and preformed around Israel <br>
                 specialized at Partner Acrobatics  (Hand To Hand)  &  Aerial Straps.</p>
                 <h1>About The Project</h1>
                 <p class="lead">This project contains all that we have learned in the past 4 months of our Full-Stack course, which includes subjects as</p>
                <ul>
                    <li>JavaScript</li>
                    <li>HTML & Css</li>
                    <li>Bootsrap & Jquery</li>
                    <li>Http Requests and working with APIs</li>
                    <li>Modules</li>
                    <li>Arrays methods & Functions</li>
                    <li>And much much more...</li>
                </ul>
                <br />
                <h2> Have Fun ! </h2>
                </div>
                <img src="../imgs/circus-min.jpg" id="circusImg">
                `
    divAbout.innerHTML = html
}