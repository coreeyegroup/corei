import {
  domainRegistry
}
from "../../domains/registry/domain.registry";

import {
  useDomainContextMenu
}
from "../../domains/store/domain-context-menu.store";

export function LeftNavigation() {

  const {
    openMenu
  } =
    useDomainContextMenu();

  return (

    <aside className="left-navigation">

      {domainRegistry.map(
        domain => (

          <div

            key={
              domain.domain_id
            }

            className="nav-item"

            onContextMenu={
              event => {

                event.preventDefault();

                openMenu(
                  domain.domain_id,
                  event.clientX,
                  event.clientY
                );

              }
            }

          >

            <div className="nav-code">

              {domain.code}

            </div>

            <div className="nav-title">

              {domain.title}

            </div>

          </div>

        )
      )}

    </aside>

  );

}
