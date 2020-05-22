// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword(){

  var criteria = Number(prompt("Which criteria to include in the password?\n  [1] Length\n  [2] Character Type\n  [3] All the Above"));
  var length = [1,3].includes(criteria) ? getLength() : Math.floor(Math.random(121))+8;
  var charType = [2,3].includes(criteria) ? Object.values(getCharType()) : [true,true,true,true];

  // lower 97-122
  // upper 65-90
  // numeric 48-57
  // special char !"#$%&'()*+,-./ (32-47)    :;<=>?@ (58-64)  [\]^_`  (91-96) {|}~  (123-126)

  return `criteria: ${criteria},length: ${length}, charType: ${charType}`

  
}

function getLength(){
  do{
    var length = Number(prompt("How long is the password (between 8 to 128)",8));
    var lengthCondition = ( length < 8 || length > 128 || length % 1 != 0 );
    if (lengthCondition) getError(true);
  } while (lengthCondition);

  return length;
}

function getCharType(){
  var charArray = {
    "LOWERCASE":false,
    "UPPERCASE":false,
    "NUMERIC":false,
    "SPECIAL CHARACTER":false
  }

  var charProperty = Object.keys(charArray)

  do{
    for (var i=0; i < charProperty.length; i++ ){
      charArray[charProperty[i]] = confirm(`${i+1} - Do you want to have ${charProperty[i]}?`);
    }
    
    var charCondition = !Object.values(charArray).includes(true);
    if (charCondition) getError(false);

  }while(charCondition)

  return charArray;

}

function getError(isLength){
  return alert("Invalid entry, please try again!\nPassword must " + (isLength? "be between 8 to 128 characters." : "have at least 1 character type."))
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
