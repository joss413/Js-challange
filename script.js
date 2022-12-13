// challange 1 : your Age in Days

function ageInDays(){

    var birthYear = prompt('what year were you born... Good friend? ');
    var ageInDayss =(2020-birthYear)*365
    var h1 =document.createElement('h1');
    var textAnswer =document.createTextNode('You are '+ ageInDayss + ' days old.');
    h1.setAttribute('id','ageInDayss');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
   // console.log(ageInDayss);
}

function reset(){
    document.getElementById('ageInDayss').remove();
}

