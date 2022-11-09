import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import './App.css';
import Web3 from 'web3';
import { ABI } from './ABI'; // json=>array
import 'https://unpkg.com/web3@latest/dist/web3.min.js';

function App() {
  const [addressWallet, setAddressWallet] = useState();
  const [bageType, setBageType] = useState(1);
  const [des, setDes] = useState('');
  const SC_ADDRESS = '0xdBFE5B089CD9Ff7CE27F674D7B4Ab91018cc7895';
  const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
  // Contract
  const contract = new web3.eth.Contract(ABI, SC_ADDRESS);

  const Login = async () => {
    const address = await web3.eth.requestAccounts();

    setAddressWallet(address[0]);
  };

  window.ethereum.on('accountsChanged', (accounts) => {
    setAddressWallet(accounts[0]);
  });

  const Mint = async () => {
    const mint = await contract.methods
      .mintAndTransfer(
        addressWallet,
        des,
        bageType,
      )
      .send({ from: addressWallet });

    alert(
      `Your account:
     ${mint.events.ticketGenerated.returnValues[2]} `
     + `\n${
       `Your bageType : ${mint.events.ticketGenerated.returnValues[3]}`}`
       + `\n${
         `Your Description : ${mint.events.ticketGenerated.returnValues[1]}`}`,
      // 'Your Description :',
      // mint.events.ticketGenerated.returnValues[1],
    );
  };

  const handleChangeType = (event) => {
    setBageType(+event.target.value);
  };
  const handleDes = (event) => {
    setDes(event.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <form
            className="gradient col-lg-5 mt-5"
            style={{ borderRadius: '25px', boxShadow: '1px 1px 10px #FFD700' }}
          >
            <h4 style={{ color: '#FFFFFF' }}>Mint Portal</h4>
            <h5 style={{ color: '#FFFFFF' }}>Please connect your wallet</h5>
            <Button
              onClick={() => Login()}
              style={{ marginBottom: '5px', color: '#FFFFFF' }}
            >
              Connect Wallet
            </Button>
            <div
              className="card"
              id="wallet-address"
              style={{ marginTop: '3px', boxShadow: '1px 1px 4px #000000' }}
            >
              <label style={{ color: '#000000' }}>
                Wallet Address
                {' '}
                {/* <br /> */}
                {addressWallet || ''}
              </label>
              <input type="text" value={des} onChange={handleDes} />
              <select onChange={handleChangeType} id="cars">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <label style={{ color: '#000000' }}>
                Please select the amount of NFTs to mint.
              </label>

              <Button onClick={Mint}>Mint/Buy</Button>
            </div>
            <label style={{ color: '#FFFFFF' }}>
              Price 0.06 ETH each mint.
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
