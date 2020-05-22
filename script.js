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
  var length = [1,3].includes(criteria) ? getLength() : (Math.floor(Math.random()*121)+8);
  var charType = [2,3].includes(criteria) ? Object.values(getCharType()) : [true,true,true,true];
  return getPassword(length,charType);
}

function getLength(){
  do{
    var length = Number(prompt("How long is the password (between 8 to 128)?",8));
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
    "SPECIAL CHARACTERS":false
  }

  do{
    Object.keys(charArray).forEach((element,index) => charArray[element] = confirm(`${index + 1} - Do you want to have ${element}?`));
    var charCondition = !Object.values(charArray).includes(true);
    if (charCondition) getError(false);
  }while(charCondition)

  return charArray;
}

function getError(isLength){
  return alert("Invalid entry, please try again!\nPassword must " + (isLength? "be between 8 to 128 characters." : "have at least 1 character type."))
}

function getPassword(length, charType){
  var passwordArray = [];
  
  do {
    var charCondition = [false,false,false,false]
    for (var i=0;i<length;i++){
      do{
        var randomType = Math.floor(Math.random()*4);
        var charCode;
    
        switch (randomType) {
          case 0: charCode = Math.floor(Math.random()*26) + 97; break; // lower 97-122
          case 1: charCode = Math.floor(Math.random()*26) + 65; break; // upper 65-90
          case 2: charCode = Math.floor(Math.random()*10) + 48; break; // numeric 48-57
          case 3: charCode = Math.floor(Math.random()*15) + 33; break; // special char !"#$%&'()*+,-./ (33-47)    :;<=>?@ (58-64)  [\]^_`  (91-96) {|}~  (123-126)
        }

        passwordArray[i] = String.fromCharCode(charCode);
        charCondition[randomType] = charType[randomType];
    
      }while (!charType[randomType]);
    }

  } while (charCondition.join() != charType.join());
  
  return passwordArray.join('');

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
