import {

    PlatformRegistry

} from "../registry/platform-registry";

export function usePlatform() {

    return {

        platforms: PlatformRegistry

    };

}
