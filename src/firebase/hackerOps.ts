import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
  getDoc,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Hacker } from "@/types";

const mapHackerDoc = (
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>,
) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt:
      data.createdAt?.toDate().toISOString() || new Date().toISOString(),
    ticketLink: `https://your-ticket-system.com/ticket/${doc.id}`,
  } as Hacker;
};

const prepareHackerData = (data: Omit<Hacker, "createdAt" | "id">) => ({
  ...data,
  createdAt: serverTimestamp(),
});

export const createHacker = async (
  hackerData: Omit<Hacker, "id" | "createdAt">,
) => {
  try {
    const docRef = await addDoc(
      collection(db, "hackers"),
      prepareHackerData(hackerData),
    );
    return {
      id: docRef.id,
      ...hackerData,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error creating hacker:", error);
    throw error;
  }
};

export const createHackers = async (
  hackers: Omit<Hacker, "id" | "createdAt">[],
) => {
  try {
    const batch = writeBatch(db);
    const hackerRefs = hackers.map((hacker) => {
      const docRef = doc(collection(db, "hackers"));
      batch.set(docRef, prepareHackerData(hacker));
      return docRef.id;
    });

    await batch.commit();

    return hackers.map((hacker, index) => ({
      id: hackerRefs[index],
      ...hacker,
      createdAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error creating hackers in batch:", error);
    throw error;
  }
};

export const getHackers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "hackers"));
    return querySnapshot.docs.map(mapHackerDoc);
  } catch (error) {
    console.error("Error getting hackers:", error);
    throw error;
  }
};

export const getHackerById = async (hackerId: string) => {
  try {
    const hackerDoc = await getDoc(doc(db, "hackers", hackerId));
    if (!hackerDoc.exists()) {
      throw new Error("Hacker not found");
    }
    return mapHackerDoc(hackerDoc);
  } catch (error) {
    console.error("Error getting hacker:", error);
    throw error;
  }
};

export const getHackersByTeam = async (teamName: string) => {
  try {
    const q = query(
      collection(db, "hackers"),
      where("teamName", "==", teamName),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapHackerDoc);
  } catch (error) {
    console.error("Error getting hackers by team:", error);
    throw error;
  }
};

export const updateHacker = async (
  hackerId: string,
  hackerData: Partial<Omit<Hacker, "id" | "createdAt">>,
) => {
  try {
    const hackerRef = doc(db, "hackers", hackerId);
    await updateDoc(hackerRef, hackerData);
    return getHackerById(hackerId);
  } catch (error) {
    console.error("Error updating hacker:", error);
    throw error;
  }
};

export const updateHackers = async (
  updates: { id: string; data: Partial<Omit<Hacker, "id" | "createdAt">> }[],
) => {
  try {
    const batch = writeBatch(db);

    updates.forEach(({ id, data }) => {
      const hackerRef = doc(db, "hackers", id);
      batch.update(hackerRef, data);
    });

    await batch.commit();

    return Promise.all(updates.map(({ id }) => getHackerById(id)));
  } catch (error) {
    console.error("Error updating hackers in batch:", error);
    throw error;
  }
};

export const deleteHacker = async (hackerId: string) => {
  try {
    await deleteDoc(doc(db, "hackers", hackerId));
    return hackerId;
  } catch (error) {
    console.error("Error deleting hacker:", error);
    throw error;
  }
};

export const deleteHackers = async (hackerIds: string[]) => {
  try {
    const batch = writeBatch(db);

    hackerIds.forEach((id) => {
      const hackerRef = doc(db, "hackers", id);
      batch.delete(hackerRef);
    });

    await batch.commit();
    return hackerIds;
  } catch (error) {
    console.error("Error deleting hackers in batch:", error);
    throw error;
  }
};
