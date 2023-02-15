import { LoadedFile, HexFileData } from "./types";

export function loadFile(selectedFile: File): LoadedFile {
    const fileName = selectedFile.name;
    const fileSize = selectedFile.size;
    let numBytesRead = 0;

    const read = async (start: number, end: number): Promise<HexFileData> => {
        const slice = await selectedFile.slice(start, end).arrayBuffer();
        const data = new Uint8Array(slice);
        const numericValues: number[] = [];

        setNumBytesRead(data.length);

        for (let num of data) {
            numericValues.push(num);
        }

        // endOffset might not be exactly what was requested if we are near the
        // end of the file.
        return {
            data: numericValues,
            startOffset: start,
            endOffset: start + data.length
        };
    }

    const close = () => {
        return null;
    }

    const setNumBytesRead = (count: number) => numBytesRead = count;
    const getNumBytesRead = () => numBytesRead;

    return {
        fileName,
        fileSize,
        read,
        close,
        getNumBytesRead
    }
}