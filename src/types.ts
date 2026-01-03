// Common API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ESHOT Types
export interface EshotStation {
  _id: number;
  DurakID: string;
  DurakAdi: string;
  Adres: string;
  Enlem: number;
  Boylam: number;
}

export interface EshotLine {
  _id: number;
  HatNo: string;
  HatAdi: string;
  Guzerga: string;
}

export interface BusLocation {
  aracId: string;
  hatNo: string;
  latitude: number;
  longitude: number;
  hiz: number;
  yon: string;
  sonGuncelleme: string;
}

export interface ApproachingBus {
  hatNo: string;
  aracId: string;
  durakSirasi: number;
  tahminiVarisSuresi: number;
  mesafe: number;
}

export interface CKANResponse<T> {
  help: string;
  success: boolean;
  result: {
    records: T[];
    total: number;
    fields: Array<{ id: string; type: string }>;
  };
}

// İZBAN Types
export interface IzbanStation {
  id: string;
  adi: string;
  sira: number;
}

export interface IzbanDeparture {
  kalkisSaati: string;
  varisSaati: string;
  sure: string;
  aktarma: boolean;
}

export interface IzbanFareTariff {
  tutar: number;
  mesafe: number;
  aktarma: string;
}

// Tram Types
export interface TramLine {
  seferId: string;
  hatAdi: string;
  baslangic: string;
  bitis: string;
}

export interface TramStation {
  istasyonId: string;
  istasyonAdi: string;
  sira: number;
  enlem: number;
  boylam: number;
}

export interface TramFrequency {
  gun: string;
  baslangicSaati: string;
  bitisSaati: string;
  aralik: number;
}

// Metro Types
export interface MetroStation {
  istasyonId: string;
  istasyonAdi: string;
  sira: number;
  enlem: number;
  boylam: number;
}

export interface MetroFrequency {
  gun: string;
  baslangicSaati: string;
  bitisSaati: string;
  aralik: number;
}

// Ferry Types
export interface FerryTimetable {
  kalkis: string;
  varis: string;
  saat: string;
  gunTipi: string;
}

export interface FerryPier {
  iskeleId: string;
  iskeleAdi: string;
  enlem: number;
  boylam: number;
}

export interface FerryWorkingDay {
  gunId: string;
  gunAdi: string;
}

// Train Types
export interface TrainStation {
  garId: string;
  garAdi: string;
  adres: string;
  enlem: number;
  boylam: number;
}

// Error Types
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = "ValidationError";
  }
}
