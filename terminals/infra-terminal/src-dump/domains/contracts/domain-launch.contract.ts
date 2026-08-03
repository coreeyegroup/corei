export type DomainLaunchMode =

  | "embedded"
  | "tab"
  | "window";


export interface DomainLaunchContract {

  domain_id: string;

  title: string;

  desktop_id: string;

  route: string;

  launch_mode:
    DomainLaunchMode;

}