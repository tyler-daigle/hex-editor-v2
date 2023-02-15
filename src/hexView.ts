import { HexFileData } from "./types";

export function setHexView(hexDiv: HTMLDivElement, fileData: HexFileData) {

    const { data, startOffset, endOffset } = fileData;
    hexDiv.innerHTML = "";

    // convert the raw data into a string of hex digits.
    const hexStrings = convertToHex(data);
    const sliceSize = 16;
    let sliceCount = 1;

    const { table, tbody } = createHexTable();


    // Slice the string array into 16 piece chunks and create <tr>s from them.
    let currOffset = startOffset;
    let currData = hexStrings.slice(0, sliceSize);

    // loop through all the data and create table rows and then
    // append them to the table.
    while (currData.length !== 0) {
        // offsetStr is the string used for the row labels (the file offsets)
        const offsetStr = padOffsetLabel(currOffset.toString(16));

        const row = createHexRow(currData, offsetStr);
        tbody.appendChild(row);

        // get next slice        
        sliceCount += 1;
        currData = hexStrings.slice(sliceSize * sliceCount, sliceSize * sliceCount + sliceSize);

        currOffset += sliceSize;
    }

    hexDiv.appendChild(table);
    // hexDiv.innerHTML = "<p>" + str + "</p>"
}

function padOffsetLabel(offset: string) {
    // console.log(offset, offset.length);
    const offsetLabelLength = 8;
    let str = offset;
    // console.log(offsetLabelLength - offset.length);

    if (offset.length < offsetLabelLength) {
        for (let i = 0; i <= offsetLabelLength - offset.length; i++) {
            str = "0" + str;
            // console.log(offset);
        }
    }
    // console.log(offset);
    return str.toUpperCase();
}

// convert the raw numeric data into hex numbers;
function convertToHex(data: number[]): string[] {
    let str: string[] = [];

    for (let i = 0; i < data.length; i++) {
        str.push(padHex(data[i]).toUpperCase());
    }
    return str;
}

// hex values 0xF or less should have a leading 0 padded onto them.
function padHex(num: number): string {
    if (num <= 0xf) {
        return `0${num.toString(16)}`;
    } else {
        return num.toString(16);
    }
}

// createHexTable() creates the actual <table> and <tbody> elements
// They can then be attached to the div.
function createHexTable(numCols: number = 16) {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    const headerRow = document.createElement("tr");
    tbody.appendChild(headerRow);

    // add the blank column header
    headerRow.appendChild(document.createElement("th"));

    // the column labels - hex values 0x0 to 0xF at the top of the hex view
    for (let i = 0; i < numCols; i++) {
        const th = document.createElement("th");
        th.innerHTML = i.toString(16);
        headerRow.appendChild(th);
    }

    return { table, tbody };
}

// createHexRow() creates the <tr> elements. The first <td> cell is
// the file offset, which is passed as rowLabel
function createHexRow(hexData: string[], rowLabel: string = "00000000") {
    const tr = document.createElement("tr");

    const tdLabel = document.createElement("td");
    tdLabel.classList.add("hex-row-label");
    tdLabel.innerHTML = rowLabel;

    tr.appendChild(tdLabel);
    for (const data of hexData) {
        const td = document.createElement("td");
        td.innerHTML = data;
        td.setAttribute("contenteditable", "true");
        td.classList.add("hex-view-table-cell");
        // TODO: add a way to edit 
        // td.addEventListener("input", () => console.log("changed"));
        tr.appendChild(td);
    }
    return tr;
}