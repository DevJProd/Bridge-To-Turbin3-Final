import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor"
import { IDL, WbaPrereq } from "./programs/wba_prereq";
import wallet from "./dev-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const connection = new Connection("https://api.devnet.solana.com");

const github = Buffer.from("devJprod", "utf8");

const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed" });

// Initialize the program object with the IDL, program ID, and provider
const program: Program<WbaPrereq> = new Program(IDL, provider);

// Seeds used to create the PDA for this exercise are "prereq" utf8 buffer plus a buffer of the tx signer public key  
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];

const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

(async () => {
    try {
      const txhash = await program.methods.complete(github)
        .accounts({
          signer: keypair.publicKey,
        })
        .signers([
          keypair
        ]).rpc();
      console.log(`Success! Check out your TX here:
        https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
      console.error(`Oops, something went wrong: ${e}`)
    }
  })();

