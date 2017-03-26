"use strict"
function Student(name ,age){
   this.name = name;
   this.age = age;
 }
 Student.prototype.setName = function(name){
   this.name = name;

}
Student.prototype.getName = function(){
    return this.name;
}
var student4 = new Student("zhang",30);
console.log(student4);
student4.setName("wang");
console.log(student4);
console.log(student4.getName());