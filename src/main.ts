import { LoadedFile } from "./types";
import { loadFile } from "./loadFile";
import "./style.css";

(function init() {
  document.getElementById("file-selector")!.addEventListener("change", (e: Event) => {
    const fileInput = e.target as HTMLInputElement;
    if (fileInput.files) {
      const file = fileInput.files[0];
      console.log(`Loading: ${file}`);
      const loadedFile = loadFile(file);
      selectedFileChanged(loadedFile);
    } else {
      throw new Error("unable to select a file");
    }
  });
})();

async function selectedFileChanged(loadedFile: LoadedFile) {
  let currentSlice: number[] = [];
  const hexDiv = document.getElementById("hex-view") as HTMLDivElement;
  const asciiDiv = document.getElementById("ascii-view") as HTMLDivElement;

  if (!hexDiv || !asciiDiv) {
    throw new Error("One of the html elements for viewing the output doesn't exist!");
  }

  const { fileName, fileSize, read } = loadedFile;
  console.log("Filename: ", fileName);
  console.log("Filesize: ", fileSize);

  try {
    currentSlice = await read(50, 500);
    sliceChanged(currentSlice, hexDiv, asciiDiv);
  } catch (e) {
    console.log(e);
  }
}

function sliceChanged(slice: number[], hexDiv: HTMLDivElement, asciiDiv: HTMLDivElement) {
  console.log(slice);
  setHexView(hexDiv, slice);
  setAsciiView(asciiDiv, slice);
}

function setHexView(hexDiv: HTMLDivElement, data: number[]) {
  let str = "";
  data.forEach(d => d < 16 ? str += "0" + d.toString(16).toUpperCase() : str += d.toString(16).toUpperCase());
  hexDiv.innerHTML = "<p>" + str + "</p>"
}

function setAsciiView(asciiDiv: HTMLDivElement, data: number[]) {
  let str = "";
  data.forEach(d => str += String.fromCharCode(d));
  asciiDiv.innerHTML = "<p>" + str + "</p>"
}