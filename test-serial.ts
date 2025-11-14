import { aircraftService } from './src/services/aircraftService';
import { DataFormatter } from './src/formatters/dataFormatter';

// Test with serial number 57045
const serialNumber = '57045';
console.log(`Testing Aircraft Serial Data Generator with Serial Number: ${serialNumber}\n`);

const aircraft = aircraftService.getAircraftData(serialNumber);

// Display full formatted data
console.log(DataFormatter.formatAircraftData(aircraft));
