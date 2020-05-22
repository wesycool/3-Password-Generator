// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

//Select Passord Criteria
function generatePassword(){
  var criteria = Number(prompt("Which criteria to include in the password?\n  [1] Length\n  [2] Character Type\n  [3] All the Above"));
  
  if ([1,2,3].includes(criteria)){
    var length = [1,3].includes(criteria) ? getLength() : (Math.floor(Math.random()*121)+8);
    var charType = [2,3].includes(criteria) ? Object.values(getCharType()) : [true,true,true,true];
    return getPassword(length,charType);
  }else return "";
}

//Get Length Criteria
function getLength(){
  do{
    var length = Number(prompt("How long is the password (between 8 to 128)?",8));
    var lengthCondition = ( length < 8 || length > 128 || length % 1 != 0 );
    if (lengthCondition) getError(true);
  } while (lengthCondition);

  return length;
}

//Get Character Type Criteria
function getCharType(){
  var charArray = {
    "LOWERCASE":false,
    "UPPERCASE":false,
    "NUMERIC":false,
    "SPECIAL CHARACTERS":false
  }

  do{
    Object.keys(charArray).forEach((value,index) => charArray[value] = confirm(`${index + 1} - Do you want to have ${value}?`));
    var charCondition = !Object.values(charArray).includes(true);
    if (charCondition) getError(false);
  }while(charCondition)

  return charArray;
}

//Get Error Message
function getError(isLength){
  return alert("Invalid entry, please try again!\nPassword must " + (isLength? "be between 8 to 128 characters." : "have at least 1 character type."))
}

//Run Random Password
function getPassword(length, charType){
  var passwordArray = [];
  
  do {
    var defaultType = [false,false,false,false]
    for (var i=0;i<length;i++){
      do{
        var charCode = String.fromCharCode(Math.floor(Math.random()*93) + 33);
        var charCondition = [/[a-z]/,/[A-Z]/,/[0-9]/,/[^a-zA-Z0-9]/];
        var charIndex;
        charCondition.forEach((value,index) =>  {if (charCode.match(value) != null) charIndex = index;});
        defaultType[charIndex] = charType[charIndex]
        passwordArray[i] = charCode;
      }while (!charType[charIndex])
    }
  } while (defaultType.join() != charType.join());
  
  return passwordArray.join('');
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
