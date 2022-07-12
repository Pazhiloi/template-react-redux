import React, {lazy, Suspense, useEffect, useState } from "react";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import { auth,createUserProfileDocument, signInWithGoogle } from "./firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollectionsStartAsync, setImages } from "./redux/cards/cardsActions";
import { oldFilters} from "./data";
import {setCurrentUser} from './redux/user/userActions'
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import { setAll, updateImgs } from "./utils";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
const Card = lazy(() => import("./components/card/Card"));
function App() {
  const [filters, setFilters] = useState(oldFilters);
  const [all, setall] = useState(true);
 const collections =useSelector((state) => state.cards.collections);
 const images = useSelector((state) => state.cards.images);
// implement saga
// implement auththunk
const dispatch = useDispatch()
 const setFilter = (e) =>{
    e.preventDefault();
    const { index } = e.currentTarget.dataset;
    filters[index].status = !filters[index].status;
    setFilters(filters);
    updateFilters();
    dispatch(setImages(updateImgs(collections, filters)));
  }

 function  updateFilters () {
    const allFiltersTrue = filters.every( filter => filter.status === true);
    const allFiltersFalse = filters.every( filter => filter.status === false);
    if(allFiltersTrue||allFiltersFalse){
     setFilters(setAll(filters));
      setall(true)
    }else{
      setall(false);
    } 
  }

let unsubscribeFromAuth = null;
const currentUser  = useSelector(state => state.user.currentUser)
useEffect(() => {
   unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
     if (userAuth) {
       const userRef = await createUserProfileDocument(userAuth);
       userRef.onSnapshot((snapShot) => {
        dispatch(setCurrentUser({
           id: snapShot.id,
           ...snapShot.data(),
         }))
       });
     }
     if (collections.length === 0) {
       dispatch(fetchCollectionsStartAsync());
     } else {
       return
     }
     dispatch(setCurrentUser(userAuth));
   });
  return () => {
     unsubscribeFromAuth();
    }
  }, [])
  

return (
  <main>
    {currentUser ? <button onClick={() => {
      auth.signOut()
      dispatch(setCurrentUser(null));
      }}>OUT</button> : null}
    {currentUser ? (
      <ErrorBoundary>
        <Suspense fallback={<div>...loading</div>}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <MainPage
                  filters={filters}
                  all={all}
                  setFilters={setFilters}
                  setFilter={setFilter}
                  setAll={setAll}
                  setall={setall}
                  collections={collections}
                  images={images}
                />
              }
            />
            <Route path="/cards/:id" element={<Card />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    ) : (
      <>
        <div>Please authorise or register</div>
        <SignUp />
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        <SignIn />
      </>
    )}
  </main>
);
}
export default React.memo(App);
