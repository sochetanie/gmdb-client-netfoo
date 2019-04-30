function isEven(num) {
    if (num % 2 === 0) {
        return true
    }
}

/**
 * This is a currying function that takes a driving age and checks it OK to drive.
 * @param {int} drivingAge 
 */
const checkDrivingAge = (drivingAge) => {
    return function (personAge) {
        return personAge >= drivingAge ? "You are old enough to drive." : "You are not old enough to drive.";
    }
};
