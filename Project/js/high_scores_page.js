"use strict";
fetch("../resources/data.json").then(response => response.json())
    .then(processData)
    .catch((error) => {
        console.error('Error:', error);
    });
var totalData, totalPages, currentPage;

function processData(data) {
    totalData = data;
    totalPages = Math.ceil(totalData.length / 10);
    currentPage = 1;
    makeTable(totalData.slice(0, 10));
}

function addArrows(table) {
    let tr = document.createElement("tr");
    tr.style.background = "rgb(98, 172, 62)";
    table.appendChild(tr);
    let td1 = document.createElement("td");
    td1.style.borderColor = "rgb(98, 172, 62)";
    td1.style.borderWidth = "3px";
    tr.appendChild(td1);
    if (currentPage > 1) {
        td1.innerHTML = '<button class="btn" onClick="genPage(-1)"><img src="./resources/arrow-back-filled.svg"></button>';
    }
    let td2 = document.createElement("td");
    td2.setAttribute("colspan", "2");
    td2.innerHTML = `Page ${currentPage}/${totalPages}`;
    td2.style.borderColor = "rgb(98, 172, 62)";
    td2.style.borderWidth = "3px";
    tr.appendChild(td2);
    let td3 = document.createElement("td");
    td3.style.borderColor = "rgb(98, 172, 62)";
    td3.style.borderWidth = "3px";
    tr.appendChild(td3);
    if (currentPage < totalPages) {
        td3.innerHTML = '<button class="btn" onClick="genPage(1)"><img src="./resources/arrow-next-filled.svg"></button>';
    }
}

function makeTable(data) {
    let tbody = document.getElementById("t-body");
    tbody.innerHTML = "";
    for (let obj of data) {
        addRow(obj.number, obj.guesses, obj.firstBullsCows.bulls, obj.firstBullsCows.cows, tbody);
    }
    addArrows(tbody);
}

function addRow(number, guesses, bulls, cows, table) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    tr.innerHTML = `<td>${number}</td> <td>${guesses}</td> <td>${bulls}</td> <td>${cows}</td>`;
}

function genPage(number) {
    currentPage += number;
    makeTable(totalData.slice((currentPage - 1) * 10, currentPage * 10));
}