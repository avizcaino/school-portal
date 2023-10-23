export const getCollectionConverter = <T>() => ({
  toFirestore: (data: T[]) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => snap.data() as T[],
});
