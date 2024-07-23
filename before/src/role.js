import React, { createContext, useState, useEffect } from "react";

// Create a context for the role
export const RoleContext = createContext();

// Create a RoleProvider component
export function RoleProvider({ children }) {
  // Initialize the role state with 'admin' or the value from local storage
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem("role");
    return storedRole ? storedRole : "admin";
  });

  // Function to toggle the role
  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "admin" ? "user" : "admin"));
  };

  // Update local storage when role changes
  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
}
