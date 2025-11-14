/**
 * Aircraft Serial Data Generator
 * A system to generate comprehensive aircraft data based on serial numbers
 */

export { AircraftData, Pilot, MaintenanceRecord, FlightLog, Insurance, Registration, EngineSpec } from './types/aircraft.types';
export { AircraftDataGenerator } from './generators/aircraftGenerator';
export { AircraftService, aircraftService } from './services/aircraftService';
export { DataFormatter } from './formatters/dataFormatter';
export { SeededRandom } from './utils/seededRandom';

// Re-export the singleton service instance for convenience
import { aircraftService } from './services/aircraftService';
export default aircraftService;
