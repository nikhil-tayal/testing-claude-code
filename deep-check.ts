import { aircraftService } from './src/services/aircraftService';

// Deep consistency check
const serialNumber = '57045';

console.log('Deep Consistency Check for Serial Number:', serialNumber);
console.log('='.repeat(60));

const first = aircraftService.getAircraftData(serialNumber);
aircraftService.clearCache();
const second = aircraftService.getAircraftData(serialNumber);

// Check all key fields
const checks = [
  ['Serial Number', first.serialNumber, second.serialNumber],
  ['Model', first.model, second.model],
  ['Manufacturer', first.manufacturer, second.manufacturer],
  ['Owner Name', first.owner.name, second.owner.name],
  ['Owner Type', first.owner.type, second.owner.type],
  ['Owner Email', first.owner.contactEmail, second.owner.contactEmail],
  ['Operator Name', first.operator.name, second.operator.name],
  ['Manufacturing Year', first.manufacturingYear, second.manufacturingYear],
  ['Registration Number', first.registration.registrationNumber, second.registration.registrationNumber],
  ['Registration Country', first.registration.country, second.registration.country],
  ['Pilot Count', first.authorizedPilots.length, second.authorizedPilots.length],
  ['Pilot 1 Name', first.authorizedPilots[0].name, second.authorizedPilots[0].name],
  ['Pilot 1 License', first.authorizedPilots[0].licenseNumber, second.authorizedPilots[0].licenseNumber],
  ['Pilot 1 Hours', first.authorizedPilots[0].flightHours, second.authorizedPilots[0].flightHours],
  ['Engine Count', first.specifications.engineCount, second.specifications.engineCount],
  ['Engine 1 Model', first.specifications.engines[0].model, second.specifications.engines[0].model],
  ['Total Flight Hours', first.totalFlightHours, second.totalFlightHours],
  ['Insurance Provider', first.insurance.provider, second.insurance.provider],
  ['Purchase Price', first.purchasePrice, second.purchasePrice],
  ['Home Base', first.homeBase, second.homeBase],
];

console.log('\nField-by-Field Verification:');
let allMatch = true;
checks.forEach(([field, val1, val2]) => {
  const match = val1 === val2;
  allMatch = allMatch && match;
  console.log(`  ${match ? '✓' : '✗'} ${field}: ${match ? 'MATCH' : `MISMATCH (${val1} vs ${val2})`}`);
});

// Check dates separately (they might be different objects but same time)
const dateChecks = [
  ['Manufacture Date', first.manufactureDate.getTime(), second.manufactureDate.getTime()],
  ['Delivery Date', first.deliveryDate.getTime(), second.deliveryDate.getTime()],
  ['Pilot 1 Cert Date', first.authorizedPilots[0].certificationDate.getTime(), second.authorizedPilots[0].certificationDate.getTime()],
];

console.log('\nDate Field Verification (comparing timestamps):');
dateChecks.forEach(([field, val1, val2]) => {
  const match = val1 === val2;
  allMatch = allMatch && match;
  console.log(`  ${match ? '✓' : '✗'} ${field}: ${match ? 'MATCH' : `MISMATCH`}`);
});

console.log('\n' + '='.repeat(60));
console.log(allMatch ? '✓ ALL FIELDS MATCH - 100% CONSISTENT' : '✗ Some fields do not match');
