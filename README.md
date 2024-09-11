# Bridge-To-Turbin3-Final-Project 

Welcome to the **Bridge to Turbin 3 - Final Project** repository. 
The aim of this project is providing a TypeScript script to interact with a Solana program using Anchor. It includes instructions to:

1. Create an IDL: Define and structure the program's IDL in a TypeScript file to consume the WBA smart contract.
2. Install Dependencies: Set up necessary libraries and ensure compatibility.
3. Configure and Run: Creates a TypeScript script to interact with the Solana program, register completion, and handle transactions.

Follow the setup steps to integrate and deploy your Solana program efficiently.

Proof of completion : https://explorer.solana.com/tx/2yWD5ZE4cn72jsbfuiJLyH9kmVkzKC7YjrLBkWH2vhc9AAbjtRebapZH4CcLcRbjvzL3hDm1K9TcJdF1zzkgzpBk?cluster=devnet

## Table of Contents

- [Overview](#overview)
- [Create the IDL Program](#create-the-idl-program)
- [Define the Script](#define-the-script)
- [PDA Creation and Transaction](#pda-creation-and-transaction)
- [Run the script](#run-the-script)
- [Acknowledgements and Opportunities](#acknowledgements-and-opportunities)

## Overview

This is the final project in the bridge to turbin 3 bootcamp by Rise in. It is an updated version of the ones used in HW1 & HW2. We have updated the enroll.ts script to include the necessary IDL to interact with the WBA program. This update will allow us to submit our GitHub account as proof of completion of the bootcamp final project.

## Create the IDL Program

```bash
  mkdir programs
  touch ./programs/wba_prereq.ts
```
- Open wba_prereq.ts and paste the IDL from the Solana Explorer.
- Define the type and object for your program:

```bash
  export type WbaPrereq = { "version": "0.1.0", "name": "wba_prereq", ... };
  export const IDL: WbaPrereq = { "version": "0.1.0", "name": "wba_prereq", ... };
```

## Install Dependencies

- Install Anchor and downgrade the Solana web3.js library for compatibility:

```bash
  yarn add @coral-xyz/anchor@0.30.0
  yarn add @solana/web3.js@1.91.8
```
- Install the RPC WebSocket library:

``` bash
  yarn add rpc-websockets@7.11.0
```

## Define the Script

We will complete the script enroll.ts already provided the project folder to be able to make a transaction submitting our github account 
as proof of completion.

- Import the necessary libraries:

```bash
  import { Connection, Keypair, PublicKey } from "@solana/web3.js";
  import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
  import { IDL, WbaPrereq } from "./programs/wba_prereq";
  import wallet from "./dev-wallet.json";

```

- Create a keypair and establish a connection:

```bash
  const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
  const connection = new Connection("https://api.devnet.solana.com");
```

- Define your GitHub account as a UTF-8 buffer:

```bash
  const github = Buffer.from("<your github account>", "utf8");
```

- Setup the Anchor provider:

```bash
  const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed" });
```

- Create the program object:

```bash
  const program: Program<WbaPrereq> = new Program(IDL, provider);
```

## PDA Creation and Transaction

- Generate the Program Derived Address (PDA):

```bash
  const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
  const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);
```

- Submit the GitHub account to the Solana program:

```bash

  (async () => {
   try {
     const txhash = await program.methods
       .complete(github)
       .accounts({
         signer: keypair.publicKey,
       })
       .signers([keypair])
       .rpc();
     console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
   } catch (e) {
     console.error(`Oops, something went wrong: ${e}`);
   }
  })();

```
## Run the script

As final step to prove completion of final task, we simply need to run the enroll.ts script updated previously

``` bash
  yarn enroll
```

## Acknowledgements and Opportunities
I greatly appreciate the comprehensive content and concepts covered by Rise throughout this bootcamp, which have been significant in my learning journey. The opportunity to enroll in the Turbin 3 program has been invaluable, and I am excited about what is yet to come on the path to becoming a Solana developer.
