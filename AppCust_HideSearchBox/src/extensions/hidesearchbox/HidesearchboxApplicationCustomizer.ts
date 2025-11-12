import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
// import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HidesearchboxApplicationCustomizerStrings';

const LOG_SOURCE: string = 'HidesearchboxApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHidesearchboxApplicationCustomizerProperties {
  // This is an example; replace with your own property
  //testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HidesearchboxApplicationCustomizer
  extends BaseApplicationCustomizer<IHidesearchboxApplicationCustomizerProperties> {

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    const urlParams = new URLSearchParams(window.location.search);
    const isKiosk = urlParams.get('kiosk');

    if (isKiosk && isKiosk.toLowerCase() === 'true') {
      this.hideSearchBox();
    }

    return Promise.resolve();
  }

  private hideSearchBox(): void {
    const interval = setInterval(() => {
      const searchBox = document.querySelector('[data-automationid="SearchBox"]');
      const searchBox2 = document.querySelector('[id="O365_SearchBoxContainer_container"]');
      if (searchBox) {
        searchBox.remove();
        clearInterval(interval);
      }
      if (searchBox2) {
        searchBox2.remove();
        clearInterval(interval);
      }      
    }, 500);
  }
}
