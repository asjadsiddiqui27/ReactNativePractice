
const wif = require('wif');
const fromAddress = 'DBgHW1Shjyk91fusm9hm3HcryNBwaFwZbQ'; // Replace with sender's address
const toAddress = 'DRMvsostzbpnERSnSqQW5VTD6CEdRy4bsd';   // Replace with recipient's address
const amount = 1000000; // Amount in satoshis (1 DOGE = 1000000 satoshis)
const privateKey = '50a4b725ef35cb684ec4b4b2c658fc7f8dc0fc3c1013a507626bc4e17a439811'; // Replace with your private key in WIF format

const dogecoinNetworkVersion = 0x9E;
const privateKeyWIF = wif.encode(dogecoinNetworkVersion, Buffer.from(privateKey, 'hex'), true); // 128 for mainnet

const bitcoin = require('bitcoinjs-lib');
const dogecoinNetwork = {
    messagePrefix: '\x18Dogecoin Signed Message:\n',
    bech32: null,
    bip32: {
        public: 0x02facafd,
        private: 0x02fac398,
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x16,
    wif: 0x9e, // WIF prefix for Dogecoin
};

function sign(hash, privateKey) {
    try {
        const keyPair = bitcoin.ECPair.fromWIF(privateKey, dogecoinNetwork);
        console.log('Private key is valid.');
        const signature = keyPair.sign(Buffer.from(hash, 'hex'));
        return signature.toString('hex');
    } catch (err) {
        console.error('Invalid private key:', err.message);
    }
}



export async function createDogecoinTransaction() {
    try {
        //  Creating the transaction
        const newTx = {
            inputs: [{ addresses: [fromAddress] }],
            outputs: [{ addresses: [toAddress], value: amount }]
        };
        //  Creating the transaction
         // Step 1: Create an unsigned transaction
         const response = await fetch('https://api.blockcypher.com/v1/doge/main/txs/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTx),
        });

        if (!response.ok) {
            throw new Error(`Error creating unsigned transaction: ${response.statusText}`);
        }

        const unsignedTx = await response.json();
        console.log("unsignedTx:::::",JSON.stringify(unsignedTx));


        // Step 2: Sign the transaction
        const txToSign = unsignedTx.tx;
        const toSign = unsignedTx.tosign;

        // Assuming you have a sign function to handle signing
        // const signatures = toSign.map((hash) => sign(hash, privateKeyWIF)); // Replace `sign` with your signing logic
        const signatures = sign(toSign[0], privateKeyWIF)
        console.log('signatures Hash:', signatures);

        // Step 3: Send the signed transaction
        const signedTx = {
            ...unsignedTx,
            signatures: [signatures],  //only accept array
            pubkeys: unsignedTx.pubkeys,
        };

        const broadcastResponse = await fetch(`https://api.blockcypher.com/v1/doge/main/txs/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signedTx),
        });

        const broadcastResult = await broadcastResponse.json();

        if (!broadcastResponse.ok) {
            console.error('Error broadcasting transaction:', broadcastResult);
            return;
        }
        

        console.log('Broadcast Result:', JSON.stringify(broadcastResult));
        return broadcastResult;


    } catch (err) {

        console.log("createDogecoinTransaction catch err", err)

    }
}






////////////////////




// const bitcoin = require('bitcoinjs-lib');
// import axios from 'axios';

// // Set network to Dogecoin (instead of Bitcoin)
// const dogecoinNetwork = bitcoin.networks.dogecoin;

// // Define a function to create a transaction
// export async function createDogecoinTransaction(fromAddress, toAddress, amount, privateKey) {
//     try {
//         // Fetch unspent transaction outputs (UTXOs) for the sender's address
//         const utxos = await getUTXOs(fromAddress);

//         // Create a new transaction
//         const txb = new bitcoin.TransactionBuilder(dogecoinNetwork);

//         // Add inputs (UTXOs)
//         let inputAmount = 0;
//         utxos.forEach((utxo) => {
//             txb.addInput(utxo.txid, utxo.vout);
//             inputAmount += utxo.amount;
//         });

//         // Add output (recipient address and amount to send)
//         txb.addOutput(toAddress, amount);

//         // Add change (if any)
//         const change = inputAmount - amount - 1000; // Subtract fee (e.g., 1000 satoshis)
//         if (change > 0) {
//             txb.addOutput(fromAddress, change);
//         }

//         // Sign the transaction with the sender's private key
//         const keyPair = bitcoin.ECPair.fromWIF(privateKey, dogecoinNetwork);
//         utxos.forEach((_, index) => {
//             txb.sign(index, keyPair);
//         });

//         // Build the transaction
//         const tx = txb.build();
//         const txHex = tx.toHex();
//         console.log('Transaction Hex:', txHex);

//         // Send the transaction to the network
//         const response = await sendTransaction(txHex);
//         console.log('Transaction sent:', response);
//     } catch (err) {
//         console.error('Error:', err);
//     }
// }

// // Function to fetch UTXOs for the sender's address
// async function getUTXOs(address) {

//     const url = `api.blockcypher.com/v1/doge/main   ${address}/unspent`;
//     const response = await axios.get(url);
//     return response.data.data;
// }

// // Function to broadcast the transaction
// async function sendTransaction(txHex) {
//     var newtx = {
//         inputs: [{addresses: ['CEztKBAYNoUEEaPYbkyFeXC5v8Jz9RoZH9']}],
//         outputs: [{addresses: ['C1rGdt7QEPGiwPMFhNKNhHmyoWpa5X92pn'], value: 100000}]
//       };

//     const url = 'https://dogechain.info/api/v1/tx/send';
//     const response = await axios.post(url, { hex: txHex });
//     return response.data;
// }

// // Example usage

// // cart "DogeCoin":{"DOGE_address":"DRMvsostzbpnERSnSqQW5VTD6CEdRy4bsd",
// // "DOGE_PrivateKey":"9291a3d5bfaff251fd081c3edc6f667b4e825b61a3b87ad7b6e48d6e50179ce3"}}