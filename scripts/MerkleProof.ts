import { keccak256, solidityPacked } from 'ethers';
import { MerkleTree } from 'merkletreejs';
import { bufferToHex, toBuffer } from 'ethereumjs-util';

interface Claim {
    address: string;
    amount: string;
}

interface MerkleData {
    claims: Claim[];
}

function generateMerkleProof(data: MerkleData, address: string, amount: string): string[] {
    // Construct leaves for the Merkle tree
    const leaves = data.claims.map((claim) => keccak256(solidityPacked(['address', 'uint256'], [claim.address, claim.amount])));

    // Convert the leaf to a buffer
    const targetLeaf = keccak256(solidityPacked(['address', 'uint256'], [address, amount]));
    const targetLeafBuffer = toBuffer(targetLeaf);

    // Create a Merkle tree
    const tree = new MerkleTree(leaves, keccak256, { sort: true });

    // Generate the Merkle proof
    const proof = tree.getHexProof(targetLeafBuffer);

    return proof;
}

// Example usage
const merkleData: MerkleData = {
    claims: [
        { address: '0x8A6499210B4A2c9906E49b34c17ea8C01cAD2F53', amount: '100' },
        { address: '0xB18e70B319bBAF31cb423844056BA6A99AA58B6C', amount: '200' },
        { address: '0x87263e8372D1BaB13e03CA24e0e5228e743c359A', amount: '300' },
        { address: '0x7A885373D6a7E2b43378A6038d948dA4d00F3Df3', amount: '300' },
        // Add more claims as needed
    ],
};

const addressToProve = '0x7A885373D6a7E2b43378A6038d948dA4d00F3Df3';
const amountToProve = '300';

const proof = generateMerkleProof(merkleData, addressToProve, amountToProve);

// Print the proof
console.log('Merkle Proof:', proof);
