import { AircraftData, Pilot, MaintenanceRecord, FlightLog } from '../types/aircraft.types';

/**
 * Format aircraft data for display
 */
export class DataFormatter {
  /**
   * Format full aircraft data as a readable string
   */
  static formatAircraftData(data: AircraftData): string {
    const sections: string[] = [];

    sections.push(this.formatHeader('AIRCRAFT INFORMATION'));
    sections.push(this.formatBasicInfo(data));

    sections.push(this.formatHeader('OWNERSHIP & OPERATION'));
    sections.push(this.formatOwnership(data));

    sections.push(this.formatHeader('REGISTRATION & LICENSING'));
    sections.push(this.formatRegistration(data));

    sections.push(this.formatHeader('AUTHORIZED PILOTS'));
    sections.push(this.formatPilots(data.authorizedPilots));

    sections.push(this.formatHeader('TECHNICAL SPECIFICATIONS'));
    sections.push(this.formatSpecifications(data));

    sections.push(this.formatHeader('OPERATIONAL DATA'));
    sections.push(this.formatOperationalData(data));

    sections.push(this.formatHeader('MAINTENANCE RECORDS'));
    sections.push(this.formatMaintenanceRecords(data.maintenanceRecords));

    sections.push(this.formatHeader('RECENT FLIGHT LOGS'));
    sections.push(this.formatFlightLogs(data.flightLogs.slice(0, 5)));

    sections.push(this.formatHeader('INSURANCE'));
    sections.push(this.formatInsurance(data));

    sections.push(this.formatHeader('FINANCIAL'));
    sections.push(this.formatFinancial(data));

    sections.push(this.formatHeader('ADDITIONAL INFORMATION'));
    sections.push(this.formatAdditional(data));

    return sections.join('\n\n');
  }

  private static formatHeader(title: string): string {
    const line = '='.repeat(80);
    return `${line}\n${title}\n${line}`;
  }

  private static formatBasicInfo(data: AircraftData): string {
    return `
Serial Number:       ${data.serialNumber}
Manufacturer:        ${data.manufacturer}
Model:               ${data.model}
Manufacturing Year:  ${data.manufacturingYear}
Manufacture Date:    ${this.formatDate(data.manufactureDate)}
Delivery Date:       ${this.formatDate(data.deliveryDate)}
    `.trim();
  }

  private static formatOwnership(data: AircraftData): string {
    return `
Owner:               ${data.owner.name} (${data.owner.type})
Owner Address:       ${data.owner.address}
Owner Contact:       ${data.owner.contactEmail} | ${data.owner.contactPhone}

Operator:            ${data.operator.name} (${data.operator.type})
${data.operator.operatorCertificate ? `Operator Certificate: ${data.operator.operatorCertificate}` : ''}
Base Location:       ${data.operator.baseLocation}
    `.trim();
  }

  private static formatRegistration(data: AircraftData): string {
    return `
Registration Number: ${data.registration.registrationNumber}
Country:             ${data.registration.country}
Registration Date:   ${this.formatDate(data.registration.registrationDate)}
Expiry Date:         ${this.formatDate(data.registration.expiryDate)}
Category:            ${data.registration.category}
Status:              ${data.registration.status.toUpperCase()}

Airworthiness Certificate: ${data.airworthinessLicense.certificateNumber}
Issue Date:          ${this.formatDate(data.airworthinessLicense.issueDate)}
Expiry Date:         ${this.formatDate(data.airworthinessLicense.expiryDate)}
Category:            ${data.airworthinessLicense.category}
${data.airworthinessLicense.limitations.length > 0 ? `Limitations:         ${data.airworthinessLicense.limitations.join(', ')}` : ''}
    `.trim();
  }

  private static formatPilots(pilots: Pilot[]): string {
    return pilots.map((pilot, index) => `
Pilot ${index + 1}:
  Name:              ${pilot.name}
  ID:                ${pilot.id}
  License Number:    ${pilot.licenseNumber}
  License Type:      ${pilot.licenseType}
  Flight Hours:      ${pilot.flightHours.toLocaleString()}
  Certification:     ${this.formatDate(pilot.certificationDate)}
  License Expiry:    ${this.formatDate(pilot.expiryDate)}
  Medical Class:     ${pilot.medicalClass}
  Medical Expiry:    ${this.formatDate(pilot.medicalExpiryDate)}
  Ratings:           ${pilot.ratings.join(', ')}
    `.trim()).join('\n\n');
  }

