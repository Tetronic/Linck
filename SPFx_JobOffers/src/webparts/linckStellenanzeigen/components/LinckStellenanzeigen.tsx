import * as React from 'react';
import type { ILinckStellenanzeigenProps } from './ILinckStellenanzeigenProps';

import { IJobOffer } from "./Interfaces"

import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

interface IAppState {
  jobOffers: IJobOffer[];
}

export default class LinckStellenanzeigen extends React.Component<ILinckStellenanzeigenProps, IAppState> {
    
  constructor(props: ILinckStellenanzeigenProps) {
    super(props);

    this.state = { jobOffers: [] };
  }

  public componentDidMount() {
    this.getData();
  }

  public getData(){
    
      // source of job offers: 
      const jobOffersSourceURL = "https://www.arbeiten-bei-linck.com/portal/intranet/jobPublication/list.json";

      this.props.myhttpclient
      .get(jobOffersSourceURL, HttpClient.configurations.v1)
      .then((res: HttpClientResponse): Promise<any> => {
        console.log("HttpClientResponse");
        return res.json();
      })
      .then((response: any): void => {
        
        this.setState({ jobOffers: response })
      });

    }

    public render(): React.ReactElement<ILinckStellenanzeigenProps> {

      const jobOffers = this.state.jobOffers;
      console.log(jobOffers);

      return (
        <div id="headerStartPage">
          <h2 style={{fontSize: "20px", fontWeight: "600"}}>Stellenangebote</h2>
          <ul aria-live="polite">
            
            {
              jobOffers.map((offer: IJobOffer) => {
                return (
                  <li className='linckJobOffersLink'>
                    <a href={offer.jobPublicationURL} target="_blank" style={{color: "black"}}>
                      <div>
                        <h3 style={{fontSize: "14px", fontWeight: "400"}}>{offer.position}</h3>
                      </div>
                    </a>
                  </li>
                  );
              })
            }

          </ul>
        </div>
      );
    }
}
