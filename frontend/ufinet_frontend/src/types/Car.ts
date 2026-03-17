export interface CarRequest{
    brand: string;
    model: string;
    color: string;
    year: number
    carPlate:string;
    imageUrl: string;
}

export interface CarResponse{
    id: number;
    brand: string;
    model: string;
    color: string;
    year: number;
    carPlate:string;
    imageUrl: string;

}