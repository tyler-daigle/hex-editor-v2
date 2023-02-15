import { LoadedFile } from "./types";
import { loadFile } from "./loadFile";
import { setHexView } from "./hexView";
import "./style.css";

(function init() {

  // event listener for when the file selector is changed
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

  // event listener for testing button
  document.getElementById("test-button")?.addEventListener("click", () => {
    testData();
  })
})();


function fakeData(size: number = 500) {
  const nums = [];

  for (let i = 0; i < size; i++) {
    nums.push(Math.floor(Math.random() * 255));
  }
  return nums;
}

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

function testData() {
  const hexDiv = document.getElementById("hex-view") as HTMLDivElement;
  const asciiDiv = document.getElementById("ascii-view") as HTMLDivElement;
  let currentSlice = fakeData(500);
  sliceChanged(currentSlice, hexDiv, asciiDiv);
}

function sliceChanged(slice: number[], hexDiv: HTMLDivElement, asciiDiv: HTMLDivElement) {
  console.log(slice);
  setHexView(hexDiv, slice);
  setAsciiView(asciiDiv, slice);
}



function setAsciiView(asciiDiv: HTMLDivElement, data: number[]) {

  // bounds for the printable ASCII character values (in decimal)
  const asciiStart = 32;
  const asciiEnd = 126;

  let str = "";
  data.forEach(d => {
    if (d >= asciiStart && d <= asciiEnd) {
      str += String.fromCharCode(d);
    } else {
      str += ".";
    }
  });
  asciiDiv.innerHTML = "<p>" + str + "</p>"
}