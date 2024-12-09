import React, { createContext, useState } from 'react';

const walletAddress = '';
const voteCountChanged = 0;
const synchroTables = 0;
const adminFlag = false;

export const AppContext = createContext({
  walletAddress,
  voteCountChanged,
  synchroTables,
  adminFlag,
  handleWalletAddress() {},
  handleVoteCountChanged() {},
  handleSynchroTables() {},
  handleAdminFlag() {},
});

export function WalletProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [voteCountChanged, setVoteCountChanged] = useState(0);
  const [synchroTables, setSynchroTables] = useState(0);
  const [adminFlag, setAdminFlag] = useState(false);

  const handleWalletAddress = (address) => setWalletAddress(address);
  const handleVoteCountChanged = (count) => setVoteCountChanged(count);
  const handleSynchroTables = (value) => setSynchroTables(value);
  const handleAdminFlag = (flag) => setAdminFlag(flag);

  return (
    <AppContext.Provider
      value={{
        walletAddress,
        voteCountChanged,
        synchroTables,
        adminFlag,
        handleWalletAddress,
        handleVoteCountChanged,
        handleSynchroTables,
        handleAdminFlag,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
