/**
 * ============================================================================
 * Command Registry
 * ============================================================================
 */

const commands = new Map<string, () => void>();

export const commandRegistry = {

    register(

        id: string,

        command: () => void

    ) {

        commands.set(id, command);

    },

    execute(id: string) {

        commands.get(id)?.();

    }

};
