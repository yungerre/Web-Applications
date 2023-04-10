function DatePicker(id, callback) {
    this.id = id;
    this.callback = callback;
    this.months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var date;
    if (date) {
        callback.call(this.id, this.date);
    }
}

DatePicker.prototype.render = function(newDate) {
    if (this.date !== newDate) {
        this.date = newDate;
        var elem = document.getElementById(this.id);
        if (!elem) {
            console.log("elem is null");
        }
        createDateMonth(this.months, this.date, elem, this.callback, this.id);
    }
}

function createDateMonth(months, date, elem, callback, id) {
    var table1 = document.createElement("table");
    table1.setAttribute("class", "table1");
    var tableBody1 = document.createElement("tbody");
    var row1 = document.createElement("tr");
    var textValues1 = ["", date.getFullYear(), ""];
    for (var i = 0; i < 3; i++) {
        var cell1 = document.createElement("td");
        var value1 = document.createTextNode(textValues1[i]);
        cell1.appendChild(value1);
        setClassAttribute(cell1, i);
        row1.appendChild(cell1);
    }
    row1.setAttribute("class", "row1");
    tableBody1.appendChild(row1);

    var row2 = document.createElement("tr");
    var textValues2 = ["<", months[date.getMonth()], ">"];
    for (var j = 0; j < 3; j++) {
        var cell2 = document.createElement("td");
        var value2 = document.createTextNode(textValues2[j]);
        cell2.appendChild(value2);
        setClassAttribute(cell2, j);
        if (j == 0) {
            cell2.onclick = function() {prevMonth(this, elem, date, months, callback, id)};
        }
        if (j == 2) {
            cell2.onclick = function() {nextMonth(this, elem, date, months, callback, id)};
        }
        row2.appendChild(cell2);
    }
    tableBody1.appendChild(row2);
    table1.appendChild(tableBody1);
    elem.appendChild(table1);

    var table2 = document.createElement("table");
    table2.setAttribute("class", "table2");
    var tableBody2 = document.createElement("tbody");
    addWeekDays(tableBody2);
    table2.appendChild(tableBody2);
    elem.appendChild(table2);

    var table3 = document.createElement("table");
    table3.setAttribute("class", "table3");
    var tableBody3 = document.createElement("tbody");
    addAllDates(tableBody3, date, callback, id);
    table3.appendChild(tableBody3);
    elem.appendChild(table3);
}

function setClassAttribute(cell, i) {
    if (i === 0) {
        cell.setAttribute("class", "left");
    } else if (i == 1) {
        cell.setAttribute("class", "center");
    } else {
        cell.setAttribute("class", "right");
    }
}
function addWeekDays(tableBody2) {
    var row3 = document.createElement("tr");
    var textValues3 = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    for (var i = 0; i < 7; i++) {
        var cell3 = document.createElement("td");
        var value3 = document.createTextNode(textValues3[i]);
        cell3.appendChild(value3);
        cell3.setAttribute("class", "center");
        row3.appendChild(cell3);
    }
    row3.setAttribute("class", "row3");
    tableBody2.appendChild(row3);
}

function addAllDates(tableBody3, date, callback, id) {
    var numDaysOfMonth = getNumDays(date.getMonth() + 1, date);
    var startDayOfMonth = date.getDay();
    var row4 = document.createElement("tr");
    if (startDayOfMonth !== 0) {
        var numDaysOfPrevMonth = getNumDays(date.getMonth(), date);
        var startDateOfPrevMonth = numDaysOfPrevMonth - startDayOfMonth + 1;
        for (var i = 0; i < startDayOfMonth; i++) {
            var cell4 = document.createElement("td");
            var value4 = document.createTextNode(startDateOfPrevMonth + i);
            cell4.appendChild(value4);
            cell4.setAttribute("class", "gray");
            row4.appendChild(cell4);
        }
    }
    for (var i = startDayOfMonth; i < 7; i++) {
        var cell4 = createCell(id, date, 1 + i - startDayOfMonth, callback);
        row4.appendChild(cell4);
    }
    tableBody3.appendChild(row4);

    var curr = 7 - startDayOfMonth + 1;
    var day = 0;
    var row;
    while (curr <= numDaysOfMonth) {
        if (day === 0) {
            row = document.createElement("tr");
        }
        var cell = createCell(id, date, curr, callback);
        row.appendChild(cell);
        day++;
        curr++;
        if (day === 7) {
            tableBody3.appendChild(row);
            day = 0;
        }
    }

    if (day !== 0) {
        for (var i = day; i < 7; i++) {
            var cell = document.createElement("td");
            var value = document.createTextNode(i - day + 1);
            cell.appendChild(value);
            cell.setAttribute("class", "gray");
            row.appendChild(cell);
        }
        tableBody3.appendChild(row);
    }

}
function getNumDays(month, date) {
    if (month < 1) {
        month = 12;
    }
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8
        || month === 10 || month === 12) {
        return 31;
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30;
    } else {
        var year = date.getFullYear();
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return 29;
        }
        return 28;
    }
}

function createCell(id, date, value, callback) {
    var cell = document.createElement("td");
    cell.addEventListener("click", function() {
        clickDate(id, date, cell, callback);
    });
    var value = document.createTextNode(value);
    cell.appendChild(value);
    cell.setAttribute("class", "black");
    return cell;
}

function clickDate(id, date, cell, callback) {
    date.day = cell.firstChild.textContent;
    date.year = date.getFullYear();
    date.month = date.getMonth() + 1;
    callback.call(this, id, date);
}

function prevMonth(event, elem, date, months, callback, id) {
    if (!elem) {
        console.log("elem is null");
    }
    elem.innerHTML = "";
    if (date.getMonth() >= 1) {
        date.setMonth(date.getMonth() - 1);
    } else {
        date.setYear(date.getFullYear() - 1);
        date.setMonth(11);
    }
    createDateMonth(months, date, elem, callback, id);
}

function nextMonth(event, elem, date, months, callback, id) {
    if (!elem) {
        console.log("elem is null");
    }
    elem.innerHTML = "";
    if (date.getMonth() <= 10) {
        date.setMonth(date.getMonth() + 1);
    } else {
        date.setYear(date.getFullYear() + 1);
        date.setMonth(0);
    }
    createDateMonth(months, date, elem, callback, id);
}
