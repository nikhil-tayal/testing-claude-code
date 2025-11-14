/**
 * Data constants for aircraft generation
 */

export const AIRCRAFT_MANUFACTURERS = [
  'Boeing',
  'Airbus',
  'Cessna',
  'Bombardier',
  'Gulfstream',
  'Embraer',
  'Dassault Aviation',
  'Lockheed Martin',
  'Bell Helicopter',
  'Sikorsky',
  'Piper Aircraft',
  'Beechcraft',
  'Cirrus Aircraft'
];

export const AIRCRAFT_MODELS: Record<string, string[]> = {
  'Boeing': ['737-800', '747-400', '777-300ER', '787-9', '767-300'],
  'Airbus': ['A320', 'A330-300', 'A350-900', 'A380', 'A220-300'],
  'Cessna': ['172 Skyhawk', '182 Skylane', 'Citation X', '208 Caravan', '414 Chancellor'],
  'Bombardier': ['Global 7500', 'Challenger 350', 'Learjet 75', 'CRJ-900'],
  'Gulfstream': ['G650', 'G550', 'G280', 'G700'],
  'Embraer': ['E175', 'E190', 'Phenom 300', 'Legacy 450'],
  'Dassault Aviation': ['Falcon 7X', 'Falcon 2000', 'Falcon 900'],
  'Lockheed Martin': ['C-130 Hercules', 'F-35 Lightning II'],
  'Bell Helicopter': ['407', '429', '505'],
  'Sikorsky': ['S-76', 'S-92', 'UH-60 Black Hawk'],
  'Piper Aircraft': ['PA-28 Cherokee', 'PA-46 Malibu', 'M350'],
  'Beechcraft': ['King Air 350', 'Baron G58', 'Bonanza G36'],
  'Cirrus Aircraft': ['SR22', 'SR20', 'SF50 Vision Jet']
};

export const COMPANY_NAMES = [
  'Skyline Aviation Inc.',
  'Horizon Air Services',
  'Eagle Flight Operations',
  'Summit Aviation Group',
  'Atlantic Air Charter',
  'Pacific Jet Services',
  'Global Wings Corporation',
  'Continental Airlines LLC',
  'Metropolitan Air Transport',
  'Apex Aviation Holdings',
  'Premier Flight Services',
  'Elite Air Charter',
  'Starwind Aviation',
  'Velocity Air Group',
  'Altitude Aviation Corp.'
];

export const FIRST_NAMES = [
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph',
  'Thomas', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark',
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan',
  'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra'
];

export const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White',
  'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Hall'
];

export const CITIES = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'Austin, TX',
  'Jacksonville, FL', 'San Francisco, CA', 'Seattle, WA', 'Denver, CO', 'Boston, MA',
  'Miami, FL', 'Atlanta, GA', 'Las Vegas, NV', 'Portland, OR', 'Detroit, MI'
];

export const AIRPORTS = [
  'JFK', 'LAX', 'ORD', 'DFW', 'DEN', 'SFO', 'SEA', 'LAS', 'MCO', 'EWR',
  'CLT', 'PHX', 'IAH', 'MIA', 'BOS', 'MSP', 'DTW', 'ATL', 'LGA', 'SAN',
  'PDX', 'AUS', 'SAT', 'TPA', 'SLC', 'MDW', 'OAK', 'BNA', 'STL', 'CVG'
];

export const LICENSE_TYPES = [
  'Private Pilot License (PPL)',
  'Commercial Pilot License (CPL)',
  'Airline Transport Pilot License (ATPL)',
  'Multi-Engine Rating',
  'Instrument Rating'
];

export const PILOT_RATINGS = [
  'Single Engine Land',
  'Multi Engine Land',
  'Instrument Airplane',
  'Complex Aircraft',
  'High Performance',
  'Turbine',
  'Type Rating - Boeing',
  'Type Rating - Airbus',
  'Flight Instructor',
  'Instrument Flight Instructor'
];

export const ENGINE_MANUFACTURERS = [
  'Pratt & Whitney',
  'General Electric',
  'Rolls-Royce',
  'CFM International',
  'Honeywell',
  'Lycoming',
  'Continental Motors',
  'Turbomeca'
];

export const ENGINE_TYPES = [
  'Turbofan',
  'Turboprop',
  'Turbojet',
  'Piston',
  'Turboshaft'
];

export const INSURANCE_PROVIDERS = [
  'Global Aerospace',
  'AIG Aviation',
  'Allianz Global Corporate',
  'Starr Aviation',
  'Assured Partners',
  'USAIG',
  'Phoenix Aviation Managers',
  'Chartis Aviation'
];

export const SPECIAL_EQUIPMENT = [
  'Weather Radar',
  'Traffic Collision Avoidance System (TCAS)',
  'Enhanced Ground Proximity Warning System (EGPWS)',
  'Satellite Phone',
  'WiFi System',
  'In-flight Entertainment',
  'Emergency Locator Transmitter (ELT)',
  'Automatic Dependent Surveillance-Broadcast (ADS-B)',
  'Night Vision Imaging System',
  'De-icing System',
  'Oxygen System',
  'Emergency Flotation Devices'
];

export const MODIFICATIONS = [
  'Upgraded Avionics Suite',
  'Enhanced Interior',
  'Winglet Installation',
  'Engine Upgrade',
  'Extended Range Fuel Tanks',
  'Cargo Door Modification',
  'Enhanced Communication System',
  'Weather Radar Upgrade'
];

export const PRIMARY_USES = [
  'Commercial Passenger Transport',
  'Private Charter',
  'Cargo Transport',
  'Corporate Transport',
  'Flight Training',
  'Air Ambulance',
  'Aerial Survey',
  'Private Recreation'
];

export const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'Japan',
  'Singapore',
  'United Arab Emirates',
  'Switzerland'
];

export const REGISTRATION_PREFIXES: Record<string, string> = {
  'United States': 'N',
  'Canada': 'C',
  'United Kingdom': 'G',
  'Germany': 'D',
  'France': 'F',
  'Australia': 'VH',
  'Japan': 'JA',
  'Singapore': '9V',
  'United Arab Emirates': 'A6',
  'Switzerland': 'HB'
};
