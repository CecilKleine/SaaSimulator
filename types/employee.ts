export type EmployeeRole = 'engineer' | 'designer' | 'sales' | 'marketing' | 'operations';

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  salary: number; // Monthly salary
  productivity: number; // 0-1 rating
  hireDate: number; // Game time when hired
  onboardingComplete: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  role: EmployeeRole;
  expectedSalary: number;
  productivity: number; // 0-1 rating
  experienceLevel: 'junior' | 'mid' | 'senior';
}

export interface TeamState {
  employees: Employee[];
  candidatePool: Candidate[];
  totalMonthlySalary: number;
  totalProductivity: number;
}
