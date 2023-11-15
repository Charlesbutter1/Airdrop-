import { ethers } from "hardhat";

// npx hardhat --network hardhat run scripts/deploy.ts
async function main() {
  // constructor(address[]  memory _tokenAddresses, bytes32[] memory _merkleRoots) {}
  const contract = await ethers.deployContract("MerkleClaimERC20", [['0xB66540499d050fFA30e5a5D275bDA0E1176F1963'],['0x0e4e992209b71929756d05e2efdeb4eeeb330998c490f9a7568564bfdd5a5af5']]);

  await contract.waitForDeployment();

  console.log(`Contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
