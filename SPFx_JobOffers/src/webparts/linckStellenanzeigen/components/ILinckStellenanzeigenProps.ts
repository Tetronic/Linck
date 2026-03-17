import { HttpClient } from "@microsoft/sp-http";
export interface ILinckStellenanzeigenProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  myhttpclient:HttpClient;  
}

