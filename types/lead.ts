export interface Lead {
  id: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  zipCode?: string | null;
  platform?: string | null;
  status: string;
  source?: string | null;
  score?: number | null;
  quality?: string | null;
  campaign?: { id?: number; name: string };
  user?: { email: string };
  notes?: string | null;
  createdAt: string;
}

