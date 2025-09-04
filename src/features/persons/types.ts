export interface CastMember {
  id: number; name: string; character: string; profile_path: string | null; order: number;
}
export interface CrewMember {
  id: number; name: string; job: string; department: string; profile_path: string | null;
}
export interface MovieCredits { id: number; cast: CastMember[]; crew: CrewMember[]; }

export interface PersonDetails {
  id: number; name: string; biography: string;
  birthday: string | null; place_of_birth: string | null; profile_path: string | null;
}
