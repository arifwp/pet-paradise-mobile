import { Post } from "@/components/customs/posts/PostItem";
import { DateTime } from "luxon";

// Types untuk timezone functions
interface FormatPostTimeParams {
  createdAt: string;
  dataTimezone: string;
  currentTimezone: string;
}

interface TimeDisplay {
  displayTime: string;
  isRecent: boolean;
}

/**
 * Format waktu post berdasarkan timezone post dan timezone user
 */
export const formatPostTime = ({
  createdAt,
  dataTimezone,
  currentTimezone,
}: FormatPostTimeParams): TimeDisplay => {
  // Parse waktu post dengan timezone aslinya
  const postTime = DateTime.fromISO(createdAt, { zone: dataTimezone });

  // Convert ke timezone user
  const userTime = postTime.setZone(currentTimezone);

  // Waktu sekarang di timezone user
  const now = DateTime.now().setZone(currentTimezone);

  // Hitung selisih waktu dalam jam
  const diffInHours = now.diff(userTime, "hours").hours;
  const isCurrentYear = now.year === userTime.year;

  let displayTime = "";
  let isRecent = false;

  // 1. Jika kurang dari 24 jam, tampilkan format 12h ago
  if (diffInHours < 24) {
    isRecent = diffInHours < 1;

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(now.diff(userTime, "minutes").minutes);
      displayTime = `${diffInMinutes}m ago`;
    } else {
      const hours = Math.floor(diffInHours);
      displayTime = `${hours}h ago`;
    }
  }
  // 2. Jika lebih dari 24 jam dan tahun sama, tampilkan 11 Apr, 25 March
  else if (isCurrentYear) {
    displayTime = userTime.toFormat("dd MMM");
  }
  // 3. Jika tahun berbeda, tampilkan lengkap 24 March 2025
  else {
    displayTime = userTime.toFormat("dd MMM yyyy");
  }

  return {
    displayTime,
    isRecent,
  };
};

/**
 * Mendapatkan timezone device user
 */
export const getCurrentTimezone = (): string => {
  return DateTime.now().zoneName || "Asia/Jakarta";
};

/**
 * Format waktu untuk display di UI
 */
export const getTimeDisplay = (post: Post): TimeDisplay => {
  const currentTimezone = getCurrentTimezone();

  return formatPostTime({
    createdAt: post.created_at,
    dataTimezone: post.timezone,
    currentTimezone,
  });
};
