export interface IElectronAPI {
  save: (value) => Promise<void>;
  download: (value) => Promise<void>;
  openWeb: () => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