  private static formatSpecifications(data: AircraftData): string {
    const specs = data.specifications;
    let output = `
Engine Count:        ${specs.engineCount}
Max Takeoff Weight:  ${specs.maxTakeoffWeight.toLocaleString()} lbs
Empty Weight:        ${specs.emptyWeight.toLocaleString()} lbs
Max Speed:           ${specs.maxSpeed} knots
Cruise Speed:        ${specs.cruiseSpeed} knots
Range:               ${specs.range.toLocaleString()} nm
Service Ceiling:     ${specs.ceiling.toLocaleString()} ft
Seating Capacity:    ${specs.seatingCapacity}
Fuel Capacity:       ${specs.fuelCapacity.toLocaleString()} gallons
Dimensions:          ${specs.length.toFixed(1)}m L × ${specs.wingspan.toFixed(1)}m W × ${specs.height.toFixed(1)}m H

Engines:
    `.trim();

    specs.engines.forEach((engine, index) => {
      output += `\n  Engine ${index + 1}:
    Manufacturer:    ${engine.manufacturer}
    Model:           ${engine.model}
    Serial Number:   ${engine.serialNumber}
    Type:            ${engine.type}
    Horsepower:      ${engine.horsepower} HP
    Manufacture Date: ${this.formatDate(engine.manufactureDate)}
    Total Hours:     ${engine.totalHours.toLocaleString()}
    Since Overhaul:  ${engine.timeSinceOverhaul.toLocaleString()} hours`;
    });

    return output;
  }

  private static formatOperationalData(data: AircraftData): string {
    return `
Total Flight Hours:  ${data.totalFlightHours.toLocaleString()}
Total Cycles:        ${data.totalCycles.toLocaleString()}
Last Inspection:     ${this.formatDate(data.lastInspectionDate)}
Next Inspection:     ${this.formatDate(data.nextInspectionDate)}
Home Base:           ${data.homeBase}
Primary Use:         ${data.primaryUse}
    `.trim();
  }

  private static formatMaintenanceRecords(records: MaintenanceRecord[]): string {
    if (records.length === 0) return 'No maintenance records available.';

    return records.slice(0, 5).map((record, index) => `
Record ${index + 1}:
  ID:                ${record.recordId}
  Date:              ${this.formatDate(record.date)}
  Type:              ${record.type.toUpperCase()}
  Description:       ${record.description}
  Performed By:      ${record.performedBy}
  Cost:              $${record.cost.toLocaleString()}
  ${record.nextDueDate ? `Next Due:          ${this.formatDate(record.nextDueDate)}` : ''}
    `.trim()).join('\n\n') + (records.length > 5 ? `\n\n... and ${records.length - 5} more records` : '');
  }

  private static formatFlightLogs(logs: FlightLog[]): string {
    if (logs.length === 0) return 'No flight logs available.';

    return logs.map((log, index) => `
Flight ${index + 1}:
  Log ID:            ${log.logId}
  Date:              ${this.formatDate(log.date)}
  Pilot ID:          ${log.pilotId}
  Route:             ${log.departureAirport} → ${log.arrivalAirport}
  Flight Time:       ${log.flightTime.toFixed(1)} hours
  Purpose:           ${log.purpose}
    `.trim()).join('\n\n');
  }

  private static formatInsurance(data: AircraftData): string {
    return `
Provider:            ${data.insurance.provider}
Policy Number:       ${data.insurance.policyNumber}
Type:                ${data.insurance.type}
Coverage:            $${data.insurance.coverage.toLocaleString()}
Annual Premium:      $${data.insurance.premium.toLocaleString()}
Effective Date:      ${this.formatDate(data.insurance.effectiveDate)}
Expiry Date:         ${this.formatDate(data.insurance.expiryDate)}
    `.trim();
  }

  private static formatFinancial(data: AircraftData): string {
    return `
Purchase Price:      $${data.purchasePrice.toLocaleString()}
Current Market Value: $${data.currentMarketValue.toLocaleString()}
Depreciation:        ${(((data.purchasePrice - data.currentMarketValue) / data.purchasePrice) * 100).toFixed(1)}%
    `.trim();
  }

  private static formatAdditional(data: AircraftData): string {
    let output = '';

    if (data.specialEquipment.length > 0) {
      output += `Special Equipment:\n${data.specialEquipment.map(eq => `  • ${eq}`).join('\n')}\n\n`;
    }

    if (data.modifications.length > 0) {
      output += `Modifications:\n${data.modifications.map(mod => `  • ${mod}`).join('\n')}\n\n`;
    }

    output += `Remarks: ${data.remarks}`;

    return output.trim();
  }

  private static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Format aircraft data as JSON
   */
  static formatAsJSON(data: AircraftData, pretty: boolean = true): string {
    return JSON.stringify(data, null, pretty ? 2 : 0);
  }

  /**
   * Format aircraft data as compact summary
   */
  static formatSummary(data: AircraftData): string {
    return `
${data.manufacturer} ${data.model} (S/N: ${data.serialNumber})
Registration: ${data.registration.registrationNumber} | Year: ${data.manufacturingYear}
Owner: ${data.owner.name} | Operator: ${data.operator.name}
Flight Hours: ${data.totalFlightHours.toLocaleString()} | Pilots: ${data.authorizedPilots.length}
    `.trim();
  }
}
