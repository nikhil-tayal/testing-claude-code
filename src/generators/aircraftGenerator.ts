import { AircraftData, Pilot, MaintenanceRecord, FlightLog, Insurance, Registration, EngineSpec } from '../types/aircraft.types';
import { SeededRandom } from '../utils/seededRandom';
import * as constants from '../data/constants';

/**
 * Aircraft Data Generator
 * Generates consistent aircraft data based on a serial number
 */
export class AircraftDataGenerator {
  private rng: SeededRandom;
  private serialNumber: string;

  constructor(serialNumber: string) {
    this.serialNumber = serialNumber.toUpperCase();
    this.rng = new SeededRandom(serialNumber);
  }

  /**
   * Generate complete aircraft data
   */
  generate(): AircraftData {
    const manufacturer = this.rng.pick(constants.AIRCRAFT_MANUFACTURERS);
    const models = constants.AIRCRAFT_MODELS[manufacturer] || ['Generic Model'];
    const model = this.rng.pick(models);

    const manufacturingYear = this.rng.nextInt(2000, 2024);
    const manufactureDate = new Date(manufacturingYear, this.rng.nextInt(0, 11), this.rng.nextInt(1, 28));
    const deliveryDate = new Date(manufactureDate);
    deliveryDate.setMonth(deliveryDate.getMonth() + this.rng.nextInt(1, 6));

    const country = this.rng.pick(constants.COUNTRIES);
    const registrationPrefix = constants.REGISTRATION_PREFIXES[country] || 'N';
    const registrationNumber = `${registrationPrefix}${this.rng.nextInt(1000, 9999)}${String.fromCharCode(65 + this.rng.nextInt(0, 25))}`;

    const ownerName = this.rng.nextBoolean()
      ? this.rng.pick(constants.COMPANY_NAMES)
      : `${this.rng.pick(constants.FIRST_NAMES)} ${this.rng.pick(constants.LAST_NAMES)}`;

    const ownerType = this.rng.pick(['individual', 'corporation', 'government'] as const);

    const operatorName = this.rng.nextBoolean() ? ownerName : this.rng.pick(constants.COMPANY_NAMES);
    const operatorType = operatorName === ownerName ? 'owner' : this.rng.pick(['lease', 'charter'] as const);

    const registration = this.generateRegistration(registrationNumber, country, deliveryDate);
    const authorizedPilots = this.generatePilots(this.rng.nextInt(2, 6));
    const engines = this.generateEngines(this.rng.nextInt(1, 4), manufacturer);
    const maintenanceRecords = this.generateMaintenanceRecords(this.rng.nextInt(5, 15), deliveryDate);
    const flightLogs = this.generateFlightLogs(this.rng.nextInt(10, 30), authorizedPilots, deliveryDate);
    const insurance = this.generateInsurance();

    const totalFlightHours = this.rng.nextInt(500, 15000);
    const totalCycles = Math.floor(totalFlightHours / this.rng.nextFloat(2, 5));

    const lastInspectionDate = new Date();
    lastInspectionDate.setMonth(lastInspectionDate.getMonth() - this.rng.nextInt(1, 6));

    const nextInspectionDate = new Date(lastInspectionDate);
    nextInspectionDate.setMonth(nextInspectionDate.getMonth() + 12);

    const purchasePrice = this.rng.nextInt(500000, 50000000);
    const ageDepreciation = (new Date().getFullYear() - manufacturingYear) * 0.05;
    const currentMarketValue = Math.floor(purchasePrice * (1 - ageDepreciation));

    const aircraftData: AircraftData = {
      serialNumber: this.serialNumber,
      model,
      manufacturer,
      owner: {
        name: ownerName,
        type: ownerType,
        address: this.rng.pick(constants.CITIES),
        contactEmail: this.generateEmail(ownerName),
        contactPhone: this.generatePhone(),
      },
      operator: {
        name: operatorName,
        type: operatorType,
        operatorCertificate: operatorType !== 'owner' ? `OC-${this.rng.nextInt(10000, 99999)}` : undefined,
        baseLocation: this.rng.pick(constants.AIRPORTS),
      },
      manufacturingYear,
      manufactureDate,
      deliveryDate,
      registration,
      airworthinessLicense: {
        certificateNumber: `AWC-${this.rng.nextInt(100000, 999999)}`,
        issueDate: deliveryDate,
        expiryDate: new Date(new Date().getFullYear() + 2, 11, 31),
        category: this.rng.pick(['Standard', 'Transport', 'Restricted', 'Limited']),
        limitations: this.generateLimitations(),
      },
      authorizedPilots,
      specifications: {
        engineCount: engines.length,
        engines,
        maxTakeoffWeight: this.rng.nextInt(5000, 200000),
        emptyWeight: this.rng.nextInt(3000, 150000),
        maxSpeed: this.rng.nextInt(150, 600),
        cruiseSpeed: this.rng.nextInt(120, 550),
        range: this.rng.nextInt(500, 8000),
        ceiling: this.rng.nextInt(15000, 45000),
        seatingCapacity: this.rng.nextInt(2, 350),
        fuelCapacity: this.rng.nextInt(200, 50000),
        wingspan: this.rng.nextFloat(10, 80),
        length: this.rng.nextFloat(8, 75),
        height: this.rng.nextFloat(3, 25),
      },
      totalFlightHours,
      totalCycles,
      lastInspectionDate,
      nextInspectionDate,
      maintenanceRecords,
      flightLogs,
      insurance,
      purchasePrice,
      currentMarketValue,
      homeBase: this.rng.pick(constants.AIRPORTS),
      primaryUse: this.rng.pick(constants.PRIMARY_USES),
      specialEquipment: this.rng.pickMultiple(constants.SPECIAL_EQUIPMENT, this.rng.nextInt(3, 8)),
      modifications: this.rng.pickMultiple(constants.MODIFICATIONS, this.rng.nextInt(0, 4)),
      remarks: this.generateRemarks(),
    };

    return aircraftData;
  }

