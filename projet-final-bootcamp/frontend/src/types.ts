export interface Patient {
    id: string;
    fullName: string;
    age: number;
    status: 'Stable' | 'Critique' | 'Sortant';
    admittedAt: string; // En JSON, les dates deviennent des strings
}