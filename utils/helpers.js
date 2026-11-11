import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const getDateString = (daysOffset = 0) => {
  const d = new Date();
  if (daysOffset) d.setDate(d.getDate() + daysOffset);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const logActivity = async (db, pesan, tipe = "info") => {
  try {
    await addDoc(collection(db, "aktivitas"), {
      pesan,
      tipe,
      waktu: serverTimestamp(),
    });
  } catch {
    // Non-blocking logger
  }
};

