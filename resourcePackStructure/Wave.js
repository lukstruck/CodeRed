export default class Wave {
    /**
     *
     * @param name  Unique Identifier
     * @param enemies   Array of enemies to be spawned with spacing between them
     * @param startsWith    Event that causes this wave to trigger after delay seconds
     * @param delay Delay after startsWith triggered to spawn the waves enemies
     * @param spacing   Spacing in seconds between the spawned enemies
     */
    constructor(name: String, enemies: Array, startsWith: WaveStartEvent, delay: number, spacing: number){
        this.name = name;
        this.enemies = enemies;
        this.startsWith = startsWith;
        this.delay = delay;
        this.spacing = spacing;
    }
}

export const WaveStartEvent = {
    PREV_WAVE: "previous Wave"
};