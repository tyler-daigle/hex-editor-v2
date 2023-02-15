export interface LoadedFile {
    fileName: string;
    fileSize: number;
    read: (start: number, end: number) => Promise<number[]>;
    close: () => void;
    getNumBytesRead: () => number;
}