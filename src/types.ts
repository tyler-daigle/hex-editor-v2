export interface LoadedFile {
    fileName: string;
    fileSize: number;
    read: (start: number, end: number) => Promise<HexFileData>;
    close: () => void;
    getNumBytesRead: () => number;
}

export interface HexFileData {
    data: number[];
    startOffset: number;
    endOffset: number;
}