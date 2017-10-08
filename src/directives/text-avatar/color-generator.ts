export class ColorGenerator {
    COLORS: any[] = ['#8b4789', '#4a708b', '#333333', '#794044', '#0099cc', '#fb6f74', '#b6313e', '#43344f', '#4472a7', '#008b76', '#ffcc00', '#daa520', '#000099', '#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb', '#64b5f6',
        '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784', '#aed581', '#ff8a65', '#d4e157', '#673ab7',
        '#ffb74d', '#a1887f', '#90a4ae'];

    public getColor(str: string): string {
        return this.COLORS[Math.abs(this.toNumber(str)) % this.COLORS.length];
    }

    private toNumber(str: string): number {
        let h = 0;

        for (let i = 0; i < str.length; i++) {
            h = 31 * h + str.charCodeAt(i);
            h |= 0; // Convert to 32bit integer
        }

        return h;
    };
}