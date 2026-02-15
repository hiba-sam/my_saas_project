export interface Patient {
    id: string;
    fullName: string;
    age: number;
    status: 'Stable' | 'Critique' | 'Sortant';
    admittedAt: Date;
}