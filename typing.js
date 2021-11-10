//List of each type
var types = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", 
  "Poison", "Psychic", "Rock", "Steel", "Water"];
//initialize each type
//[0] = Weaknesses
//[1] = Resistances
//[2] = Immunities
var bug = [["Fire", "Flying", "Rock"], ["Grass", "Fighting", "Ground"], []];
var dark = [["Fighting", "Bug", "Fairy"], ["Ghost", "Dark"], ["Psychic"]];
var dragon = [["Dragon", "Ice", "Fairy"], ["Fire", "Water", "Electric", "Grass"], []];
var electric = [["Ground"], ["Electric", "Flying", "Steel"], []];
var fairy = [["Poison", "Steel"], ["Fighting", "Bug", "Dark"], ["Dragon"]];
var fighting = [["Flying", "Psychic", "Fairy"], ["Bug", "Rock", "Dark"], []];
var fire = [["Water", "Ground", "Rock"], ["Fire", "Grass", "Ice", "Bug", "Steel"], []];
var flying = [["Electric", "Ice", "Rock"], ["Grass", "Fighting", "Bug"], ["Ground"]];
var ghost = [["Ghost", "Dark"], ["Poison", "Bug"], ["Normal", "Fighting"]];
var grass = [["Fire", "Ice", "Poison", "Flying", "Bug"], ["Water", "Electric", "Grass", "Ground"], []];
var ground = [["Water", "Grass", "Ice"], ["Poison", "Rock"], ["Electric"]];
var ice = [["Fire", "Fighting", "Rock", "Steel"], ["Ice"], []];
var normal = [["Fighting"], [], ["Ghost"]];
var poison = [["Ground", "Psychic"], ["Grass", "Fighting", "Poison", "Bug", "Fairy"], []];
var psychic = [["Bug", "Ghost", "Dark"], ["Psychic", "Fighting"], []];
var rock = [["Water", "Grass", "Fighting", "Ground", "Steel"], ["Normal", "Fire", "Poison", "Flying"], []];
var steel = [["Fire", "Fighting", "Ground"], ["Normal", "Grass", "Ice", "Flying", "Psychic", "Bug", "Rock", "Dragon", "Steel", "Fairy"], ["Poison"]];
var water = [["Electric", "Grass"], ["Fire", "Water", "Ice", "Steel"], []];
var currentType = [];

