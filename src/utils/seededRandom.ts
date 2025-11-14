/**
 * Seeded random number generator for consistent data generation
 * Uses a simple LCG (Linear Congruential Generator) algorithm
 */
export class SeededRandom {
  private seed: number;

  constructor(seed: string | number) {
    // Convert string seed to number
    if (typeof seed === 'string') {
      this.seed = this.hashString(seed);
    } else {
      this.seed = seed;
    }
  }

  /**
   * Hash a string to a number
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Generate next random number between 0 and 1
   */
  next(): number {
    const a = 1664525;
    const c = 1013904223;
    const m = Math.pow(2, 32);
    this.seed = (a * this.seed + c) % m;
    return this.seed / m;
  }

  /**
   * Generate random integer between min and max (inclusive)
   */
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Generate random float between min and max
   */
  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /**
   * Pick random item from array
   */
  pick<T>(array: T[]): T {
    return array[this.nextInt(0, array.length - 1)];
  }

  /**
   * Pick multiple random items from array
   */
  pickMultiple<T>(array: T[], count: number): T[] {
    const result: T[] = [];
    const used = new Set<number>();

    while (result.length < count && result.length < array.length) {
      const index = this.nextInt(0, array.length - 1);
      if (!used.has(index)) {
        used.add(index);
        result.push(array[index]);
      }
    }

    return result;
  }

  /**
   * Generate random boolean
   */
  nextBoolean(): boolean {
    return this.next() > 0.5;
  }

  /**
   * Generate random date between two dates
   */
  nextDate(start: Date, end: Date): Date {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = startTime + this.next() * (endTime - startTime);
    return new Date(randomTime);
  }
}
