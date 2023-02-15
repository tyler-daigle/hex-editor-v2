import { LoadedFile } from "./types";

export function loadFile(selectedFile: File): LoadedFile {
    const fileName = selectedFile.name;
    const fileSize = selectedFile.size;
    let numBytesRead = 0;

    const read = async (start: number, end: number): Promise<number[]> => {
        const slice = await selectedFile.slice(start, end).arrayBuffer();
        const data = new Uint8Array(slice);
        const numericValues: number[] = [];

        setNumBytesRead(data.length);

        for (let num of data) {
            numericValues.push(num);
        }
        return numericValues;
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