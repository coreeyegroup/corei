/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-015
 * File       : dependency-resolver.ts
 * Purpose    : Runtime Dependency Resolver
 * =============================================================================
 */

export class DependencyResolver {

    resolve<T>(

        dependency: T

    ): T {

        return dependency;

    }

}

export const RuntimeDependencyResolver =

    new DependencyResolver();
