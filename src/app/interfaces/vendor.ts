export interface Vendor {
    id: number;                       
    companyName: string;              
    tradeName: string;              
    taxId: string;                    
    number: string;                   
    email: string;                     
    websiteUrl?: string;              
    physicalAddress: string;           
    country: string;                   
    annualTurnover?: number;           
    lastEdition?: Date;                
}