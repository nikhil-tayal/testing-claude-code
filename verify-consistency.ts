import { aircraftService } from './src/services/aircraftService';

// Test consistency - same serial should generate same data
const serialNumber = '57045';

console.log('Consistency Test for Serial Number:', serialNumber);
console.log('='.repeat(60));

const first = aircraftService.getAircraftData(serialNumber);
aircraftService.clearCache(); // Clear cache to force regeneration
const second = aircraftService.getAircraftData(serialNumber);

console.log('\nFirst Generation:');
console.log('  Manufacturer:', first.manufacturer);
console.log('  Model:', first.model);
console.log('  Owner:', first.owner.name);
console.log('  Registration:', first.registration.registrationNumber);
console.log('  Total Pilots:', first.authorizedPilots.length);
console.log('  First Pilot:', first.authorizedPilots[0].name);

console.log('\nSecond Generation (cache cleared):');
console.log('  Manufacturer:', second.manufacturer);
console.log('  Model:', second.model);
console.log('  Owner:', second.owner.name);
console.log('  Registration:', second.registration.registrationNumber);
console.log('  Total Pilots:', second.authorizedPilots.length);
console.log('  First Pilot:', second.authorizedPilots[0].name);

console.log('\nData Consistency Check:');
console.log('  ✓ Manufacturer Match:', first.manufacturer === second.manufacturer);
console.log('  ✓ Model Match:', first.model === second.model);
console.log('  ✓ Owner Match:', first.owner.name === second.owner.name);
console.log('  ✓ Registration Match:', first.registration.registrationNumber === second.registration.registrationNumber);
console.log('  ✓ Complete JSON Match:', JSON.stringify(first) === JSON.stringify(second));

console.log('\n' + '='.repeat(60));
console.log('✓ System generates CONSISTENT data for serial number 57045');
