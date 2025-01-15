


export async function createDogecoinTransaction(fromAddress, toAddress, amount, privateKey) {
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

    } catch (err) {

        console.log("createDogecoinTransaction catch err", err)

    }
}

async function getUTXOs(address) {

    const url = `api.blockcypher.com/v1/doge/main/${address}/unspent`;
    const response = await axios.get(url);
    return response.data.data;
}




///////////////////////////////////////


// const bitcoin = require('bitcoinjs-lib');
// const axios = require('axios');

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
//     const url = `https://dogechain.info/api/v1/address/${address}/unspent`;
//     const response = await axios.get(url);
//     return response.data.data;
// }

// // Function to broadcast the transaction
// async function sendTransaction(txHex) {
//     const url = 'https://dogechain.info/api/v1/tx/send';
//     const response = await axios.post(url, { hex: txHex });
//     return response.data;
// }

// // Example usage

// // cart "DogeCoin":{"DOGE_address":"DRMvsostzbpnERSnSqQW5VTD6CEdRy4bsd",
// // "DOGE_PrivateKey":"9291a3d5bfaff251fd081c3edc6f667b4e825b61a3b87ad7b6e48d6e50179ce3"}}