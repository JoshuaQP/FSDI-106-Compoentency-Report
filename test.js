function getHelloMessage(name) {

    return "hello" + name + ", how is it going?";
}



// Home Work results
function divide(numerator, denominator) {
    if (denominator === 0 || isNaN(denominator)) {
        return null;
    } else {
        return numerator / denominator;
    }
}

function sum(num1, num2) {
    return num1 + num2;
}



class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.owner = "student";
    }
}

function testClass() {
    let c1 = new Car("form", "A", "1934");
    console.log(c1);
}


// object constructor
function Dog(name, age, color) {
    this.name = name;
    this.age = age;
    this.color = color;
    this.owner = "Sergio";
}

// this is an object literal
function createObjects() {

    let data = {
        name: 'Test1',
        speed: 111,
        color: "Red",
        size: 12
    };

    console.log(data);
}

// object constructor
let fido = new Dog("Fido", 2, 'white');
console.log(fido);

let lola = new Dog("Lola", 4, 'pink');
console.log(lola);


function runTests() {
    console.log("starting tests");

    let message = getHelloMessage("Sergio");
    console.log(message);

    let result = sum(12, 49);
    console.log("the results is: " + result);



    //   homework 1
    // you should not allow user to divid by zero
    let divRes = divide(9, 3);
    let divRes2 = divide(1, 8);
    let divRes3 = divide(10, 0);
    console.log("the result is:" + divRes);
    console.log("the result is:" + divRes2);
    console.log("the result is:" + divRes3);
}









function testAjaxGet() {
    $.ajax({
        url: "https://restclass.azurewebsites.net/api/test",
        type: "GET",
        success: function (response) {
            console.log("server say: ", response);

        },

        error: function (errorDetails) {
            console.log("Error", errorDetails);

        }
    });
}



function testArrays() {
    let nums = [1, 123, 543, 3, 3456, 5678, 234, 4567, 789, 234];

    let total = 0

    //sum the nums and print the total
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
    }
    console.log("Total:", total);

}