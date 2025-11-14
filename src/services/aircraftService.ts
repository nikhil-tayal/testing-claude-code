import { AircraftData } from '../types/aircraft.types';
import { AircraftDataGenerator } from '../generators/aircraftGenerator';

/**
 * Aircraft Service
 * Main service interface for generating aircraft data
 */
export class AircraftService {
  private cache: Map<string, AircraftData>;

  constructor() {
    this.cache = new Map();
  }

  /**
   * Get aircraft data by serial number
   * @param serialNumber - Aircraft serial number
   * @returns Complete aircraft data
   */
  getAircraftData(serialNumber: string): AircraftData {
    const normalizedSerialNumber = serialNumber.toUpperCase().trim();

    if (!normalizedSerialNumber) {
      throw new Error('Serial number cannot be empty');
    }

    // Check cache first
    if (this.cache.has(normalizedSerialNumber)) {
      return this.cache.get(normalizedSerialNumber)!;
    }

    // Generate new data
    const generator = new AircraftDataGenerator(normalizedSerialNumber);
    const aircraftData = generator.generate();

    // Cache the result
    this.cache.set(normalizedSerialNumber, aircraftData);

    return aircraftData;
  }

  /**
   * Get multiple aircraft data by serial numbers
   * @param serialNumbers - Array of serial numbers
   * @returns Array of aircraft data
   */
  getMultipleAircraftData(serialNumbers: string[]): AircraftData[] {
    return serialNumbers.map(sn => this.getAircraftData(sn));
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  getCacheSize(): number {
    return this.cache.size;
  }
}

// Export singleton instance
export const aircraftService = new AircraftService();