  private generateRegistration(registrationNumber: string, country: string, deliveryDate: Date): Registration {
    const registrationDate = new Date(deliveryDate);
    registrationDate.setDate(registrationDate.getDate() + this.rng.nextInt(1, 30));

    const expiryDate = new Date(registrationDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + this.rng.nextInt(3, 5));

    return {
      registrationNumber,
      country,
      registrationDate,
      expiryDate,
      category: this.rng.pick(['Normal', 'Utility', 'Acrobatic', 'Transport', 'Commuter']),
      status: this.rng.nextFloat(0, 1) > 0.1 ? 'active' : this.rng.pick(['suspended', 'expired', 'cancelled'] as const),
    };
  }

  private generatePilots(count: number): Pilot[] {
    const pilots: Pilot[] = [];

    for (let i = 0; i < count; i++) {
      const firstName = this.rng.pick(constants.FIRST_NAMES);
      const lastName = this.rng.pick(constants.LAST_NAMES);
      const certificationDate = this.rng.nextDate(
        new Date(2000, 0, 1),
        new Date(2023, 11, 31)
      );
      const expiryDate = new Date(certificationDate);
      expiryDate.setFullYear(expiryDate.getFullYear() + this.rng.nextInt(2, 5));

      const medicalExpiryDate = new Date();
      medicalExpiryDate.setMonth(medicalExpiryDate.getMonth() + this.rng.nextInt(6, 24));

      pilots.push({
        id: `P-${this.rng.nextInt(10000, 99999)}`,
        name: `${firstName} ${lastName}`,
        licenseNumber: `${this.rng.nextInt(100000, 999999)}`,
        licenseType: this.rng.pick(constants.LICENSE_TYPES),
        certificationDate,
        expiryDate,
        flightHours: this.rng.nextInt(200, 15000),
        ratings: this.rng.pickMultiple(constants.PILOT_RATINGS, this.rng.nextInt(2, 6)),
        medicalClass: this.rng.pick(['Class 1', 'Class 2', 'Class 3']),
        medicalExpiryDate,
      });
    }

    return pilots;
  }

  private generateEngines(count: number, aircraftManufacturer: string): EngineSpec[] {
    const engines: EngineSpec[] = [];

    for (let i = 0; i < count; i++) {
      const engineManufacturer = this.rng.pick(constants.ENGINE_MANUFACTURERS);
      const manufactureDate = this.rng.nextDate(
        new Date(2000, 0, 1),
        new Date(2023, 11, 31)
      );

      engines.push({
        manufacturer: engineManufacturer,
        model: `${engineManufacturer.substring(0, 3).toUpperCase()}-${this.rng.nextInt(100, 999)}`,
        serialNumber: `EN${this.rng.nextInt(100000, 999999)}`,
        type: this.rng.pick(constants.ENGINE_TYPES),
        horsepower: this.rng.nextInt(100, 5000),
        manufactureDate,
        totalHours: this.rng.nextInt(500, 12000),
        timeSinceOverhaul: this.rng.nextInt(50, 2000),
      });
    }

    return engines;
  }

