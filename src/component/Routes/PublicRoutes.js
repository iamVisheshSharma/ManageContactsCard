import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function PublicRoutes(props) {
	const {currentUser} = useAuth();

	return (
		!currentUser ? <props.Component /> : <Navigate to={`/${props.toNav}`} />
	)
}
