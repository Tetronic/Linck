export interface IData{
    JobOffers?: IJobOffer[],

}
export interface IJobOffer {
    Title: string,
    position: string,
    jobPublicationURL: string;
}