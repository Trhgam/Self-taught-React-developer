const user = {
  name: "HongGam",
  age: 21,
  sex: "female",
};

// const name = user.name;
// const age = user.age;
// const sex = user.sex;

//------------------------------

const { name, age: Userage, sex } = user;
console.log(name, Userage, sex);


//------------------------------
//Destructuring with array
const arr = [1, 2, 3, 4, 5];