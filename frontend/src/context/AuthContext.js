import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  // Helper functions for role management
  const getRoleMapping = () => {
    const mapping = localStorage.getItem('roleMapping');
    return mapping ? JSON.parse(mapping) : {};
  };

  const saveRoleMapping = (address, role) => {
    const mapping = getRoleMapping();
    mapping[address.toLowerCase()] = role;
    localStorage.setItem('roleMapping', JSON.stringify(mapping));
  };

  const getRoleForAddress = (address) => {
    const mapping = getRoleMapping();
    return address ? mapping[address.toLowerCase()] : null;
  };

  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' 
        });
        
        const currentAddress = accounts[0];
        if (currentAddress) {
          const savedRole = getRoleForAddress(currentAddress);
          if (savedRole) {
            setUserRole(savedRole);
            setWalletAddress(currentAddress);
          } else {
            setUserRole(null);
            setWalletAddress(null);
          }
        }
      }
    };

    checkWallet();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', checkWallet);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', checkWallet);
      }
    };
  }, []);

  const saveUserRole = (role, address) => {
    saveRoleMapping(address, role);
    setUserRole(role);
    setWalletAddress(address);
  };

  const logout = () => {
    setUserRole(null);
    setWalletAddress(null);
  };

  return (
    <AuthContext.Provider value={{ 
      userRole, 
      walletAddress, 
      saveUserRole, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);