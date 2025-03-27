import { useContext, createContext, ReactNode } from "react";
import api from "../../utlis/axios.Config";



interface FilesDwonaloadContextProps {
    (endpoint: string, filename: string): Promise<void>;
};


interface FilesDownloadProviderProps {
    children: ReactNode

}




export const FilesDwonaloadContext = createContext<FilesDwonaloadContextProps | null>(null);


export const useFilesDownload = () => {
    const context = useContext(FilesDwonaloadContext)

    if(!context) {
        throw new Error("useFilesDownload must be used within a FilesDownloadProvider");

    }
    return context;
}



export const FilesDownloadProvider = ({children}: FilesDownloadProviderProps) => {

    const downloadFiles = async (endpoint: string, filename: string) : Promise<void> => {
        
        try {
            const response = await api.get(endpoint, {responseType: "blob"});
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
    

        }catch(error) {
            console.error(`Error downloading file from ${endpoint}`, error);
        };

            
    }
    
    return (
        <FilesDwonaloadContext.Provider value={downloadFiles}>
            {children}

        </FilesDwonaloadContext.Provider>
    )

    


}