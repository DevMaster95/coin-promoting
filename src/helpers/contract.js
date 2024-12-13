import { ethers } from 'ethers';
import contractABI from './abis/abi.json';
import { ENVS } from './configurations/index';

// Contract can be used to write Contract
export const getContractWithSigner = () => {
  const infuraProvider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = infuraProvider.getSigner();

  const contract = new ethers.Contract(ENVS.CONTRACT_ADDRESS, contractABI, signer);

  return contract;
};

// Contract can be used to read Contract
const getContractWithoutSigner = () => {
  const infuraProvider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ENVS.CONTRACT_ADDRESS, contractABI, infuraProvider);

  return contract;
};

export const getNitrogemAmount = async (walletAddress) => {
  const contract = getContractWithoutSigner();

  try {
    let nitroAmount = await contract.getNitrogemAmount(walletAddress);

    return nitroAmount;
  } catch (err) {
    return 0;
  }
};