function listWeakness(type){
  return eval(type)[0];
}
function listResistance(type){
  return eval(type)[1];
}
function listImmunity(type){
  if(eval(type)[2] == []){
    return "";
  }
  else{
    return eval(type)[2];
  }
}
//Set listener function for buttons
function setEventListener(id){
  
  button = document.getElementById(id.toLowerCase());
  button.addEventListener("click", function(){
    //There is no current typing, the user clicked a type
    if(currentType.length == 0){
      document.getElementById("currType").innerHTML = id;
      //No weakness
      if(listWeakness(id.toLowerCase()).length == 0){
        document.getElementById("weakness").innerHTML = "This Pokemon is weak to: None";
      }
      else{
        document.getElementById("weakness").innerHTML = "This Pokemon is weak to: " + listWeakness(id.toLowerCase());
      }
      //No Resistances
      if(listResistance(id.toLowerCase()).length == 0){
        document.getElementById("resistance").innerHTML = "This Pokemon is resistant to: None";
      }
      else{
        document.getElementById("resistance").innerHTML = "This Pokemon is resistant to: " + listResistance(id.toLowerCase());
      }
      //No Immunities
      if(listImmunity(id.toLowerCase()).length == 0){
        document.getElementById("immunity").innerHTML = "This Pokemon is immune to: None";
      }
      else{
        document.getElementById("immunity").innerHTML = "This Pokemon is immune to: " + listImmunity(id.toLowerCase());
      }
      //Add the type to the current type
      currentType.push(id);
    }
    //There is already a current typing, combine lists
    else if(currentType.length == 1 && currentType[0] != id){
      currentType.push(id);
      //Get first type's weakness/resistance/immunity
      type1weak = [...listWeakness(currentType[0].toLowerCase())];
      type1resistance = [...listResistance(currentType[0].toLowerCase())];
      type1immunity = [...listImmunity(currentType[0].toLowerCase())];
      //Get second type's weakness/resistance/immunity
      type2weak = [...listWeakness(currentType[1].toLowerCase())];
      type2resistance = [...listResistance(currentType[1].toLowerCase())];
      type2immunity = [...listImmunity(currentType[1].toLowerCase())];

      //final weakness/resistance/immunity lists
      finaldoubleweak = [];
      finalweak = [];
      finalresistance = [];
      finaldoubleresistance = [];
      finalimmune = [];

      //Go through the first type's weaknesses
      type1weak.forEach(function(type){
        
        if(type2weak.includes(type)){
          //If both weaknesses contain the same type, add it to the double weakness
          finaldoubleweak.push(type);
          type2weak.splice(type2weak.indexOf(type), 1);
        }
        else if(type2resistance.includes(type)){
          //If the weakness of type1 is in the resistance of type2, remove from the type 2 resistances
          type2resistance.splice(type2resistance.indexOf(type), 1);
        }
        else if(type2immunity.includes(type)){
          finalimmune.push(type);
          type2immunity.splice(type2immunity.indexOf(type), 1);
        }
        else{
          finalweak.push(type);
        }
      });

      //Go through the first type's resistances
      type1resistance.forEach(function(type){
        if(type2resistance.includes(type)){
          //If both resistances contain the same type, add it to the double resistance
          finaldoubleresistance.push(type);
          type2resistance.splice(type2resistance.indexOf(type), 1);
        }
        else if(type2weak.includes(type)){
          //If the weakness of type2 is in the resistance of type1, remove it as a weakness
          type2weak.splice(type2weak.indexOf(type), 1);
        }
        else if(type2immunity.includes(type)){
          finalimmune.push(type);
          type2immunity.splice(type2immunity.indexOf(type), 1);
        }
        else{
          finalresistance.push(type);
        }
      });

      //Go through first type's immunities
      type1immunity.forEach(function(type){
        finalimmune.push(type);
      });

      //Leftover weakness/resistance/immunities
      type2weak.forEach(function(type){
        finalweak.push(type);
      });
      type2resistance.forEach(function(type){
        finalresistance.push(type);
      });
      type2immunity.forEach(function(type){
        finalimmune.push(type);
      });

      //Update HTML
      document.getElementById("currType").innerHTML = currentType;
      if(finalweak.length == 0){
        document.getElementById("weakness").innerHTML = "This Pokemon is weak to: None";
      }
      else{
        document.getElementById("weakness").innerHTML = "This Pokemon is weak to: " + finalweak;
      }
      if(finalresistance.length == 0){
        document.getElementById("resistance").innerHTML = "This Pokemon is resistant to: None";
      }
      else{
        document.getElementById("resistance").innerHTML = "This Pokemon is resistant to: " + finalresistance;
      }
      if(finalimmune.length == 0){
        document.getElementById("immunity").innerHTML = "This Pokemon is immune to: None";
      }
      else{
        document.getElementById("immunity").innerHTML = "This Pokemon is immune to: " + finalimmune
      }
      if(finaldoubleweak.length != 0){
        document.getElementById("doubleweakness").innerHTML = "This Pokemon is 4x weak to: " + finaldoubleweak;
      }
      if(finaldoubleresistance.length != 0){
        document.getElementById("doubleresistance").innerHTML = "This Pokemon is 4x resistant to: " + finaldoubleresistance;
      }
    }
  });
}

//Call set listener
types.forEach(setEventListener);
document.getElementById("clear").addEventListener("click", function(){
  currentType = [];
  document.getElementById("currType").innerHTML = "";
  document.getElementById("weakness").innerHTML = "This Pokemon is weak to: None";
  document.getElementById("resistance").innerHTML = "This Pokemon is resistant to: None";
  document.getElementById("immunity").innerHTML = "This Pokemon is immune to: None";
  document.getElementById("doubleweakness").innerHTML = "";
  document.getElementById("doubleresistance").innerHTML = "";
});