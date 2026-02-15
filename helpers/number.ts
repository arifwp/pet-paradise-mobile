export const validatePhone = (phone: string) => {
  // Buang karakter non-digit terlebih dahulu
  const cleaned = phone.replace(/[^\d]/g, "");

  // ERROR: Mengandung huruf atau karakter lain
  if (cleaned !== phone) {
    return { valid: false, error: "Nomor hanya boleh berisi angka" };
  }

  // ERROR: Tidak diawali 08
  if (!cleaned.startsWith("08")) {
    return { valid: false, error: "Nomor harus diawali dengan 08" };
  }

  // ERROR: Panjang tidak valid (kamu bebas atur range)
  if (cleaned.length < 10 || cleaned.length > 15) {
    return { valid: false, error: "Panjang nomor tidak valid" };
  }

  // NORMALISASI (hilangkan leading zero pertama)
  const normalized = cleaned.substring(1); // "0858xxxx" -> "858xxxx"

  return {
    valid: true,
    value: cleaned,
    normalized,
  };
};

export const isNumericString = (value: string): boolean => {
  if (typeof value !== "string") return false;
  if (value.length === 0) return false;

  return /^[0-9]+$/.test(value);
};

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
