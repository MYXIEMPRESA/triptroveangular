export default interface Place {
    id?: string;
    name: string;
    latitude: number;
    longitude: number;
    description: string;
    image?: File;
    imageURL?: string; 
    categories?: string[]; 
}