/**
 * Example usage of the Aircraft Data Generator
 */

import { aircraftService } from './services/aircraftService';
import { DataFormatter } from './formatters/dataFormatter';

// Example 1: Get data for a single aircraft by serial number
console.log('========================================');
console.log('Example 1: Single Aircraft Query');
console.log('========================================\n');

const serialNumber1 = 'AC-12345-XYZ';
const aircraft1 = aircraftService.getAircraftData(serialNumber1);

// Display formatted data
console.log(DataFormatter.formatAircraftData(aircraft1));

console.log('\n\n========================================');
console.log('Example 2: Multiple Aircraft Query');
console.log('========================================\n');

// Example 2: Get data for multiple aircraft
const serialNumbers = ['AC-12345-XYZ', 'AC-67890-ABC', 'AC-11111-QWE'];
const aircraftList = aircraftService.getMultipleAircraftData(serialNumbers);

aircraftList.forEach((aircraft, index) => {
  console.log(`\nAircraft ${index + 1}:`);
  console.log(DataFormatter.formatSummary(aircraft));
});

console.log('\n\n========================================');
console.log('Example 3: JSON Output');
console.log('========================================\n');

// Example 3: Get data as JSON
const serialNumber2 = 'AC-99999-TEST';
const aircraft2 = aircraftService.getAircraftData(serialNumber2);
const jsonOutput = DataFormatter.formatAsJSON(aircraft2, true);

console.log('First 50 lines of JSON output:');
console.log(jsonOutput.split('\n').slice(0, 50).join('\n'));
console.log('...');

console.log('\n\n========================================');
console.log('Example 4: Accessing Specific Data');
console.log('========================================\n');

// Example 4: Access specific fields
const aircraft3 = aircraftService.getAircraftData('AC-55555-DEMO');

console.log('Model:', aircraft3.model);
console.log('Company Name (Manufacturer):', aircraft3.manufacturer);
console.log('Owner:', aircraft3.owner.name);
console.log('Operator:', aircraft3.operator.name);
console.log('Manufacturing Year:', aircraft3.manufacturingYear);
console.log('License (Registration):', aircraft3.registration.registrationNumber);
console.log('\nPilots:');
aircraft3.authorizedPilots.forEach((pilot, index) => {
  console.log(`  ${index + 1}. ${pilot.name} - License: ${pilot.licenseNumber} - Hours: ${pilot.flightHours}`);
});

console.log('\nOther Data:');
console.log('  Total Flight Hours:', aircraft3.totalFlightHours);
console.log('  Insurance Provider:', aircraft3.insurance.provider);
console.log('  Home Base:', aircraft3.homeBase);
console.log('  Primary Use:', aircraft3.primaryUse);
console.log('  Special Equipment:', aircraft3.specialEquipment.length, 'items');
console.log('  Maintenance Records:', aircraft3.maintenanceRecords.length, 'records');
console.log('  Flight Logs:', aircraft3.flightLogs.length, 'logs');

console.log('\n\n========================================');
console.log('Example 5: Consistent Data Generation');
console.log('========================================\n');

// Example 5: Same serial number always generates same data
const serialNumber3 = 'AC-CONSISTENT-123';
const firstCall = aircraftService.getAircraftData(serialNumber3);
const secondCall = aircraftService.getAircraftData(serialNumber3);

console.log('Serial Number:', serialNumber3);
console.log('First call model:', firstCall.model);
console.log('Second call model:', secondCall.model);
console.log('Models match:', firstCall.model === secondCall.model);
console.log('Complete data match:', JSON.stringify(firstCall) === JSON.stringify(secondCall));

console.log('\n\nCache size:', aircraftService.getCacheSize(), 'aircraft in cache');
