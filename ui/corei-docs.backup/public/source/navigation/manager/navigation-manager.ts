import type { NavigationModel } from "../models/navigation";
import { NavigationRegistry } from "../registry/navigation-registry";

export class NavigationManager {

    private readonly model: NavigationModel;

    constructor() {
        this.model = NavigationRegistry;
    }

    public getModel(): Readonly<NavigationModel> {
        return this.model;
    }

}
