/**
 * Pilot information
 */
export interface Pilot {
  id: string;
  name: string;
  licenseNumber: string;
  licenseType: string;
  certificationDate: Date;
  expiryDate: Date;
  flightHours: number;
  ratings: string[];
  medicalClass: string;
  medicalExpiryDate: Date;
}

/**
 * Maintenance record
 */
export interface MaintenanceRecord {
  recordId: string;
  date: Date;
  type: 'inspection' | 'repair' | 'overhaul' | 'modification';
  description: string;
  performedBy: string;
  nextDueDate?: Date;
  cost: number;
}

/**
 * Flight log entry
 */
export interface FlightLog {
  logId: string;
  date: Date;
  pilotId: string;
  departureAirport: string;
  arrivalAirport: string;
  flightTime: number;
  purpose: string;
}

/**
 * Insurance information
 */
export interface Insurance {
  provider: string;
  policyNumber: string;
  coverage: number;
  premium: number;
  effectiveDate: Date;
  expiryDate: Date;
  type: string;
}

/**
 * Registration information
 */
export interface Registration {
  registrationNumber: string;
  country: string;
  registrationDate: Date;
  expiryDate: Date;
  category: string;
  status: 'active' | 'suspended' | 'expired' | 'cancelled';
}

/**
 * Engine specification
 */
export interface EngineSpec {
  manufacturer: string;
  model: string;
  serialNumber: string;
  type: string;
  horsepower: number;
  manufactureDate: Date;
  totalHours: number;
  timeSinceOverhaul: number;
}

/**
 * Complete aircraft data
 */
export interface AircraftData {
  // Core identification
  serialNumber: string;
  model: string;
  manufacturer: string;

  // Ownership
  owner: {
    name: string;
    type: 'individual' | 'corporation' | 'government';
    address: string;
    contactEmail: string;
    contactPhone: string;
  };

  // Operation
  operator: {
    name: string;
    type: 'owner' | 'lease' | 'charter';
    operatorCertificate?: string;
    baseLocation: string;
  };

  // Manufacturing details
  manufacturingYear: number;
  manufactureDate: Date;
  deliveryDate: Date;

  // Registration & licensing
  registration: Registration;
  airworthinessLicense: {
    certificateNumber: string;
    issueDate: Date;
    expiryDate: Date;
    category: string;
    limitations: string[];
  };

  // Pilots
  authorizedPilots: Pilot[];

  // Technical specifications
  specifications: {
    engineCount: number;
    engines: EngineSpec[];
    maxTakeoffWeight: number;
    emptyWeight: number;
    maxSpeed: number;
    cruiseSpeed: number;
    range: number;
    ceiling: number;
    seatingCapacity: number;
    fuelCapacity: number;
    wingspan: number;
    length: number;
    height: number;
  };

  // Operational data
  totalFlightHours: number;
  totalCycles: number;
  lastInspectionDate: Date;
  nextInspectionDate: Date;

  // Maintenance
  maintenanceRecords: MaintenanceRecord[];

  // Flight history
  flightLogs: FlightLog[];

  // Financial
  insurance: Insurance;
  purchasePrice: number;
  currentMarketValue: number;

  // Additional data
  homeBase: string;
  primaryUse: string;
  specialEquipment: string[];
  modifications: string[];
  remarks: string;
}
