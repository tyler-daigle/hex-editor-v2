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

  const { fileName, fileSize, read } = loadedFile;
  console.log("Filename: ", fileName);
  console.log("Filesize: ", fileSize);

  try {
    currentSlice = await read(0, 50);
    sliceChanged(currentSlice);
  } catch (e) {
    console.log(e);
  }
}

function sliceChanged(slice: number[]) {
  console.log(slice);
  let str = "";

  slice.forEach(s => str += String.fromCharCode(s));

  console.log(str);
}