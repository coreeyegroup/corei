export interface DesktopBootstrapResult {

  domainId: string;

  desktopId: string;

}


export function resolveDesktopBootstrap():
DesktopBootstrapResult {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const domainId =
    params.get("domain") ??
    "d01";


  return {

    domainId,

    desktopId:
      `${domainId}-desktop`

  };

}
