# Aircraft Serial Data Generator

A comprehensive system that generates consistent, realistic aircraft data based on serial numbers. Perfect for testing, demos, and development purposes.

## Features

Generate complete aircraft information including:

1. **Model** - Aircraft model and manufacturer
2. **Company Name** - Manufacturer name
3. **Owner** - Owner details (name, type, contact information)
4. **Operator** - Operator information and certificates
5. **Manufacturing Year** - Year and exact dates of manufacture and delivery
6. **License** - Registration and airworthiness certificates
7. **Pilots Data** - Multiple authorized pilots with licenses, ratings, and experience
8. **All Other Data** - Including:
   - Technical specifications (engines, weight, speed, range, etc.)
   - Operational data (flight hours, cycles, inspections)
   - Maintenance records
   - Flight logs
   - Insurance information
   - Financial data
   - Special equipment and modifications

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

## Usage

### Basic Usage

```typescript
import { aircraftService, DataFormatter } from './src';

// Get aircraft data by serial number
const aircraft = aircraftService.getAircraftData('AC-12345-XYZ');

// Display formatted data
console.log(DataFormatter.formatAircraftData(aircraft));
```

### Access Specific Fields

```typescript
import { aircraftService } from './src';

const aircraft = aircraftService.getAircraftData('AC-12345-XYZ');

// Access specific data
console.log('Model:', aircraft.model);
console.log('Manufacturer:', aircraft.manufacturer);
console.log('Owner:', aircraft.owner.name);
console.log('Operator:', aircraft.operator.name);
console.log('Manufacturing Year:', aircraft.manufacturingYear);
console.log('Registration:', aircraft.registration.registrationNumber);

// Access pilot data
aircraft.authorizedPilots.forEach(pilot => {
  console.log(`Pilot: ${pilot.name}`);
  console.log(`  License: ${pilot.licenseNumber}`);
  console.log(`  Hours: ${pilot.flightHours}`);
  console.log(`  Ratings: ${pilot.ratings.join(', ')}`);
});

// Access other data
console.log('Total Flight Hours:', aircraft.totalFlightHours);
console.log('Engine Count:', aircraft.specifications.engineCount);
console.log('Insurance:', aircraft.insurance.provider);
console.log('Maintenance Records:', aircraft.maintenanceRecords.length);
console.log('Flight Logs:', aircraft.flightLogs.length);
```

### Multiple Aircraft

```typescript
import { aircraftService } from './src';

// Get data for multiple aircraft
const serialNumbers = ['AC-001', 'AC-002', 'AC-003'];
const aircraftList = aircraftService.getMultipleAircraftData(serialNumbers);

aircraftList.forEach(aircraft => {
  console.log(`${aircraft.manufacturer} ${aircraft.model}`);
});
```

### JSON Output

```typescript
import { aircraftService, DataFormatter } from './src';

const aircraft = aircraftService.getAircraftData('AC-12345-XYZ');
const json = DataFormatter.formatAsJSON(aircraft, true);
console.log(json);
```

## Running Examples

Run the included examples to see the system in action:

```bash
npm test
```

This will demonstrate:
- Single aircraft query with full formatted output
- Multiple aircraft queries
- JSON output
- Accessing specific fields
- Consistent data generation (same serial number = same data)

## Key Features

### Consistent Data Generation

The system uses a seeded random number generator, which means:
- The same serial number **always** generates the same data
- Perfect for testing and demos
- Reproducible results across different runs

### Comprehensive Data

Each aircraft includes:
- **Basic Info**: Serial number, model, manufacturer, manufacturing dates
- **Ownership**: Owner and operator details with contact information
- **Registration**: Registration numbers, airworthiness certificates
- **Pilots**: 2-6 authorized pilots with full credentials
- **Technical Specs**: Engines, weights, performance data, dimensions
- **Operations**: Flight hours, cycles, inspection schedules
- **Maintenance**: Multiple maintenance records with dates and costs
- **Flight History**: Recent flight logs with routes and pilots
- **Insurance**: Coverage details and policy information
- **Financial**: Purchase price and current market value
- **Equipment**: Special equipment and modifications

### Realistic Data

All generated data is realistic and follows aviation industry standards:
- Real aircraft manufacturers and models
- Proper registration number formats by country
- Valid license types and pilot ratings
- Realistic performance specifications
- Industry-standard maintenance types

## API Reference

### AircraftService

```typescript
class AircraftService {
  // Get aircraft data by serial number
  getAircraftData(serialNumber: string): AircraftData;

  // Get multiple aircraft data
  getMultipleAircraftData(serialNumbers: string[]): AircraftData[];

  // Clear cache
  clearCache(): void;

  // Get cache size
  getCacheSize(): number;
}
```

### DataFormatter

```typescript
class DataFormatter {
  // Format full aircraft data as readable string
  static formatAircraftData(data: AircraftData): string;

  // Format as JSON
  static formatAsJSON(data: AircraftData, pretty?: boolean): string;

  // Format as compact summary
  static formatSummary(data: AircraftData): string;
}
```

## Data Structure

See `src/types/aircraft.types.ts` for the complete TypeScript interface definitions.

## Example Output

```
================================================================================
AIRCRAFT INFORMATION
================================================================================

Serial Number:       AC-12345-XYZ
Manufacturer:        Boeing
Model:               737-800
Manufacturing Year:  2018
Manufacture Date:    2018-03-15
Delivery Date:       2018-07-22

================================================================================
OWNERSHIP & OPERATION
================================================================================

Owner:               Skyline Aviation Inc. (corporation)
Owner Address:       New York, NY
Owner Contact:       skyline.aviation.inc.@aviation.com | +1-555-123-4567

Operator:            Skyline Aviation Inc. (owner)
Base Location:       JFK

[... and much more ...]
```

## Use Cases

- **Testing**: Generate consistent test data for aviation software
- **Demos**: Show realistic aircraft data in presentations
- **Development**: Populate databases with sample data
- **Training**: Create training scenarios with varied aircraft
- **Prototyping**: Quickly build aviation applications with realistic data

## License

MIT
