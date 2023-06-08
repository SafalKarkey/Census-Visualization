function handleSelection(){
    var menu = document.getElementById("menu");
    var selectedOption = menu.options[menu.selectedIndex].value;

    var casteDatawrapper = document.getElementById("casteDatawrapper");
    var religionDatawrapper = document.getElementById("religionDatawrapper");

    casteDatawrapper.style.display = "none";
    religionDatawrapper.style.display = "none";

    if(selectedOption == "caste"){
        casteDatawrapper.style.display = "block";
        console.display("caste");
    }
    else if(selectedOption == "religion"){
        religionDatawrapper.style.display = "block";
        console.display("caste");
    }

}