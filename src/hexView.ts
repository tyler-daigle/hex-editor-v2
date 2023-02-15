export function setHexView(hexDiv: HTMLDivElement, data: number[]) {
    let str = "";
    data.forEach(d => d < 16 ? str += "0" + d.toString(16).toUpperCase() : str += d.toString(16).toUpperCase());
    hexDiv.innerHTML = "<p>" + str + "</p>"
}