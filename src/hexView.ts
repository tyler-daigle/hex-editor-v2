export function setHexView(hexDiv: HTMLDivElement, data: number[]) {

    hexDiv.innerHTML = "";

    // convert the raw data into a string of hex digits.
    // Slice the string array into 16 piece chunks and create <tr>s from them.
    const hexStrings = convertToHex(data);
    const { table, tbody } = createHexTable();
    const sliceSize = 16;

    let currData = hexStrings.slice(0, sliceSize);
    let sliceCount = 1;


    while (currData.length !== 0) {
        const row = createHexRow(currData);
        tbody.appendChild(row);
        sliceCount += 1;
        // get next slice

        currData = hexStrings.slice(sliceSize * sliceCount, sliceSize * sliceCount + sliceSize);
    }

    hexDiv.appendChild(table);
    // hexDiv.innerHTML = "<p>" + str + "</p>"
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

function createHexTable(numCols: number = 16) {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    const headerRow = document.createElement("tr");
    tbody.appendChild(headerRow);

    for (let i = 0; i < numCols; i++) {
        const th = document.createElement("th");
        th.innerHTML = i.toString(16);
        headerRow.appendChild(th);
    }

    return { table, tbody };
}

function createHexRow(hexData: string[]) {

    const tr = document.createElement("tr");

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