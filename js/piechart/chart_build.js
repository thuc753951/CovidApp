function chartBuilder(){
    data = getData_Pie();
    male = data.male;
    female = data.female;
    maleNH = data.maleNH;
    femaleNH = data.femaleNH;
  
    var ctx=document.getElementById("chartjs-4").getContext("2d");
    var myChart = new Chart(ctx,
    {"type":"doughnut",
    "data":{
      "labels":[
        "Male","Female", "Male not Hostpitalized", "Female not Hostpitalized"],
      "datasets":[{
        "label":"My First Dataset",
      "data":[male,female,maleNH,femaleNH],"backgroundColor":[
      "rgb(255, 99, 132)",
      "rgb(54, 162, 235)",
      "rgb(255, 55, 100)",
      "rgb(54, 45, 235)"]}]}});
    console.log("male = " + male); 
    console.log("female = " + female); 
}