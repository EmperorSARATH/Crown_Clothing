import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'


import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';
const firebaseConfig = {

    apiKey: "AIzaSyDkNxp5LCXNlTWj8Q9UC6DnoXbo5eyOi6U",
  
    authDomain: "crown-clothing-db-766d4.firebaseapp.com",
  
    projectId: "crown-clothing-db-766d4",
  
    storageBucket: "crown-clothing-db-766d4.appspot.com",
  
    messagingSenderId: "338604306187",
  
    appId: "1:338604306187:web:9f9084dd182ab60d4afc0e"
  
  };
  
  
  // Initialize Firebase
  
  const firebaseapp = initializeApp(firebaseConfig);
  
  const provider= new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:'select_account',
  });

  export const auth = getAuth();
  export const signInWithGooglePopup=()=>signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const addCollectionAndDocuments=async (collectionKey,objectsToAdd)=>{
    const cllectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
      const docRef = doc(cllectionRef,object.title.toLowerCase());
      batch.set(docRef,object);
      
    });

    await batch.commit();
    console.log('Done');

  }

  export const getCategoriesAndDocuments=async()=>{
    const collectionRef=collection(db,'categories');
    const q=query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
      const{title,items}=docSnapshot.data();
      acc[title.toLowerCase()]=items;
      return acc;
    },{});
    return categoryMap;
  }

  export const createUserDocumentFromAuth=async (userAuth,additionalInformation={})=>{
    
    if(!userAuth) return;

    const userDocRef=doc(db,'users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists());
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async(email,password)=>{

    if(!email || !password) return;
   return await createUserWithEmailAndPassword(auth,email,password)
  }

  export const signInAuthUserWithEmailAndPassword = async(email,password)=>{

    if(!email || !password) return;
   return await signInWithEmailAndPassword(auth,email,password)
  }

  export const signOutUser=async()=>await signOut(auth);

  export const onAuthStateChangedListener=(callback)=>
  onAuthStateChanged(auth, callback)