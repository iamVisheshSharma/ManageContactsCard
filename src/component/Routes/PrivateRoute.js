import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute(props,{ element: Component, ...rest }) {

  const { currentUser } = useAuth();
	
	// This is not working with react-router v6
  // return (
  //   <Route
  //     {...rest}
  //     render={(props) => {
  //       return currentUser ? (
  //         <Component {...props} />
  //       ) : (
  //         <Navigate to="/login" />
  //       );
  //     }}
  //   />
  // );
	return (
		currentUser ? <props.Component /> : <Navigate to={`/${props.toNav}`} />
	)
	return 
}
