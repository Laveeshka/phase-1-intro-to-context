// Your code here
function createEmployeeRecord(recordArray){
    return {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfRecordArrays){
    return arrayOfRecordArrays.map(recordArray => createEmployeeRecord(recordArray));
}

function createTimeInEvent(employeeRecord, dateTime){
    //YYYY-MM-DD HHMM
    let [date, hour] = dateTime.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date 
    })

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime){
    //YYYY-MM-DD HHMM
    let [date, hour] = dateTime.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date 
    })

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, matchedDate){
    const {hour:hourIn} = employeeRecord.timeInEvents.find(timeInEvent => timeInEvent.date === matchedDate)
    const {hour:hourOut} = employeeRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date === matchedDate)
    const hoursWorked = (hourOut-hourIn)/100
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, matchedDate){
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, matchedDate);
}

function allWagesFor(employeeRecord){
    //find all dates
    const allDates = employeeRecord.timeInEvents.map(timeInEvent => timeInEvent.date); //returns an array of all dates
    //accumulate the value of all dates
    const allWages = allDates.reduce((acc, matchedDate) => {
        return acc + wagesEarnedOnDate(employeeRecord, matchedDate)
    }, 0);

    return allWages;
}

function calculatePayroll(arrayOfMultipleEmployees){
    const payroll = arrayOfMultipleEmployees.reduce((acc, employeeRecord) => {
        return acc + allWagesFor(employeeRecord)
    }, 0);

    return payroll;
}