import { LoadedFile } from "./types";
import { loadFile } from "./loadFile";

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

function selectedFileChanged(loadedFile: LoadedFile) {
  const { fileName, fileSize } = loadedFile;
  console.log("Filename: ", fileName);
  console.log("Filesize: ", fileSize);
}