  private generateMaintenanceRecords(count: number, deliveryDate: Date): MaintenanceRecord[] {
    const records: MaintenanceRecord[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      const recordDate = this.rng.nextDate(deliveryDate, now);
      const type = this.rng.pick(['inspection', 'repair', 'overhaul', 'modification'] as const);

      const descriptions: Record<typeof type, string[]> = {
        inspection: ['Annual Inspection', '100-hour Inspection', 'Pre-purchase Inspection', 'Phase Inspection'],
        repair: ['Landing Gear Repair', 'Hydraulic System Repair', 'Electrical System Repair', 'Structural Repair'],
        overhaul: ['Engine Overhaul', 'Propeller Overhaul', 'Component Overhaul'],
        modification: ['Avionics Upgrade', 'Interior Refurbishment', 'Paint Job', 'System Modification'],
      };

      const nextDueDate = type === 'inspection' ? new Date(recordDate) : undefined;
      if (nextDueDate) {
        nextDueDate.setMonth(nextDueDate.getMonth() + 12);
      }

      records.push({
        recordId: `MX-${this.rng.nextInt(100000, 999999)}`,
        date: recordDate,
        type,
        description: this.rng.pick(descriptions[type]),
        performedBy: this.rng.pick(constants.COMPANY_NAMES),
        nextDueDate,
        cost: this.rng.nextInt(500, 50000),
      });
    }

    return records.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  private generateFlightLogs(count: number, pilots: Pilot[], deliveryDate: Date): FlightLog[] {
    const logs: FlightLog[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      logs.push({
        logId: `FL-${this.rng.nextInt(100000, 999999)}`,
        date: this.rng.nextDate(deliveryDate, now),
        pilotId: this.rng.pick(pilots).id,
        departureAirport: this.rng.pick(constants.AIRPORTS),
        arrivalAirport: this.rng.pick(constants.AIRPORTS),
        flightTime: this.rng.nextFloat(0.5, 8),
        purpose: this.rng.pick([
          'Training',
          'Passenger Transport',
          'Cargo',
          'Maintenance Test',
          'Charter',
          'Personal',
        ]),
      });
    }

    return logs.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  private generateInsurance(): Insurance {
    const effectiveDate = new Date();
    effectiveDate.setMonth(effectiveDate.getMonth() - this.rng.nextInt(0, 11));

    const expiryDate = new Date(effectiveDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    return {
      provider: this.rng.pick(constants.INSURANCE_PROVIDERS),
      policyNumber: `POL-${this.rng.nextInt(1000000, 9999999)}`,
      coverage: this.rng.nextInt(1000000, 100000000),
      premium: this.rng.nextInt(5000, 200000),
      effectiveDate,
      expiryDate,
      type: this.rng.pick(['Hull & Liability', 'Liability Only', 'Comprehensive']),
    };
  }

  private generateLimitations(): string[] {
    const allLimitations = [
      'VFR Day Only',
      'VFR Night Prohibited',
      'IFR Approved',
      'No Aerobatic Maneuvers',
      'Single Pilot Operations Only',
      'Maximum Altitude 25,000 ft',
      'No Commercial Operations',
      'Flight Training Only',
    ];

    return this.rng.pickMultiple(allLimitations, this.rng.nextInt(0, 3));
  }

  private generateEmail(name: string): string {
    const cleanName = name.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, '.');
    const domain = this.rng.pick(['aviation.com', 'airmail.com', 'flynet.com', 'aero.com']);
    return `${cleanName}@${domain}`;
  }

  private generatePhone(): string {
    return `+1-${this.rng.nextInt(200, 999)}-${this.rng.nextInt(200, 999)}-${this.rng.nextInt(1000, 9999)}`;
  }

  private generateRemarks(): string {
    const remarks = [
      'Aircraft in excellent condition',
      'Recent major inspection completed',
      'Full maintenance history available',
      'Low flight hours for year',
      'Premium interior configuration',
      'Extended range capability',
      'Modern avionics suite installed',
      'Meticulously maintained',
    ];

    return this.rng.pick(remarks);
  }
}
