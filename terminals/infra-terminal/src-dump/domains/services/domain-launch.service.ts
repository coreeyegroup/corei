export function openDomainInTab(
  domainId: string
) {

  const url =
    `/?domain=${domainId}`;

  window.open(
    url,
    "_blank"
  );

}


export function openDomainInWindow(
  domainId: string
) {

  const url =
    `/?domain=${domainId}`;

  window.open(
    url,
    "_blank",
    [
      "width=1800",
      "height=1000",
      "resizable=yes",
      "scrollbars=yes"
    ].join(",")
  );

}
