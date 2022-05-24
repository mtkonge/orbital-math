const radius = document.getElementById("radius");
const mass = document.getElementById("mass");
const resultM = document.getElementById("result-m");
const resultKm = document.getElementById("result-km")
const button = document.getElementById("button");
const dropdown = document.getElementById("dropdown");


button.addEventListener("click", () => {
    if (dropdown.value == "jorden") {
        mass.value = 5.972e+24;
        radius.value = 6371000;
    }    
    else if (dropdown.value == "mars") {
        mass.value = 6.39e+23;
        radius.value = 3379500;
    }
    else if (dropdown.value == "jupiter") {
        mass.value = 1.898e+27;
        radius.value = 69911000;
    }
    else if (dropdown.value = "solen") {
        mass.value = 1.989e+30
        radius.value =  696340000 

    }
    const result = Math.sqrt(6.67*10**-11*mass.value*(1/radius.value))
    resultM.innerText = result + " m/s"
    resultKm.innerText = result*3.6 + " km/t"
})