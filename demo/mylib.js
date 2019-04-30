function isEven(num) {
    if (num / 2 === 0) {
        return true
    }
}

const checkDrivingAge = (drivingAge) => {
    return function (personAge) {
        return personAge >= drivingAge ? "You are old enough to drive." : "You are not old enough to drive.";
    }
};
