/**
 * ============================================================================
 * Activity Registry
 * ============================================================================
 */

const activities = new Map<string, string>();

export const activityRegistry = {

    register(

        id: string,

        sidebar: string

    ) {

        activities.set(id, sidebar);

    },

    all() {

        return [...activities];

    }

};
