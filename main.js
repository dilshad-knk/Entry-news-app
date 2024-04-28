
const main = document.getElementById("main");
const loading = document.querySelector(".loading");
const theme = document.getElementById("theme")
const root = document.querySelector(":root")
let countries = [];
const moon = document.getElementById("moon")
const searchIcon = document.getElementById("search-icon")
const mode_text = document.querySelector(".mode-text");
const selector = document.querySelector(".selector");
const options = document.querySelector(".options");
const regions = document.querySelectorAll(".region"); //querySelectorAll returns a NodeList containing all matching elements.
const filterSpan = document.querySelector('.selector span');
const searchInput = document.getElementById('search');
let selectedRegion = '';
let searchTerm = '';


async function runprocess(selectedRegion = null, searchTerm = '') {
   try {
        loading.innerHTML = `<img class="loading-icon" src="icons/loadingIcon.gif" alt="Loading...">`;
     const response = await fetch ("https://restcountries.com/v2/all")
     const data = await response.json();
        //countries = selectedRegion === "All" || selectedRegion === null ? data : data.filter(country => country.region === selectedRegion);
     
     if (selectedRegion && selectedRegion !== 'All') {
        countries = data.filter(country => country.region === selectedRegion);
    } else {
        countries = data
    }

    if (searchTerm) {
        countries = countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

     
     loading.innerHTML ="";
        main.innerHTML = "";
     countries.forEach(country => {

        // creating an elelment using Dom ..not by innerHTML
        //dynamically add a class name

        //creates the main container
        const countryContainer = document.createElement('div')
        countryContainer.classList.add('country') ;
        
        //create flag container and flag image
        const flagContainer = document.createElement('div');
        flagContainer.classList.add('flag-container');
        const flagImg = document.createElement('img');
        flagImg.classList.add('flag');
        flagImg.src = country.flag;

        flagContainer.appendChild(flagImg);

        //create contry drtails container
        const countryDetails = document.createElement('div');
        countryDetails.classList.add('country-details');
       
        const countryName = document.createElement('h2');
        countryName.classList.add('country-name');
        countryName.textContent = country.name

        const population = document.createElement('span');
        population.innerHTML = `<strong>Poulation: </strong>${country.population} <br>`

        const region = document.createElement('span');
        region.innerHTML = `<strong>Region: </strong>${country.region} <br>`
        
        const capital = document.createElement('span');
        capital.innerHTML = `<strong>Capital: </strong>${country.capital} <br>`                                                                                                                                                                                                                                     

        //append child elelments to country container
        countryDetails.appendChild(countryName)
        countryDetails.appendChild(population)
        countryDetails.appendChild(region)
        countryDetails.appendChild(capital)

        //append flag container and country details
        countryContainer.appendChild(flagContainer)
        countryContainer.appendChild(countryDetails)

        main.appendChild(countryContainer)

    });

    
   } catch (error) {
    
   }
}

runprocess();


let mode = localStorage.getItem("mode");
changeTheme();

theme.addEventListener("click", () => {
    if (mode === "dark") {
        mode = "light";
    } else {
        mode = "dark";
    }
    localStorage.setItem("mode", mode); 
    changeTheme(); // Apply the updated theme
});


function changeTheme() {
    if(mode==="dark"){
       root.style.setProperty("--bg","#202c37");
       root.style.setProperty("--text","#ffffff");
       root.style.setProperty("--lbg","#2b3945");
       moon.src = "icons/moon-regular.svg";
       searchIcon.src = "icons/search-regular.svg";
       mode_text.textContent = "Light Mode";


    }
    else {
        root.style.setProperty("--bg","#fafafa");
        root.style.setProperty("--text","#111517");
        root.style.setProperty("--lbg","#ffffff");
        moon.src = "icons/moon-solid.svg";
        searchIcon.src = "icons/search-solid.svg";
        mode_text.textContent = "Dark Mode";


    }
   

}

//Selelcting based on region

selector.addEventListener("click", function() {
    options.style.display = options.style.display === "block" ? "none" : "block";
  });

regions.forEach((option)=>{
    option.addEventListener("click",()=>{
        selectedRegion = option.getAttribute("data-value");
        filterSpan.textContent = selectedRegion;
        options.style.display = "none";
        runprocess(selectedRegion,searchTerm);
    })
  })


searchInput.addEventListener("input",()=> {
    searchTerm = searchInput.value.trim().toLowerCase()
    runprocess(selectedRegion,searchTerm)
})